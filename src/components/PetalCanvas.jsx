import { useEffect, useRef } from 'react'
import styles from './PetalCanvas.module.css'

/* ── Cherry Blossom Colour Palette ── */
const COLORS = [
  '#FFB7C5', // light pink
  '#FF9EB5', // medium pink
  '#FFCDD6', // blush
  '#F4ABBE', // rose
  '#FCD5DE', // petal white-pink
  '#E8899A', // deeper rose
]

const REPULSION_RADIUS = 100  // px — distance at which petals react
const REPULSION_FORCE  = 7    // strength of push
const DAMPING          = 0.06 // how quickly petals return to normal path

/* ── Petal Class ── */
class Petal {
  constructor(cw, ch, initial = false) {
    this.cw = cw; this.ch = ch
    this._init(initial)
  }

  _init(initial = false) {
    this.x       = Math.random() * this.cw
    this.y       = initial ? Math.random() * this.ch : -20
    this.size    = 5 + Math.random() * 20 // Reverted to 5px - 25px
    this.color   = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.targetVX = -0.4 + Math.random() * 0.8   // gentle horizontal drift
    this.targetVY =  0.5 + Math.random() * 1.0   // fall speed
    this.vx      = this.targetVX
    this.vy      = this.targetVY
    this.angle   = Math.random() * Math.PI * 2
    this.spin    = -0.015 + Math.random() * 0.03  // slow tumble
    this.opacity = 0.6 + Math.random() * 0.4
    this.wobble  = Math.random() * Math.PI * 2    // phase offset
    this.wobbleSpeed = 0.02 + Math.random() * 0.02
  }

  update(mouseX, mouseY) {
    /* Wobble — realistic leaf sway */
    this.wobble += this.wobbleSpeed
    const sway = Math.sin(this.wobble) * 0.25

    /* ── Mouse / Touch Repulsion ── */
    const dx   = this.x - mouseX
    const dy   = this.y - mouseY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < REPULSION_RADIUS && dist > 0.5) {
      const strength = ((REPULSION_RADIUS - dist) / REPULSION_RADIUS) ** 1.6
      const nx = dx / dist  // normalised direction away from cursor
      const ny = dy / dist
      this.vx += nx * strength * REPULSION_FORCE
      this.vy += ny * strength * REPULSION_FORCE
    }

    /* ── Spring back toward natural fall path ── */
    this.vx += (this.targetVX + sway - this.vx) * DAMPING
    this.vy += (this.targetVY - this.vy) * DAMPING

    this.x     += this.vx
    this.y     += this.vy
    this.angle += this.spin

    /* Recycle when off-screen */
    if (this.y > this.ch + 30 || this.x < -50 || this.x > this.cw + 50) {
      this._init(false)
    }
  }

  /* ── Cherry Blossom Petal Shape ── */
  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.globalAlpha = this.opacity

    const s = this.size

    /* Outer petal fill */
    ctx.fillStyle = this.color
    ctx.beginPath()
    // Top-left lobe
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(-s * 0.5, -s * 0.2, -s * 0.6, -s * 0.8, 0, -s * 0.95)
    // Top-right lobe
    ctx.bezierCurveTo( s * 0.6, -s * 0.8,  s * 0.5, -s * 0.2, 0, 0)
    ctx.closePath()
    ctx.fill()

    /* Slightly darker overlay for depth on each lobe */
    ctx.fillStyle = 'rgba(200, 80, 110, 0.10)'
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(-s * 0.5, -s * 0.2, -s * 0.6, -s * 0.8, 0, -s * 0.95)
    ctx.bezierCurveTo( s * 0.6, -s * 0.8,  s * 0.5, -s * 0.2, 0, 0)
    ctx.closePath()
    ctx.fill()

    /* Centre vein */
    ctx.strokeStyle = 'rgba(230, 130, 150, 0.45)'
    ctx.lineWidth   = 0.6
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, -s * 0.85)
    ctx.stroke()

    /* Tiny notch at tip of petal */
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'
    ctx.beginPath()
    ctx.arc(0, -s * 0.92, s * 0.07, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }
}

/* ── React Component ── */
export default function PetalCanvas() {
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let rafId
    let petals   = []

    /* Resize */
    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      petals = Array.from(
        { length: 100 },
        (_, i) => new Petal(canvas.width, canvas.height, i < 80)
      )
    }

    /* Mouse tracking */
    function onMouseMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    /* Touch tracking */
    function onTouchMove(e) {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }

    /* Reset when pointer leaves window */
    function onMouseLeave() {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    /* Animation loop */
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x, y } = mouseRef.current
      petals.forEach(p => {
        p.cw = canvas.width
        p.ch = canvas.height
        p.update(x, y)
        p.draw(ctx)
      })
      rafId = requestAnimationFrame(loop)
    }

    resize()
    loop()

    window.addEventListener('resize',     resize)
    window.addEventListener('mousemove',  onMouseMove, { passive: true })
    window.addEventListener('touchmove',  onTouchMove, { passive: true })
    window.addEventListener('touchstart', onTouchMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize',     resize)
      window.removeEventListener('mousemove',  onMouseMove)
      window.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('touchstart', onTouchMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} />
}

import { useEffect, useRef } from 'react'
import styles from './CardPetalShower.module.css'

const COLORS = ['#FFB7C5', '#FF9EB5', '#FFCDD6', '#F4ABBE', '#FCD5DE']
const SPAWN_COOLDOWN = 100 // ms

class LocalPetal {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.size = 5 + Math.random() * 8
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.vx = -1 + Math.random() * 2
    this.vy = 2 + Math.random() * 2.5
    this.angle = Math.random() * Math.PI * 2
    this.spin = -0.05 + Math.random() * 0.1
    this.opacity = 0.9
    this.life = 1.0 
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.angle += this.spin
    this.opacity -= 0.012 
    this.life -= 0.012
  }

  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.globalAlpha = this.opacity
    const s = this.size
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(-s * 0.5, -s * 0.2, -s * 0.6, -s * 0.8, 0, -s * 0.95)
    ctx.bezierCurveTo(s * 0.6, -s * 0.8, s * 0.5, -s * 0.2, 0, 0)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
}

export default function CardPetalShower() {
  const canvasRef = useRef(null)
  const petalsRef = useRef([])
  const lastSpawnRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const parent = canvas.parentElement
    let rafId

    // Use ResizeObserver to ensure canvas always matches parent size perfectly
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect
        // Multiply by devicePixelRatio for sharpness, but simple for now
        canvas.width = width
        canvas.height = height
      }
    })

    if (parent) observer.observe(parent)

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      petalsRef.current = petalsRef.current.filter(p => p.life > 0)
      petalsRef.current.forEach(p => {
        p.update()
        p.draw(ctx)
      })
      rafId = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      cancelAnimationFrame(rafId)
      if (parent) observer.unobserve(parent)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const handleMouseMove = (e) => {
      const now = Date.now()
      if (now - lastSpawnRef.current < SPAWN_COOLDOWN) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      petalsRef.current.push(new LocalPetal(x, y))
      petalsRef.current.push(new LocalPetal(x, y))
      
      lastSpawnRef.current = now
    }

    const parent = canvas.parentElement
    parent.addEventListener('mousemove', handleMouseMove)
    return () => parent.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} />
}

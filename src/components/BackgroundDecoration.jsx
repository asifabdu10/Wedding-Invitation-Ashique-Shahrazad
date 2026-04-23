import { useState, useEffect } from 'react'
import styles from './BackgroundDecoration.module.css'
import Branches from './Branches'

export default function BackgroundDecoration() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) / 50
      const moveY = (e.clientY - window.innerHeight / 2) / 50
      setOffset({ x: moveX, y: moveY })
    }

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const moveX = (e.touches[0].clientX - window.innerWidth / 2) / 50
        const moveY = (e.touches[0].clientY - window.innerHeight / 2) / 50
        setOffset({ x: moveX, y: moveY })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchstart', handleTouchMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchstart', handleTouchMove)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <Branches offset={offset} />
    </div>
  )
}


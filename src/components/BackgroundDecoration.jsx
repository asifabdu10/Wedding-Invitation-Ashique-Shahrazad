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
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className={styles.wrapper}>
      <Branches offset={offset} />
    </div>
  )
}


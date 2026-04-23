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

    const handleOrientation = (e) => {
      if (e.beta !== null && e.gamma !== null) {
        const moveX = e.gamma * 1.2
        const moveY = (e.beta - 45) * 1.2
        setOffset({ x: moveX, y: moveY })
      }
    }

    const requestPermission = () => {
      if (typeof DeviceOrientationEvent !== 'undefined' && 
          typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(response => {
            if (response === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation)
            }
          }).catch(err => console.log('Gyro permission denied:', err))
      } else {
        window.addEventListener('deviceorientation', handleOrientation)
      }
      window.removeEventListener('click', requestPermission)
      window.removeEventListener('touchstart', requestPermission)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchstart', handleTouchMove)
    window.addEventListener('touchstart', requestPermission)
    window.addEventListener('click', requestPermission)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchstart', handleTouchMove)
      window.removeEventListener('deviceorientation', handleOrientation)
      window.removeEventListener('touchstart', requestPermission)
      window.removeEventListener('click', requestPermission)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <Branches offset={offset} />
    </div>
  )
}


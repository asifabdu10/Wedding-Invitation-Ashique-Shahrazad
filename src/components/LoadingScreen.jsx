import { useEffect, useState } from 'react'
import PetalCanvas from './PetalCanvas'
import CardPetalShower from './CardPetalShower'
import Branches from './Branches'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen({ onFinished }) {
  const [progress, setProgress] = useState(0)
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
    
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onFinished, 800)
          return 100
        }
        return prev + 1.5
      })
    }, 30)

    return () => {
      clearInterval(timer)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchstart', handleTouchMove)
      window.removeEventListener('deviceorientation', handleOrientation)
      window.removeEventListener('touchstart', requestPermission)
      window.removeEventListener('click', requestPermission)
    }
  }, [onFinished])

  return (
    <div className={styles.overlay}>
      <Branches offset={offset} />
      <PetalCanvas />
      <CardPetalShower />
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <div className={styles.logoOutline}>A &amp; S</div>
          <div 
            className={styles.logoFill} 
            style={{ height: `${progress}%` }}
          >
            <div className={styles.logoFillInner}>A &amp; S</div>
          </div>
        </div>
        <p className={styles.loadingText}>Invitation is loading...</p>
        <div className={styles.progressBar}>
          <div className={styles.progressInner} style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  )
}


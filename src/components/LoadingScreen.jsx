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
    window.addEventListener('mousemove', handleMouseMove)
    
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


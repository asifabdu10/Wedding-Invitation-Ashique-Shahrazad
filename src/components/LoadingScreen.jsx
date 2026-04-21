import { useEffect, useState } from 'react'
import PetalCanvas from './PetalCanvas'
import CardPetalShower from './CardPetalShower'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen({ onFinished }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onFinished, 800) // Small delay after "full" for elegance
          return 100
        }
        return prev + 1.5 // Speed of filling
      })
    }, 30)

    return () => clearInterval(timer)
  }, [onFinished])

  return (
    <div className={styles.overlay}>
      <PetalCanvas />
      <CardPetalShower />
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          {/* Background outline logo */}
          <div className={styles.logoOutline}>A &amp; S</div>
          {/* Filling logo */}
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

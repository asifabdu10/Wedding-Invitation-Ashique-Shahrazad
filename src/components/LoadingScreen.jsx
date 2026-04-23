import { useEffect, useState } from 'react'
import PetalCanvas from './PetalCanvas'
import CardPetalShower from './CardPetalShower'
import Branches from './Branches'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen({ onFinished }) {
  const [progress, setProgress] = useState(0)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Check if the page is already loaded
    let isPageLoaded = document.readyState === 'complete'
    const handlePageLoad = () => { isPageLoaded = true }
    window.addEventListener('load', handlePageLoad)

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
    
    // Optimized loading progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          // Small buffer to ensure everything is rendered
          setTimeout(onFinished, 400)
          return 100
        }

        // If we reach 90% but page isn't fully loaded, wait there
        if (prev >= 90 && !isPageLoaded) {
          return 90
        }
        
        // Faster increments: 4% when low, 2% when high
        const increment = prev < 70 ? 4.5 : 2.2
        return Math.min(prev + increment, 100)
      })
    }, 25) // Faster interval

    return () => {
      clearInterval(timer)
      window.removeEventListener('load', handlePageLoad)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchstart', handleTouchMove)
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


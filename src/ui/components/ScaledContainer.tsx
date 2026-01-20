import { useState, useEffect, ReactNode } from 'react'
import styles from './ScaledContainer.module.css'

const DESIGN_WIDTH = 828
const DESIGN_HEIGHT = 1600

interface ScaledContainerProps {
  children: ReactNode
}

export function ScaledContainer({ children }: ScaledContainerProps) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      const scaleX = window.innerWidth / DESIGN_WIDTH
      const scaleY = window.innerHeight / DESIGN_HEIGHT
      const newScale = Math.min(scaleX, scaleY)
      setScale(newScale)
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.container}
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {children}
      </div>
    </div>
  )
}

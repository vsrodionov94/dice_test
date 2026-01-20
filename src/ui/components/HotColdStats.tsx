import styles from './HotColdStats.module.css'

interface HotColdStatsProps {
  target: number
}

export function HotColdStats({ target }: HotColdStatsProps) {
  const hotChance = ((target - 1) / 36 * 100).toFixed(0)
  const coldChance = ((36 - target) / 36 * 100).toFixed(0)

  const hotMultiplier = target > 1 ? (36 / (target - 1) * 0.99).toFixed(2) : '0.00'
  const coldMultiplier = target < 36 ? (36 / (36 - target) * 0.99).toFixed(2) : '0.00'

  return (
    <div className={styles.container}>
      <div className={styles.hotSide}>
        <div className={styles.content}>
          <div className={`${styles.title} ${styles.titleHot}`}>HOT</div>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>Шанс:</span>
            <span className={`${styles.statValue} ${styles.statValueHot}`}>{hotChance}%</span>
          </div>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>Кф:</span>
            <span className={`${styles.statValue} ${styles.statValueHot}`}>{hotMultiplier}</span>
          </div>
        </div>
      </div>

      <div className={styles.coldSide}>
        <div className={styles.content}>
          <div className={`${styles.title} ${styles.titleCold}`}>COLD</div>
          <div className={`${styles.statRow} ${styles.statRowRight}`}>
            <span className={styles.statLabel}>Шанс:</span>
            <span className={`${styles.statValue} ${styles.statValueCold}`}>{coldChance}%</span>
          </div>
          <div className={`${styles.statRow} ${styles.statRowRight}`}>
            <span className={styles.statLabel}>Кф:</span>
            <span className={`${styles.statValue} ${styles.statValueCold}`}>{coldMultiplier}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

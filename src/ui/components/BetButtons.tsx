import styles from './BetButtons.module.css'

type BetType = 'HOT' | 'COLD'

interface BetButtonsProps {
  onBet: (type: BetType) => void
  target: number
  disabled?: boolean
  isLoading?: boolean
}

export function BetButtons({ onBet, target, disabled, isLoading }: BetButtonsProps) {
  const hotRange = `1-${target - 1}`
  const coldRange = `${target + 1}-36`

  return (
    <div className={styles.container}>
      <button
        onClick={() => onBet('HOT')}
        disabled={disabled || isLoading}
        className={`${styles.button} ${styles.buttonHot}`}
      >
        <div className={styles.rangeText}>{hotRange}</div>
        <div className={styles.buttonText}>
          {isLoading ? 'Бросаем...' : 'Ставка'}
        </div>
      </button>

      <button
        onClick={() => onBet('COLD')}
        disabled={disabled || isLoading}
        className={`${styles.button} ${styles.buttonCold}`}
      >
        <div className={styles.rangeText}>{coldRange}</div>
        <div className={styles.buttonText}>
          {isLoading ? 'Бросаем...' : 'Ставка'}
        </div>
      </button>
    </div>
  )
}

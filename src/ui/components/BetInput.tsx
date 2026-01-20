import { useState } from 'react'
import styles from './BetInput.module.css'

interface BetInputProps {
  value: number
  onChange: (value: number) => void
  maxBet: number
  disabled?: boolean
}

export function BetInput({ value, onChange, maxBet, disabled }: BetInputProps) {
  const [previousValue, setPreviousValue] = useState<number | null>(null)

  const handleUndo = () => {
    if (previousValue !== null) {
      onChange(previousValue)
      setPreviousValue(null)
    }
  }

  const handleHalf = () => {
    setPreviousValue(value)
    onChange(Math.max(1, Math.floor(value / 2)))
  }

  const handleDouble = () => {
    setPreviousValue(value)
    onChange(Math.min(maxBet, value * 2))
  }

  const handleMax = () => {
    setPreviousValue(value)
    onChange(maxBet)
  }

  const handleInputChange = (newValue: number) => {
    setPreviousValue(value)
    onChange(Math.max(0, newValue))
  }

  return (
    <div className={styles.container}>
      <button
        onClick={handleUndo}
        disabled={disabled || previousValue === null}
        className={`${styles.actionButton} ${styles.undoButton}`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>

      <div className={styles.inputWrapper}>
        <input
          type="number"
          value={value || ''}
          onChange={(e) => handleInputChange(Number(e.target.value))}
          placeholder="0"
          className={styles.input}
          disabled={disabled}
          min={0}
        />
      </div>

      <button
        onClick={handleHalf}
        disabled={disabled || value <= 1}
        className={styles.actionButton}
      >
        <span className={styles.buttonText}>½</span>
      </button>

      <button
        onClick={handleDouble}
        disabled={disabled || value * 2 > maxBet}
        className={styles.actionButton}
      >
        <span className={styles.buttonTextSmall}>x2</span>
      </button>

      <button
        onClick={handleMax}
        disabled={disabled || value === maxBet}
        className={styles.actionButton}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
        </svg>
      </button>
    </div>
  )
}

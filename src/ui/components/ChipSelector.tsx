import { useState } from 'react'
import styles from './ChipSelector.module.css'

interface ChipSelectorProps {
  onSelect: (amount: number | 'max') => void
  selectedAmount: number
  maxBet: number
  disabled?: boolean
}

const chips = [
  { label: 'All in', value: 'max' as const, borderColor: '#a8e89a' },
  { label: '50', value: 50, borderColor: '#c23d35' },
  { label: '100', value: 100, borderColor: '#c73f92' },
  { label: '500', value: 500, borderColor: '#ffffff' },
  { label: '1K', value: 1000, borderColor: '#ebb957' },
  { label: '5K', value: 5000, borderColor: '#dd779c' },
  { label: '20K', value: 20000, borderColor: '#2643c6' },
  { label: '100K', value: 100000, borderColor: '#ef8e34' },
]

function Chip({
  label,
  borderColor,
  isSelected,
  onClick,
  disabled
}: {
  label: string
  borderColor: string
  isSelected: boolean
  onClick: () => void
  disabled?: boolean
}) {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    if (disabled) return
    setIsClicked(true)
    onClick()
    setTimeout(() => setIsClicked(false), 300)
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${styles.chip} ${isSelected ? styles.chipSelected : ''} ${isClicked ? styles.chipClicked : ''}`}
      style={{ borderColor, color: borderColor }}
    >
      <span className={styles.chipLabel}>{label}</span>
    </button>
  )
}

export function ChipSelector({ onSelect, selectedAmount, maxBet, disabled }: ChipSelectorProps) {
  return (
    <div className={styles.container}>
      {chips.map((chip) => {
        const isSelected = chip.value === 'max'
          ? selectedAmount === maxBet
          : selectedAmount === chip.value

        return (
          <Chip
            key={chip.label}
            label={chip.label}
            borderColor={chip.borderColor}
            isSelected={isSelected}
            onClick={() => onSelect(chip.value)}
            disabled={disabled}
          />
        )
      })}
    </div>
  )
}

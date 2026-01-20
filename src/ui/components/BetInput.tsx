import { useState } from 'react'

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

  const buttonClass = "w-14 h-14 rounded-2xl bg-white/5 border-2 border-white/20 flex items-center justify-center text-gray-200 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"

  return (
    <div className="flex items-center gap-3">
      {/* Undo button */}
      <button
        onClick={handleUndo}
        disabled={disabled || previousValue === null}
        className={`${buttonClass} opacity-60`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>

      {/* Input field */}
      <div className="flex-1">
        <input
          type="number"
          value={value || ''}
          onChange={(e) => handleInputChange(Number(e.target.value))}
          placeholder="0"
          className="w-full bg-[#10141c] text-white text-2xl text-center font-bold rounded-2xl py-3 px-4 outline-none"
          disabled={disabled}
          min={0}
        />
      </div>

      {/* Half button */}
      <button
        onClick={handleHalf}
        disabled={disabled || value <= 1}
        className={buttonClass}
      >
        <span className="text-xl font-bold">½</span>
      </button>

      {/* Double button */}
      <button
        onClick={handleDouble}
        disabled={disabled || value * 2 > maxBet}
        className={buttonClass}
      >
        <span className="text-xl font-medium">x2</span>
      </button>

      {/* Max button */}
      <button
        onClick={handleMax}
        disabled={disabled || value === maxBet}
        className={buttonClass}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
        </svg>
      </button>
    </div>
  )
}

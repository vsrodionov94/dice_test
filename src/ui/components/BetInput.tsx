interface BetInputProps {
  value: number
  onChange: (value: number) => void
  maxBet: number
  disabled?: boolean
}

export function BetInput({ value, onChange, maxBet, disabled }: BetInputProps) {
  const handleHalf = () => onChange(Math.max(0.01, value / 2))
  const handleDouble = () => onChange(Math.min(maxBet, value * 2))
  const handleMax = () => onChange(maxBet)

  return (
    <div className="mb-3">
      <label className="text-stake-light text-sm mb-2 block">Сумма ставки</label>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stake-light">₽</span>
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
            className="w-full bg-stake-darker text-white rounded-lg py-3 pl-4 pr-8 outline-none focus:ring-2 focus:ring-stake-accent"
            disabled={disabled}
            min={0}
            step={0.01}
          />
        </div>
        <button
          onClick={handleHalf}
          disabled={disabled}
          className="px-4 py-3 bg-stake-gray text-stake-light rounded-lg hover:bg-opacity-80 disabled:opacity-50"
        >
          ½
        </button>
        <button
          onClick={handleDouble}
          disabled={disabled}
          className="px-4 py-3 bg-stake-gray text-stake-light rounded-lg hover:bg-opacity-80 disabled:opacity-50"
        >
          2×
        </button>
        <button
          onClick={handleMax}
          disabled={disabled}
          className="px-4 py-3 bg-stake-gray text-stake-light rounded-lg hover:bg-opacity-80 disabled:opacity-50"
        >
          Всё
        </button>
      </div>
    </div>
  )
}

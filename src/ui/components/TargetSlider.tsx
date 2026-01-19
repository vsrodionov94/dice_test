interface TargetSliderProps {
  value: number
  onChange: (value: number) => void
  condition: 'UNDER' | 'OVER'
  disabled?: boolean
}

export function TargetSlider({ value, onChange, condition, disabled }: TargetSliderProps) {
  const winChance = condition === 'UNDER'
    ? ((value - 1) / 36 * 100).toFixed(2)
    : ((36 - value) / 36 * 100).toFixed(2)

  return (
    <div className="mb-4">
      <div className="flex justify-between text-stake-light text-sm mb-2">
        <span>Выпадет {condition === 'UNDER' ? 'меньше' : 'больше'}</span>
        <span>{value}</span>
      </div>
      <input
        type="range"
        min={2}
        max={35}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        disabled={disabled}
      />
      <div className="flex justify-between text-stake-light text-xs mt-2">
        <span>Шанс: {winChance}%</span>
        <span>1 - 36</span>
      </div>
    </div>
  )
}

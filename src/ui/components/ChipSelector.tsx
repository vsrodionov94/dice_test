interface ChipSelectorProps {
  onSelect: (amount: number | 'max') => void
  selectedAmount: number
  maxBet: number
  disabled?: boolean
}

const chips = [
  { label: 'All in', value: 'max' as const, color: '#a8e89a', borderColor: '#7bc96f' },
  { label: '50', value: 50, color: '#d32d2b', borderColor: '#a82220' },
  { label: '100', value: 100, color: '#ff6b9d', borderColor: '#d45580' },
  { label: '500', value: 500, color: '#ffffff', borderColor: '#cccccc', textColor: '#333' },
  { label: '1K', value: 1000, color: '#f4b73f', borderColor: '#d4982f' },
  { label: '5K', value: 5000, color: '#ed709d', borderColor: '#c95a80' },
  { label: '20K', value: 20000, color: '#1b44ce', borderColor: '#1535a0' },
  { label: '100K', value: 100000, color: '#ef8e34', borderColor: '#c97428' },
]

function Chip({
  label,
  color,
  borderColor,
  textColor = '#fff',
  isSelected,
  onClick,
  disabled
}: {
  label: string
  color: string
  borderColor: string
  textColor?: string
  isSelected: boolean
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-14 h-14 flex items-center justify-center transition-transform ${
        isSelected ? 'scale-110' : ''
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {/* Hexagon shape using clip-path */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: borderColor,
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
        }}
      />
      <div
        className="absolute inset-1"
        style={{
          backgroundColor: color,
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
        }}
      />
      <span
        className="relative z-10 font-semibold text-xs"
        style={{ color: textColor }}
      >
        {label}
      </span>
    </button>
  )
}

export function ChipSelector({ onSelect, selectedAmount, maxBet, disabled }: ChipSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-2">
      {chips.map((chip) => {
        const isSelected = chip.value === 'max'
          ? selectedAmount === maxBet
          : selectedAmount === chip.value

        return (
          <Chip
            key={chip.label}
            label={chip.label}
            color={chip.color}
            borderColor={chip.borderColor}
            textColor={chip.textColor}
            isSelected={isSelected}
            onClick={() => onSelect(chip.value)}
            disabled={disabled}
          />
        )
      })}
    </div>
  )
}

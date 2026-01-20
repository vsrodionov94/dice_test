type BetType = 'HOT' | 'COLD'

interface BetButtonsProps {
  onBet: (type: BetType) => void
  target: number
  disabled?: boolean
  isLoading?: boolean
}

export function BetButtons({ onBet, target, disabled, isLoading }: BetButtonsProps) {
  // HOT = numbers below target (1 to target-1)
  // COLD = numbers above target (target+1 to 36)
  const hotRange = `1-${target - 1}`
  const coldRange = `${target + 1}-36`

  return (
    <div className="flex gap-4">
      <button
        onClick={() => onBet('HOT')}
        disabled={disabled || isLoading}
        className="flex-1 py-5 bg-[#d74545] text-white font-bold rounded-2xl hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <div className="text-sm font-extrabold text-white/60 mb-0.5">{hotRange}</div>
        <div className="text-3xl" style={{ fontFamily: 'Impact, sans-serif' }}>
          {isLoading ? 'Бросаем...' : 'Ставка'}
        </div>
      </button>

      <button
        onClick={() => onBet('COLD')}
        disabled={disabled || isLoading}
        className="flex-1 py-5 bg-[#416ae2] text-white font-bold rounded-2xl hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <div className="text-sm font-extrabold text-white/60 mb-0.5">{coldRange}</div>
        <div className="text-3xl" style={{ fontFamily: 'Impact, sans-serif' }}>
          {isLoading ? 'Бросаем...' : 'Ставка'}
        </div>
      </button>
    </div>
  )
}

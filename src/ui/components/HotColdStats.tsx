interface HotColdStatsProps {
  target: number
}

export function HotColdStats({ target }: HotColdStatsProps) {
  // HOT = числа меньше target (UNDER) - красная зона слева
  // COLD = числа больше target (OVER) - синяя зона справа
  const hotChance = ((target - 1) / 36 * 100).toFixed(0)
  const coldChance = ((36 - target) / 36 * 100).toFixed(0)

  const hotMultiplier = target > 1 ? (36 / (target - 1) * 0.99).toFixed(2) : '0.00'
  const coldMultiplier = target < 36 ? (36 / (36 - target) * 0.99).toFixed(2) : '0.00'

  return (
    <div className="flex justify-between px-6 py-4">
      {/* HOT side */}
      <div>
        <div
          className="text-[#d75658] text-5xl font-bold mb-4"
          style={{ fontFamily: 'Impact, sans-serif' }}
        >
          HOT
        </div>
        <div className="flex items-end gap-3 mb-2">
          <span
            className="text-white/50 text-2xl"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            Шанс:
          </span>
          <span
            className="text-[#c05b5c] text-4xl"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            {hotChance}%
          </span>
        </div>
        <div className="flex items-end gap-3">
          <span
            className="text-white/50 text-2xl"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            Кф:
          </span>
          <span
            className="text-[#c05b5c] text-4xl"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            {hotMultiplier}
          </span>
        </div>
      </div>

      {/* COLD side */}
      <div className="text-right">
        <div
          className="text-[#4f9cff] text-5xl font-bold mb-4"
          style={{ fontFamily: 'Impact, sans-serif' }}
        >
          COLD
        </div>
        <div className="flex items-end gap-3 justify-end mb-2">
          <span
            className="text-white/50 text-2xl"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            Шанс:
          </span>
          <span
            className="text-[#acc5f8] text-4xl"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            {coldChance}%
          </span>
        </div>
        <div className="flex items-end gap-3 justify-end">
          <span
            className="text-white/50 text-2xl"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            Кф:
          </span>
          <span
            className="text-[#acc5f8] text-4xl"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            {coldMultiplier}
          </span>
        </div>
      </div>
    </div>
  )
}

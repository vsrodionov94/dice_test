export interface HistoryItem {
  id: number
  roll: number
  win: boolean
  amount: number
  payout: number
  target: number
  condition: 'HOT' | 'COLD'
  rollId?: string
}

interface RollHistoryProps {
  history: HistoryItem[]
}

function DiceSmall({ value, isBlack }: { value: number; isBlack?: boolean }) {
  const dotPositions: Record<number, [number, number][]> = {
    1: [[1, 1]],
    2: [[0, 0], [2, 2]],
    3: [[0, 0], [1, 1], [2, 2]],
    4: [[0, 0], [0, 2], [2, 0], [2, 2]],
    5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
    6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]]
  }

  const positions = dotPositions[value] || []
  const bgColor = isBlack ? '#161514' : '#f6ebe5'
  const dotColor = isBlack ? '#ffffff' : '#312f2e'

  return (
    <div
      className="w-7 h-7 rounded-lg relative"
      style={{ backgroundColor: bgColor }}
    >
      {positions.map(([row, col], i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: dotColor,
            opacity: 0.9,
            top: `${row * 8 + 8}px`,
            left: `${col * 8 + 8}px`
          }}
        />
      ))}
    </div>
  )
}

function DicePair({ value, isActive }: { value: number; isActive?: boolean }) {
  const first = Math.floor((value - 1) / 6) + 1
  const second = ((value - 1) % 6) + 1

  return (
    <div
      className={`flex gap-1.5 p-2.5 rounded-xl ${
        isActive
          ? 'bg-[#2b3348] border-4 border-[#d74545]'
          : 'bg-[#2b3348] opacity-80'
      }`}
    >
      <DiceSmall value={first} isBlack />
      <DiceSmall value={second} />
    </div>
  )
}

export function RollHistory({ history }: RollHistoryProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Menu button */}
      <button className="w-11 h-11 rounded-2xl bg-white/5 border-2 border-white/20 flex items-center justify-center text-gray-200">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>

      {/* History label */}
      <div className="flex flex-col text-white/40 text-xs font-medium leading-tight">
        <span>История</span>
        <span>бросков</span>
      </div>

      {/* Dice history */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
        {history.length !== 0 && (
          history.slice(0, 5).map((item, i) => (
            <DicePair key={item.id} value={item.roll} isActive={i === 0} />
          ))
        )}
      </div>
    </div>
  )
}

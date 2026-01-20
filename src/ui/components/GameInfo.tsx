interface GameInfoProps {
  rollId: string
  balance: number
  lastRoll?: number
}

function Dice3D({ value, isBlack }: { value: number; isBlack?: boolean }) {
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
      className="w-10 h-10 rounded-xl relative"
      style={{
        background: isBlack
          ? 'linear-gradient(180deg, #5c5a58 0%, #2a2a2a 100%)'
          : 'linear-gradient(180deg, #fff7f0 0%, #b2b2b2 100%)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
      }}
    >
      <div
        className="absolute inset-1 rounded-lg"
        style={{ backgroundColor: bgColor }}
      >
        {positions.map(([row, col], i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: dotColor,
              opacity: 0.9,
              top: `${row * 10 + 4}px`,
              left: `${col * 10 + 4}px`
            }}
          />
        ))}
      </div>
    </div>
  )
}

function DicePairDisplay({ value }: { value?: number }) {
  if (!value) {
    return (
      <div className="flex gap-3">
        <Dice3D value={1} isBlack />
        <Dice3D value={1} />
      </div>
    )
  }

  const first = Math.floor((value - 1) / 6) + 1
  const second = ((value - 1) % 6) + 1

  return (
    <div className="flex gap-3">
      <Dice3D value={first} isBlack />
      <Dice3D value={second} />
    </div>
  )
}

function FairPlayLogo() {
  return (
    <div className="w-full flex justify-center">
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle, rgba(100,100,150,0.3) 0%, transparent 70%)'
        }}
      >
        <div
          className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center"
          style={{
            background: 'linear-gradient(180deg, rgba(60,60,80,0.8) 0%, rgba(30,30,50,0.9) 100%)'
          }}
        >
          <div className="text-center">
            <div className="text-white/80 text-sm font-bold">ФНР</div>
            <div className="text-[8px] text-white/40 leading-tight">ЧЕСТНАЯ<br />ИГРА</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function GameInfo({ rollId, balance, lastRoll }: GameInfoProps) {
  const formatBalance = (value: number) => {
    return value.toLocaleString('ru-RU').replace(/,/g, ' ')
  }

  return (
    <div className="bg-[#1c2232] rounded-[40px] mx-4 p-4">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <div className="text-white/40 text-sm mb-2">Комбинация № {rollId}</div>
          <DicePairDisplay value={lastRoll} />
        </div>

        <FairPlayLogo />

        <div className="text-right w-full">
          <div className="text-white/40 text-sm mb-2">Баланс</div>
          <div
            className="text-white text-4xl"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            {formatBalance(balance)}
          </div>
        </div>
      </div>
    </div>
  )
}

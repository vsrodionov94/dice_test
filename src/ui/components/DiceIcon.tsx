interface DiceIconProps {
  value: 1 | 2 | 3 | 4 | 5 | 6
  size?: 'sm' | 'md' | 'lg'
  color?: 'win' | 'lose' | 'neutral'
}

const dotPositions: Record<number, string[]> = {
  1: ['top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'],
  2: ['top-[20%] left-[20%]', 'bottom-[20%] right-[20%]'],
  3: ['top-[20%] left-[20%]', 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', 'bottom-[20%] right-[20%]'],
  4: ['top-[20%] left-[20%]', 'top-[20%] right-[20%]', 'bottom-[20%] left-[20%]', 'bottom-[20%] right-[20%]'],
  5: ['top-[20%] left-[20%]', 'top-[20%] right-[20%]', 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', 'bottom-[20%] left-[20%]', 'bottom-[20%] right-[20%]'],
  6: ['top-[20%] left-[20%]', 'top-[20%] right-[20%]', 'top-1/2 left-[20%] -translate-y-1/2', 'top-1/2 right-[20%] -translate-y-1/2', 'bottom-[20%] left-[20%]', 'bottom-[20%] right-[20%]']
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-20 h-20'
}

const dotSizeClasses = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-3 h-3'
}

const colorClasses = {
  win: 'bg-stake-win/20 border-stake-win/40',
  lose: 'bg-stake-lose/20 border-stake-lose/40',
  neutral: 'bg-stake-gray/30 border-stake-gray/50'
}

const dotColorClasses = {
  win: 'bg-stake-win',
  lose: 'bg-stake-lose',
  neutral: 'bg-stake-light'
}

export function DiceIcon({ value, size = 'md', color = 'neutral' }: DiceIconProps) {
  const positions = dotPositions[value] || []

  return (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-lg border-2 relative`}>
      {positions.map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} ${dotSizeClasses[size]} ${dotColorClasses[color]} rounded-full`}
        />
      ))}
    </div>
  )
}

interface DiceDisplayProps {
  value: number
  size?: 'sm' | 'md' | 'lg'
  win?: boolean
}

export function DiceDisplay({ value, size = 'md', win }: DiceDisplayProps) {
  // Convert number (1-36) to two dice: first * 6 + second - 5 = value
  // 1 = 1_1, 2 = 1_2, ..., 6 = 1_6, 7 = 2_1, ..., 36 = 6_6
  const first = (Math.floor((value - 1) / 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6
  const second = (((value - 1) % 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6

  const color = win === undefined ? 'neutral' : win ? 'win' : 'lose'

  return (
    <div className="flex gap-2 justify-center">
      <DiceIcon value={first} size={size} color={color} />
      <DiceIcon value={second} size={size} color={color} />
    </div>
  )
}

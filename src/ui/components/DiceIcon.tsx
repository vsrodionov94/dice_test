import styles from './DiceIcon.module.css'

interface DiceIconProps {
  value: 1 | 2 | 3 | 4 | 5 | 6
  size?: 'sm' | 'md' | 'lg'
  color?: 'win' | 'lose' | 'neutral'
}

type DotPosition = { top: string; left: string; transform?: string }

const dotPositionsSm: Record<number, DotPosition[]> = {
  1: [{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }],
  2: [{ top: '20%', left: '20%' }, { top: '80%', left: '80%', transform: 'translate(-100%, -100%)' }],
  3: [{ top: '20%', left: '20%' }, { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }, { top: '80%', left: '80%', transform: 'translate(-100%, -100%)' }],
  4: [{ top: '20%', left: '20%' }, { top: '20%', left: '80%', transform: 'translateX(-100%)' }, { top: '80%', left: '20%', transform: 'translateY(-100%)' }, { top: '80%', left: '80%', transform: 'translate(-100%, -100%)' }],
  5: [{ top: '20%', left: '20%' }, { top: '20%', left: '80%', transform: 'translateX(-100%)' }, { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }, { top: '80%', left: '20%', transform: 'translateY(-100%)' }, { top: '80%', left: '80%', transform: 'translate(-100%, -100%)' }],
  6: [{ top: '20%', left: '20%' }, { top: '20%', left: '80%', transform: 'translateX(-100%)' }, { top: '50%', left: '20%', transform: 'translateY(-50%)' }, { top: '50%', left: '80%', transform: 'translate(-100%, -50%)' }, { top: '80%', left: '20%', transform: 'translateY(-100%)' }, { top: '80%', left: '80%', transform: 'translate(-100%, -100%)' }]
}

const sizeClasses = {
  sm: styles.diceSm,
  md: styles.diceMd,
  lg: styles.diceLg
}

const dotSizeClasses = {
  sm: styles.dotSm,
  md: styles.dotMd,
  lg: styles.dotLg
}

const colorClasses = {
  win: styles.diceWin,
  lose: styles.diceLose,
  neutral: styles.diceNeutral
}

const dotColorClasses = {
  win: styles.dotWin,
  lose: styles.dotLose,
  neutral: styles.dotNeutral
}

export function DiceIcon({ value, size = 'md', color = 'neutral' }: DiceIconProps) {
  const positions = dotPositionsSm[value] || []

  return (
    <div className={`${styles.dice} ${sizeClasses[size]} ${colorClasses[color]}`}>
      {positions.map((pos, i) => (
        <div
          key={i}
          className={`${styles.dot} ${dotSizeClasses[size]} ${dotColorClasses[color]}`}
          style={pos}
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
  const first = (Math.floor((value - 1) / 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6
  const second = (((value - 1) % 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6

  const color = win === undefined ? 'neutral' : win ? 'win' : 'lose'

  return (
    <div className={styles.diceContainer}>
      <DiceIcon value={first} size={size} color={color} />
      <DiceIcon value={second} size={size} color={color} />
    </div>
  )
}

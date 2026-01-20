import styles from './GameInfo.module.css'

interface GameInfoProps {
  rollId: string
  balance: number
  lastRoll?: number
}

const dotPositions: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]]
}

function Dice3D({ value, isBlack }: { value: number; isBlack?: boolean }) {
  const positions = dotPositions[value] || []

  return (
    <div className={`${styles.dice3d} ${isBlack ? styles.dice3dBlack : styles.dice3dWhite}`}>
      <div className={`${styles.dice3dInner} ${isBlack ? styles.dice3dInnerBlack : styles.dice3dInnerWhite}`}>
        {positions.map(([row, col], i) => (
          <div
            key={i}
            className={`${styles.dice3dDot} ${isBlack ? styles.dice3dDotWhite : styles.dice3dDotBlack}`}
            style={{
              top: row * 18 + 10,
              left: col * 18 + 10
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
      <div className={styles.dicePairDisplay}>
        <Dice3D value={1} isBlack />
        <Dice3D value={1} />
      </div>
    )
  }

  const first = Math.floor((value - 1) / 6) + 1
  const second = ((value - 1) % 6) + 1

  return (
    <div className={styles.dicePairDisplay}>
      <Dice3D value={first} isBlack />
      <Dice3D value={second} />
    </div>
  )
}

function FairPlayLogo() {
  return (
    <div className={styles.fairPlayLogo}>
      <div className={styles.logoOuter}>
        <div className={styles.logoInner}>
          <div className={styles.logoText}>
            <div className={styles.logoTitle}>ФНР</div>
            <div className={styles.logoSubtitle}>ЧЕСТНАЯ<br />ИГРА</div>
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
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <div className={`${styles.label} ${styles.labelLeft}`}>Комбинация № {rollId}</div>
          <DicePairDisplay value={lastRoll} />
        </div>

        <FairPlayLogo />

        <div className={styles.rightSection}>
          <div className={`${styles.label} ${styles.labelRight}`}>Баланс</div>
          <div className={styles.balance}>{formatBalance(balance)}</div>
        </div>
      </div>
    </div>
  )
}

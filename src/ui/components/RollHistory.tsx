import styles from './RollHistory.module.css'

export interface HistoryItem {
  id: number
  roll: number
  win: boolean
  amount: number
  payout: number
  target: number
  condition: 'HOT' | 'COLD'
  rollId?: string
  timestamp?: Date
  multiplier?: number
}

interface RollHistoryProps {
  history: HistoryItem[]
}

const dotPositions: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]]
}

function DiceSmall({ value, isBlack }: { value: number; isBlack?: boolean }) {
  const positions = dotPositions[value] || []

  return (
    <div
      className={`${styles.diceSmall} ${isBlack ? styles.diceSmallBlack : styles.diceSmallWhite}`}
    >
      {positions.map(([row, col], i) => (
        <div
          key={i}
          className={`${styles.diceDot} ${isBlack ? styles.diceDotWhite : styles.diceDotBlack}`}
          style={{
            top: row * 6 + 4,
            left: col * 6 + 4
          }}
        />
      ))}
    </div>
  )
}

function DicePair({ value }: { value: number }) {
  const first = Math.floor((value - 1) / 6) + 1
  const second = ((value - 1) % 6) + 1

  return (
    <>
      <DiceSmall value={first} isBlack />
      <DiceSmall value={second} />
    </>
  )
}

function ActiveCard({ item }: { item: HistoryItem }) {
  const result = item.win ? item.payout : -item.amount

  return (
    <div className={styles.cardActive}>
      <div className={styles.cardActiveHeader}>
        <DicePair value={item.roll} />
      </div>
      <div className={styles.cardActiveBody}>
        <div className={styles.row}>
          <span className={styles.label}>Сумма:</span>
          <span className={styles.value}>{item.amount}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Итог:</span>
          <span className={`${styles.value} ${item.win ? styles.valueWin : styles.valueLose}`}>
            {result > 0 ? '+' : ''}{result}
          </span>
        </div>
      </div>
    </div>
  )
}

function ExpandedCard({ item, index }: { item: HistoryItem; index: number }) {
  const result = item.win ? item.payout : -item.amount
  const time = item.timestamp
    ? item.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '—'
  const multiplier = item.multiplier ?? (item.win ? (item.payout / item.amount).toFixed(2) : '0.00')

  return (
    <div className={styles.cardExpanded}>
      <div className={styles.cardExpandedHeader}>
        <div className={styles.cardExpandedDices}>
          <DicePair value={item.roll} />
        </div>
        <span className={styles.cardExpandedInfo}>Бросок №{index + 1}</span>
        <span className={styles.cardExpandedTime}>{time} (по МСК)</span>
      </div>
      <div className={styles.cardExpandedBody}>
        <div className={styles.cardExpandedRow}>
          <div className={styles.rowHalf}>
            <span className={styles.label}>Сумма:</span>
            <span className={styles.value}>{item.amount}</span>
          </div>
          <div className={styles.rowHalf}>
            <span className={styles.label}>Кф:</span>
            <span className={styles.value}>{multiplier}</span>
          </div>
        </div>
        <div className={styles.cardExpandedRowCenter}>
          <div className={styles.rowCentered}>
            <span className={styles.label}>Итог:</span>
            <span className={`${styles.value} ${item.win ? styles.valueWin : styles.valueLose}`}>
              {result > 0 ? '+' : ''}{result}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function RollHistory({ history }: RollHistoryProps) {
  return (
    <div className={styles.container}>
      <button className={styles.menuButton}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>

      <div className={styles.historyLabel}>
        <span>История</span>
        <span>бросков</span>
      </div>

      <div className={styles.diceHistory}>
        {history.length !== 0 && (
          history.slice(0, 5).map((item, i) => (
            i === 0
              ? <ActiveCard key={item.id} item={item} />
              : <ExpandedCard key={item.id} item={item} index={i} />
          ))
        )}
      </div>
    </div>
  )
}

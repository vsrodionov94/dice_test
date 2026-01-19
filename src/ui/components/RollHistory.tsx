import { DiceDisplay } from './DiceIcon'

export interface HistoryItem {
  id: number
  roll: number
  win: boolean
  amount: number
  payout: number
  target: number
  condition: 'UNDER' | 'OVER'
}

interface RollHistoryProps {
  history: HistoryItem[]
}

export function RollHistory({ history }: RollHistoryProps) {
  if (history.length === 0) return null

  return (
    <div className="mb-4">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {history.map((item) => (
          <div key={item.id} className="flex-shrink-0 flex flex-col items-center gap-1">
            <DiceDisplay value={item.roll} size="sm" win={item.win} />
            <span className={`text-xs font-bold ${item.win ? 'text-stake-win' : 'text-stake-lose'}`}>
              {item.roll}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

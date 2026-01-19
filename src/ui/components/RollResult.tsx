import { BetResponse } from '../../api/dice'

interface RollResultProps {
  result: BetResponse | null
  target: number
  condition: 'UNDER' | 'OVER'
}

export function RollResult({ result, target, condition }: RollResultProps) {
  if (!result) {
    return (
      <div className="bg-stake-darker rounded-lg p-8 flex items-center justify-center">
        <div className="text-6xl font-bold text-stake-gray">?</div>
      </div>
    )
  }

  const isWin = result.win

  return (
    <div className={`rounded-lg p-8 ${isWin ? 'bg-stake-win/10' : 'bg-stake-lose/10'}`}>
      <div className="text-center">
        <div className={`text-6xl font-bold mb-4 ${isWin ? 'text-stake-win' : 'text-stake-lose'}`}>
          {result.roll}
        </div>
        <div className={`text-lg font-semibold mb-2 ${isWin ? 'text-stake-win' : 'text-stake-lose'}`}>
          {isWin ? 'WIN!' : 'LOSE'}
        </div>
        <div className="text-stake-light text-sm">
          Roll {condition === 'UNDER' ? '<' : '>'} {target}
        </div>
        {isWin && (
          <div className="text-stake-win text-lg font-semibold mt-2">
            +${result.payout.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  )
}

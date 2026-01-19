import { useState, useEffect, useRef } from 'react'
import { useGame, Condition } from '../hooks/useGame'
import { BalanceDisplay } from '../components/BalanceDisplay'
import { BetInput } from '../components/BetInput'
import { TargetSlider } from '../components/TargetSlider'
import { ConditionToggle } from '../components/ConditionToggle'
import { RollButton } from '../components/RollButton'
import { MultiplierDisplay } from '../components/MultiplierDisplay'
import { RollHistory, HistoryItem } from '../components/RollHistory'
import { DiceDisplay } from '../components/DiceIcon'
import { ScaledContainer } from '../components/ScaledContainer'

export default function DicePage() {
  const game = useGame()
  const [betAmount, setBetAmount] = useState(10)
  const [target, setTarget] = useState(18)
  const [condition, setCondition] = useState<Condition>('UNDER')
  const [showResult, setShowResult] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const historyIdRef = useRef(0)

  useEffect(() => {
    if (game.lastResult) {
      setShowResult(true)
      const timer = setTimeout(() => setShowResult(false), 1500)

      historyIdRef.current++
      setHistory(prev => [{
        id: historyIdRef.current,
        roll: game.lastResult!.roll,
        win: game.lastResult!.win,
        amount: betAmount,
        payout: game.lastResult!.payout,
        target,
        condition
      }, ...prev].slice(0, 50))

      return () => clearTimeout(timer)
    }
  }, [game.lastResult, game.nonce])

  const handleRoll = async () => {
    if (betAmount > game.balance || betAmount <= 0) return
    await game.placeBet(betAmount, target, condition)
  }

  const isDisabled = !game.initialized || game.isLoading

  if (!game.initialized && !game.error) {
    return (
      <ScaledContainer>
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-stake-light text-xl">Загрузка...</div>
        </div>
      </ScaledContainer>
    )
  }

  if (game.error && !game.initialized) {
    return (
      <ScaledContainer>
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-stake-lose text-xl mb-4">{game.error}</div>
            <button
              onClick={() => game.init()}
              className="px-6 py-3 bg-stake-accent text-stake-darker rounded-lg font-semibold"
            >
              Повторить
            </button>
          </div>
        </div>
      </ScaledContainer>
    )
  }

  return (
    <ScaledContainer>
      <div className="w-full h-full flex flex-col relative overflow-hidden">
        {/* Result Overlay */}
        {showResult && game.lastResult && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-stake-darker/90">
            <div className="text-center px-4">
              <div className="mb-4">
                <DiceDisplay value={game.lastResult.roll} size="lg" win={game.lastResult.win} />
              </div>
              <div className={`text-6xl font-bold mb-2 ${game.lastResult.win ? 'text-stake-win' : 'text-stake-lose'}`}>
                {game.lastResult.roll}
              </div>
              <div className={`text-2xl font-bold ${game.lastResult.win ? 'text-stake-win' : 'text-stake-lose'}`}>
                {game.lastResult.win ? 'ВЫИГРЫШ!' : 'ПРОИГРЫШ'}
              </div>
              {game.lastResult.win && (
                <div className="text-stake-win text-xl mt-2">
                  +{game.lastResult.payout.toFixed(2)} ₽
                </div>
              )}
            </div>
          </div>
        )}

        {/* Top Section */}
        <div className="p-4 pb-0">
          <BalanceDisplay balance={game.balance} />
          <RollHistory history={history} />
        </div>

        {/* Center Section - Target Selection */}
        <div className="flex-1 flex flex-col justify-center p-4">
          <div className="bg-stake-dark rounded-xl p-4">
            <TargetSlider
              value={target}
              onChange={setTarget}
              condition={condition}
              disabled={isDisabled}
            />

            <ConditionToggle
              value={condition}
              onChange={setCondition}
              disabled={isDisabled}
            />

            <MultiplierDisplay
              target={target}
              condition={condition}
            />
          </div>
        </div>

        {/* Bottom Section - Bet & Roll */}
        <div className="p-4 bg-stake-darker">
          {game.error && (
            <div className="mb-4 p-3 bg-stake-lose/20 rounded-lg text-stake-lose text-sm">
              {game.error}
            </div>
          )}

          <BetInput
            value={betAmount}
            onChange={setBetAmount}
            maxBet={game.balance}
            disabled={isDisabled}
          />

          <RollButton
            onClick={handleRoll}
            disabled={isDisabled || betAmount > game.balance || betAmount <= 0}
            isLoading={game.isLoading}
          />
        </div>
      </div>
    </ScaledContainer>
  )
}

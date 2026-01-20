import { useState, useEffect, useRef } from 'react'
import { useGame, Condition } from '../hooks/useGame'
import { RollHistory, HistoryItem } from '../components/RollHistory'
import { GameInfo } from '../components/GameInfo'
import { HotColdStats } from '../components/HotColdStats'
import { TargetSlider } from '../components/TargetSlider'
import { BetButtons } from '../components/BetButtons'
import { BetInput } from '../components/BetInput'
import { ChipSelector } from '../components/ChipSelector'
import { DiceDisplay } from '../components/DiceIcon'
import { ScaledContainer } from '../components/ScaledContainer'

export default function DicePage() {
  const game = useGame()
  const [betAmount, setBetAmount] = useState(100)
  const [target, setTarget] = useState(18)
  const [showResult, setShowResult] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [lastCondition, setLastCondition] = useState<Condition>('HOT')
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
        condition: lastCondition,
        rollId: game.rollId
      }, ...prev].slice(0, 50))

      return () => clearTimeout(timer)
    }
  }, [game.lastResult, game.nonce])

  const handleBet = async (condition: Condition) => {
    if (betAmount > game.balance || betAmount <= 0) return
    setLastCondition(condition)
    await game.placeBet(betAmount, target, condition)
  }

  const handleChipSelect = (amount: number | 'max') => {
    if (amount === 'max') {
      setBetAmount(game.balance)
    } else {
      setBetAmount(Math.min(amount, game.balance))
    }
  }

  const isDisabled = !game.initialized || game.isLoading

  if (!game.initialized && !game.error) {
    return (
      <ScaledContainer>
        <div className="w-full h-full flex items-center justify-center bg-[#10141c]">
          <div className="text-white/60 text-xl">Загрузка...</div>
        </div>
      </ScaledContainer>
    )
  }

  if (game.error && !game.initialized) {
    return (
      <ScaledContainer>
        <div className="w-full h-full flex items-center justify-center bg-[#10141c]">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">{game.error}</div>
            <button
              onClick={() => game.init()}
              className="px-6 py-3 bg-green-500 text-black rounded-lg font-semibold"
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
      <div className="w-full h-full flex flex-col relative overflow-hidden bg-[#10141c]">
        {/* Result Overlay */}
        {showResult && game.lastResult && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#10141c]/95">
            <div className="text-center px-4">
              <div className="mb-4">
                <DiceDisplay value={game.lastResult.roll} size="lg" win={game.lastResult.win} />
              </div>
              <div className={`text-6xl font-bold mb-2 ${game.lastResult.win ? 'text-green-500' : 'text-red-500'}`}>
                {game.lastResult.roll}
              </div>
              <div className={`text-2xl font-bold ${game.lastResult.win ? 'text-green-500' : 'text-red-500'}`}>
                {game.lastResult.win ? 'ВЫИГРЫШ!' : 'ПРОИГРЫШ'}
              </div>
              {game.lastResult.win && (
                <div className="text-green-500 text-xl mt-2">
                  +{game.lastResult.payout.toFixed(0)} ₽
                </div>
              )}
            </div>
          </div>
        )}

        {/* Roll History */}
        <div className="px-4 py-2">
          <RollHistory history={history} />
        </div>

        {/* Game Info */}
        <div className="py-2">
          <GameInfo
            rollId={game.rollId}
            balance={game.balance}
            lastRoll={game.lastResult?.roll}
          />
        </div>

        {/* HOT/COLD Stats */}
        <HotColdStats target={target} />

        {/* Betting Panel - unified block */}
        <div className="mx-4 bg-[#1c2232] rounded-[40px] p-6">
          {/* Target Slider */}
          <TargetSlider
            value={target}
            onChange={setTarget}
            disabled={isDisabled}
          />

          {/* Bet Buttons */}
          <div className="pt-4 pb-5">
            <BetButtons
              onBet={handleBet}
              target={target}
              disabled={isDisabled || betAmount > game.balance || betAmount <= 0}
              isLoading={game.isLoading}
            />
          </div>

          {/* Bet Input */}
          <BetInput
            value={betAmount}
            onChange={setBetAmount}
            maxBet={game.balance}
            disabled={isDisabled}
          />
        </div>

        {/* Chip Selector */}
        <div className="py-2 mt-auto">
          <ChipSelector
            onSelect={handleChipSelect}
            selectedAmount={betAmount}
            maxBet={game.balance}
            disabled={isDisabled}
          />
        </div>

        {/* Error message */}
        {game.error && (
          <div className="absolute bottom-32 left-4 right-4 p-3 bg-red-500/20 rounded-lg text-red-500 text-sm text-center">
            {game.error}
          </div>
        )}
      </div>
    </ScaledContainer>
  )
}

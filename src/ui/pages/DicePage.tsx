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
import styles from './DicePage.module.css'

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
      setBetAmount(prev => Math.min(prev + amount, game.balance))
    }
  }

  const isDisabled = !game.initialized || game.isLoading

  if (!game.initialized && !game.error) {
    return (
      <ScaledContainer>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingText}>Загрузка...</div>
        </div>
      </ScaledContainer>
    )
  }

  if (game.error && !game.initialized) {
    return (
      <ScaledContainer>
        <div className={styles.loadingContainer}>
          <div className={styles.errorContainer}>
            <div className={styles.errorText}>{game.error}</div>
            <button
              onClick={() => game.init()}
              className={styles.retryButton}
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
      <div className={styles.page}>
        {showResult && game.lastResult && (
          <div className={styles.resultOverlay}>
            <div className={styles.resultContent}>
              <div className={styles.resultDice}>
                <DiceDisplay value={game.lastResult.roll} size="lg" win={game.lastResult.win} />
              </div>
              <div className={`${styles.resultNumber} ${game.lastResult.win ? styles.resultNumberWin : styles.resultNumberLose}`}>
                {game.lastResult.roll}
              </div>
              <div className={`${styles.resultText} ${game.lastResult.win ? styles.resultTextWin : styles.resultTextLose}`}>
                {game.lastResult.win ? 'ВЫИГРЫШ!' : 'ПРОИГРЫШ'}
              </div>
              {game.lastResult.win && (
                <div className={styles.resultPayout}>
                  +{game.lastResult.payout.toFixed(0)} ₽
                </div>
              )}
            </div>
          </div>
        )}

        <div className={styles.historySection}>
          <RollHistory history={history} />
        </div>

        <div className={styles.gameInfoSection}>
          <GameInfo
            rollId={game.rollId}
            balance={game.balance}
            lastRoll={game.lastResult?.roll}
          />
        </div>

        <HotColdStats target={target} />

        <div className={styles.sliderPanel}>
          <TargetSlider
            value={target}
            onChange={setTarget}
            disabled={isDisabled}
          />
        </div>

        <div className={styles.betButtonsSection}>
          <BetButtons
            onBet={handleBet}
            target={target}
            disabled={isDisabled || betAmount > game.balance || betAmount <= 0}
            isLoading={game.isLoading}
          />
        </div>

        <div className={styles.betInputPanel}>
          <BetInput
            value={betAmount}
            onChange={setBetAmount}
            maxBet={game.balance}
            disabled={isDisabled}
          />
          <ChipSelector
            onSelect={handleChipSelect}
            selectedAmount={betAmount}
            maxBet={game.balance}
            disabled={isDisabled}
          />
        </div>

        {game.error && (
          <div className={styles.errorMessage}>
            {game.error}
          </div>
        )}
      </div>
    </ScaledContainer>
  )
}

import { useState, useCallback, useRef, useEffect } from 'react'
import { BetResponse } from '../../api/dice'
import { Condition } from './useGame'

export interface AutoBetConfig {
  numberOfBets: number
  delay: number
  stopOnProfit: number | null
  stopOnLoss: number | null
}

export interface AutoBetState {
  isRunning: boolean
  betsRemaining: number
  totalProfit: number
}

interface UseAutoBetProps {
  placeBet: (amount: number, target: number, condition: Condition) => Promise<BetResponse | null>
  balance: number
}

export function useAutoBet({ placeBet, balance }: UseAutoBetProps) {
  const [config, setConfig] = useState<AutoBetConfig>({
    numberOfBets: 10,
    delay: 1000,
    stopOnProfit: null,
    stopOnLoss: null
  })

  const [state, setState] = useState<AutoBetState>({
    isRunning: false,
    betsRemaining: 0,
    totalProfit: 0
  })

  const stopRef = useRef(false)
  const initialBalanceRef = useRef(0)

  const start = useCallback(async (
    amount: number,
    target: number,
    condition: Condition
  ) => {
    stopRef.current = false
    initialBalanceRef.current = balance

    setState({
      isRunning: true,
      betsRemaining: config.numberOfBets,
      totalProfit: 0
    })

    for (let i = 0; i < config.numberOfBets; i++) {
      if (stopRef.current) break

      const result = await placeBet(amount, target, condition)

      if (!result) {
        break
      }

      const currentProfit = result.balance - initialBalanceRef.current

      setState(prev => ({
        ...prev,
        betsRemaining: config.numberOfBets - i - 1,
        totalProfit: currentProfit
      }))

      // Check stop conditions
      if (config.stopOnProfit !== null && currentProfit >= config.stopOnProfit) {
        break
      }

      if (config.stopOnLoss !== null && currentProfit <= -config.stopOnLoss) {
        break
      }

      // Check if balance is sufficient for next bet
      if (result.balance < amount) {
        break
      }

      // Delay before next bet
      if (i < config.numberOfBets - 1 && !stopRef.current) {
        await new Promise(resolve => setTimeout(resolve, config.delay))
      }
    }

    setState(prev => ({ ...prev, isRunning: false }))
  }, [config, placeBet, balance])

  const stop = useCallback(() => {
    stopRef.current = true
    setState(prev => ({ ...prev, isRunning: false }))
  }, [])

  useEffect(() => {
    return () => {
      stopRef.current = true
    }
  }, [])

  return {
    config,
    setConfig,
    state,
    start,
    stop
  }
}

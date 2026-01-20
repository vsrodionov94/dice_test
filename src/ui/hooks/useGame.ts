import { useState, useCallback, useEffect } from 'react'
import { api, BetResponse } from '../../api/dice'

// UI uses HOT/COLD, API uses UNDER/OVER
// HOT = UNDER (win if roll < target)
// COLD = OVER (win if roll > target)
export type Condition = 'HOT' | 'COLD'

export interface GameState {
  balance: number
  nonce: number
  lastResult: BetResponse | null
  isLoading: boolean
  initialized: boolean
  error: string | null
  rollId: string
}

function generateRollId(): string {
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
  const number = String(Math.floor(Math.random() * 1000)).padStart(3, '0')
  return `${letter}-${number}`
}

export function useGame() {
  const [state, setState] = useState<GameState>({
    balance: 0,
    nonce: 0,
    lastResult: null,
    isLoading: false,
    initialized: false,
    error: null,
    rollId: generateRollId()
  })

  const init = useCallback(async (initialBalance?: number) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await api.init(initialBalance)
      setState({
        balance: response.balance,
        nonce: response.nonce,
        lastResult: null,
        isLoading: false,
        initialized: true,
        error: null,
        rollId: generateRollId()
      })
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to initialize'
      }))
    }
  }, [])

  const placeBet = useCallback(async (
    amount: number,
    target: number,
    condition: Condition
  ): Promise<BetResponse | null> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    // Map HOT/COLD to UNDER/OVER for API
    // HOT wins if roll < target (UNDER)
    // COLD wins if roll > target (OVER)
    const apiCondition = condition === 'HOT' ? 'UNDER' : 'OVER'

    try {
      const response = await api.bet({ amount, target, condition: apiCondition })
      setState(prev => ({
        ...prev,
        balance: response.balance,
        nonce: response.nonce,
        lastResult: response,
        isLoading: false,
        rollId: generateRollId()
      }))
      return response
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Bet failed'
      }))
      return null
    }
  }, [])

  useEffect(() => {
    init()
  }, [init])

  return {
    ...state,
    init,
    placeBet
  }
}

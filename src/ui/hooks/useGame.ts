import { useState, useCallback, useEffect } from 'react'
import { api, BetResponse } from '../../api/dice'

export type Condition = 'UNDER' | 'OVER'

export interface GameState {
  balance: number
  nonce: number
  lastResult: BetResponse | null
  isLoading: boolean
  initialized: boolean
  error: string | null
}

export function useGame() {
  const [state, setState] = useState<GameState>({
    balance: 0,
    nonce: 0,
    lastResult: null,
    isLoading: false,
    initialized: false,
    error: null
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
        error: null
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

    try {
      const response = await api.bet({ amount, target, condition })
      setState(prev => ({
        ...prev,
        balance: response.balance,
        nonce: response.nonce,
        lastResult: response,
        isLoading: false
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

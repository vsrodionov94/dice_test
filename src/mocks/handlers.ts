import { http, HttpResponse } from 'msw'
import { state, resetState } from './state'

interface InitRequest {
  balance?: number
}

interface BetRequest {
  amount: number
  target: number
  condition: 'UNDER' | 'OVER'
}

export const handlers = [
  http.post('/api/init', async ({ request }) => {
    const body = await request.json() as InitRequest
    resetState(body.balance)

    return HttpResponse.json({
      balance: state.balance,
      nonce: state.nonce
    })
  }),

  http.post('/api/bet', async ({ request }) => {
    const body = await request.json() as BetRequest
    const { amount, target, condition } = body

    if (amount <= 0 || amount > state.balance) {
      return HttpResponse.json(
        { error: 'Invalid bet amount' },
        { status: 400 }
      )
    }

    if (target < 1 || target > 36) {
      return HttpResponse.json(
        { error: 'Target must be between 1 and 36' },
        { status: 400 }
      )
    }

    // Generate roll (1-36)
    const roll = Math.floor(Math.random() * 36) + 1

    // Determine win
    const win = condition === 'UNDER' ? roll < target : roll > target

    // Calculate multiplier based on probability
    // UNDER: probability = (target - 1) / 36, multiplier = 36 / (target - 1)
    // OVER: probability = (36 - target) / 36, multiplier = 36 / (36 - target)
    const probability = condition === 'UNDER'
      ? (target - 1) / 36
      : (36 - target) / 36

    const multiplier = probability > 0 ? (1 / probability) * 0.99 : 0 // 1% house edge

    // Calculate payout
    const payout = win ? amount * multiplier : 0

    // Update balance
    state.balance = state.balance - amount + payout
    state.nonce++

    return HttpResponse.json({
      roll,
      win,
      payout: Math.round(payout * 100) / 100,
      balance: Math.round(state.balance * 100) / 100,
      nonce: state.nonce
    })
  })
]

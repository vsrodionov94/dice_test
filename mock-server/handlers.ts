import { Router, json } from 'express'
import { state, resetState } from './state.js'

const router = Router()
router.use(json())

interface InitRequest {
  balance?: number
}

interface BetRequest {
  amount: number
  target: number
  condition: 'UNDER' | 'OVER'
}

router.post('/init', (req, res) => {
  const { balance } = req.body as InitRequest
  resetState(balance)

  res.json({
    balance: state.balance,
    nonce: state.nonce
  })
})

router.post('/bet', (req, res) => {
  const { amount, target, condition } = req.body as BetRequest

  if (amount <= 0 || amount > state.balance) {
    res.status(400).json({ error: 'Invalid bet amount' })
    return
  }

  if (target < 1 || target > 36) {
    res.status(400).json({ error: 'Target must be between 1 and 36' })
    return
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

  res.json({
    roll,
    win,
    payout: Math.round(payout * 100) / 100,
    balance: Math.round(state.balance * 100) / 100,
    nonce: state.nonce
  })
})

export default router

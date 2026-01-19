const API_BASE = '/api'

export interface InitResponse {
  balance: number
  nonce: number
}

export interface BetRequest {
  amount: number
  target: number
  condition: 'UNDER' | 'OVER'
}

export interface BetResponse {
  roll: number
  win: boolean
  payout: number
  balance: number
  nonce: number
}

export const api = {
  async init(balance?: number): Promise<InitResponse> {
    const response = await fetch(`${API_BASE}/init`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ balance })
    })

    if (!response.ok) {
      throw new Error('Failed to initialize game')
    }

    return response.json()
  },

  async bet(request: BetRequest): Promise<BetResponse> {
    const response = await fetch(`${API_BASE}/bet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Bet failed')
    }

    return response.json()
  }
}

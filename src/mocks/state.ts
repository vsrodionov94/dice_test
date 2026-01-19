export interface GameState {
  balance: number
  nonce: number
}

export const state: GameState = {
  balance: 1000,
  nonce: 0
}

export function resetState(initialBalance?: number): void {
  state.balance = initialBalance ?? 1000
  state.nonce = 0
}

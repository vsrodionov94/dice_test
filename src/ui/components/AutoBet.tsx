import { AutoBetConfig, AutoBetState } from '../hooks/useAutoBet'

interface AutoBetProps {
  config: AutoBetConfig
  onConfigChange: (config: AutoBetConfig) => void
  state: AutoBetState
  onStart: () => void
  onStop: () => void
  disabled?: boolean
}

export function AutoBet({
  config,
  onConfigChange,
  state,
  onStart,
  onStop,
  disabled
}: AutoBetProps) {
  return (
    <div className="bg-stake-darker rounded-lg p-4 mt-4">
      <div className="text-stake-light text-sm mb-4 font-semibold">Auto Bet</div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-stake-light text-xs mb-1 block">Number of Bets</label>
          <input
            type="number"
            value={config.numberOfBets}
            onChange={(e) => onConfigChange({ ...config, numberOfBets: Math.max(1, Number(e.target.value)) })}
            className="w-full bg-stake-dark text-white rounded py-2 px-3 text-sm outline-none focus:ring-1 focus:ring-stake-accent"
            disabled={state.isRunning || disabled}
            min={1}
          />
        </div>
        <div>
          <label className="text-stake-light text-xs mb-1 block">Delay (ms)</label>
          <input
            type="number"
            value={config.delay}
            onChange={(e) => onConfigChange({ ...config, delay: Math.max(100, Number(e.target.value)) })}
            className="w-full bg-stake-dark text-white rounded py-2 px-3 text-sm outline-none focus:ring-1 focus:ring-stake-accent"
            disabled={state.isRunning || disabled}
            min={100}
            step={100}
          />
        </div>
        <div>
          <label className="text-stake-light text-xs mb-1 block">Stop on Profit</label>
          <input
            type="number"
            value={config.stopOnProfit ?? ''}
            onChange={(e) => onConfigChange({
              ...config,
              stopOnProfit: e.target.value ? Number(e.target.value) : null
            })}
            placeholder="None"
            className="w-full bg-stake-dark text-white rounded py-2 px-3 text-sm outline-none focus:ring-1 focus:ring-stake-accent"
            disabled={state.isRunning || disabled}
            min={0}
          />
        </div>
        <div>
          <label className="text-stake-light text-xs mb-1 block">Stop on Loss</label>
          <input
            type="number"
            value={config.stopOnLoss ?? ''}
            onChange={(e) => onConfigChange({
              ...config,
              stopOnLoss: e.target.value ? Number(e.target.value) : null
            })}
            placeholder="None"
            className="w-full bg-stake-dark text-white rounded py-2 px-3 text-sm outline-none focus:ring-1 focus:ring-stake-accent"
            disabled={state.isRunning || disabled}
            min={0}
          />
        </div>
      </div>

      {state.isRunning && (
        <div className="mb-4 text-sm">
          <div className="flex justify-between text-stake-light">
            <span>Bets Remaining:</span>
            <span>{state.betsRemaining}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stake-light">Total Profit:</span>
            <span className={state.totalProfit >= 0 ? 'text-stake-win' : 'text-stake-lose'}>
              ${state.totalProfit.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      <button
        onClick={state.isRunning ? onStop : onStart}
        disabled={disabled && !state.isRunning}
        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
          state.isRunning
            ? 'bg-stake-lose text-white hover:brightness-110'
            : 'bg-stake-gray text-stake-light hover:bg-opacity-80'
        } disabled:opacity-50`}
      >
        {state.isRunning ? 'Stop' : 'Start Auto Bet'}
      </button>
    </div>
  )
}

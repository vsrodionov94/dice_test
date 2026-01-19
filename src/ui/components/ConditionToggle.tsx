interface ConditionToggleProps {
  value: 'UNDER' | 'OVER'
  onChange: (value: 'UNDER' | 'OVER') => void
  disabled?: boolean
}

export function ConditionToggle({ value, onChange, disabled }: ConditionToggleProps) {
  return (
    <div className="mb-4">
      <label className="text-stake-light text-sm mb-2 block">Условие</label>
      <div className="flex gap-2">
        <button
          onClick={() => onChange('UNDER')}
          disabled={disabled}
          className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
            value === 'UNDER'
              ? 'bg-stake-accent text-stake-darker'
              : 'bg-stake-gray text-stake-light hover:bg-opacity-80'
          } disabled:opacity-50`}
        >
          Меньше
        </button>
        <button
          onClick={() => onChange('OVER')}
          disabled={disabled}
          className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
            value === 'OVER'
              ? 'bg-stake-accent text-stake-darker'
              : 'bg-stake-gray text-stake-light hover:bg-opacity-80'
          } disabled:opacity-50`}
        >
          Больше
        </button>
      </div>
    </div>
  )
}

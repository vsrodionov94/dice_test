interface BalanceDisplayProps {
  balance: number
  onSettingsClick?: () => void
}

export function BalanceDisplay({ balance, onSettingsClick }: BalanceDisplayProps) {
  return (
    <div className="bg-stake-darker rounded-lg p-4 mb-4 flex items-center justify-between w-full">
      <div>
        <div className="text-stake-light text-sm mb-1">Баланс</div>
        <div className="text-white text-2xl font-bold">
          {balance.toFixed(2)} ₽
        </div>
      </div>
      <button
        onClick={onSettingsClick}
        className="w-12 h-12 rounded-lg bg-stake-gray/50 flex items-center justify-center hover:bg-stake-gray transition-colors"
      >
        <svg
          className="w-6 h-6 text-stake-light"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
    </div>
  )
}

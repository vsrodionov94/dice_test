interface RollButtonProps {
  onClick: () => void
  disabled?: boolean
  isLoading?: boolean
}

export function RollButton({ onClick, disabled, isLoading }: RollButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full py-4 bg-stake-accent text-stake-darker font-bold text-lg rounded-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      {isLoading ? 'Бросаем...' : 'Бросить'}
    </button>
  )
}

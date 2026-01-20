interface HeaderProps {
  onBack?: () => void
}

export function Header({ onBack }: HeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <button onClick={onBack} className="text-white">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="flex items-center gap-2 bg-white rounded-full px-4 py-1.5">
        <span className="text-black font-bold text-sm">Winline</span>
        <div className="w-3 h-3 bg-orange-500 rounded-full" />
      </div>

      <button className="flex items-center gap-1 text-orange-400">
        <span className="text-sm font-medium">Пополнить</span>
        <div className="w-5 h-5 rounded-full border border-orange-400 flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </button>
    </div>
  )
}

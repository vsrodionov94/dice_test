interface MultiplierDisplayProps {
  target: number
  condition: 'UNDER' | 'OVER'
}

export function MultiplierDisplay({ target, condition }: MultiplierDisplayProps) {
  const probability = condition === 'UNDER'
    ? (target - 1) / 36
    : (36 - target) / 36

  const multiplier = probability > 0 ? (1 / probability) * 0.99 : 0

  return (
    <div className="bg-stake-darker rounded-lg p-4">
      <div className="text-stake-light text-sm mb-1">Множитель</div>
      <div className="text-stake-accent text-2xl font-bold">
        {multiplier.toFixed(4)}×
      </div>
    </div>
  )
}

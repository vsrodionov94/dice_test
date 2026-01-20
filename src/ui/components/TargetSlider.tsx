interface TargetSliderProps {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

export function TargetSlider({ value, onChange, disabled }: TargetSliderProps) {
  const markers = [0, 9, 18, 27, 36]
  // Slider range is 2-35 to ensure both HOT and COLD have at least one winning number
  const percentage = ((value - 2) / 33) * 100

  return (
    <div>
      {/* Markers */}
      <div className="flex justify-between mb-3 px-2">
        {markers.map((mark) => (
          <span
            key={mark}
            className={`font-bold transition-all ${
              mark === value
                ? 'text-white text-3xl'
                : 'text-white text-xl'
            }`}
          >
            {mark}
          </span>
        ))}
      </div>

      {/* Dots row */}
      <div className="flex justify-between mb-6 px-2">
        {Array.from({ length: 36 }, (_, i) => (
          <div
            key={i}
            className={`w-1 h-4 rounded-full ${
              i <= value ? 'bg-[#d74545]' : 'bg-[#416ae2]'
            }`}
          />
        ))}
      </div>

      {/* Slider track */}
      <div className="relative h-5 mb-2 px-2">
        {/* Gradient track */}
        <div
          className="absolute inset-x-2 top-0 h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, #d74545 0%, #cd4241 ${percentage}%, #416ae2 ${percentage}%, #416ae2 100%)`
          }}
        />

        {/* Slider input */}
        <input
          type="range"
          min={1}
          max={36}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-20"
        />

        {/* Thumb - large circle with gradient */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-12 h-16 rounded-full pointer-events-none z-10"
          style={{
            left: `calc(${percentage}% - 24px)`,
            background: 'linear-gradient(180deg, #ffffff 0%, #e0e0e0 50%, #b0b0b0 100%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 -4px 10px rgba(0,0,0,0.1)'
          }}
        >
          {/* Inner circle */}
          <div
            className="absolute inset-2 rounded-full"
            style={{
              background: 'linear-gradient(180deg, #f5f5f5 0%, #d5d5d5 100%)',
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.8)'
            }}
          />
        </div>
      </div>
    </div>
  )
}

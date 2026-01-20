import styles from './TargetSlider.module.css'

interface TargetSliderProps {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

export function TargetSlider({ value, onChange, disabled }: TargetSliderProps) {
  const markers = [0, 9, 18, 27, 36]
  const percentage = ((value - 1) / 35) * 100

  return (
    <div className={styles.container}>
      <div className={styles.markers}>
        {markers.map((mark) => (
          <span
            key={mark}
            className={`${styles.marker} ${mark === value ? styles.markerActive : ''}`}
          >
            {mark}
          </span>
        ))}
      </div>

      <div className={styles.dotsRow}>
        {Array.from({ length: 36 }, (_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${i < value ? styles.dotHot : styles.dotCold}`}
          />
        ))}
      </div>

      <div className={styles.sliderWrapper}>
        <div
          className={styles.sliderTrack}
          style={{
            background: `linear-gradient(90deg, #d74545 0%, #d74545 ${percentage}%, #416ae2 ${percentage}%, #416ae2 100%)`
          }}
        />

        <input
          type="range"
          min={1}
          max={36}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className={styles.sliderInput}
        />

        <div
          className={styles.sliderThumb}
          style={{ left: `calc(${percentage}% - 43px)` }}
        >
          <div className={styles.sliderThumbInner} />
        </div>
      </div>
    </div>
  )
}

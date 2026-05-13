const CIRCUMFERENCE = 2 * Math.PI * 110 // ≈ 691.15

const MODE_LABELS = {
  pomodoro: 'Focus Time',
  short:    'Short Break',
  long:     'Long Break',
}

function fmt(secs) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function Timer({ mode, remaining, total, isRunning }) {
  const progress = total > 0 ? remaining / total : 1
  const offset   = CIRCUMFERENCE * (1 - progress)

  return (
    <div className="timer-wrap">
      <svg className="timer-svg" viewBox="0 0 240 240">
        <circle className="ring-track" cx="120" cy="120" r="110" />
        <circle
          className="ring-fill"
          cx="120"
          cy="120"
          r="110"
          style={{ strokeDashoffset: offset }}
        />
      </svg>

      <div className="timer-face">
        <span className="timer-digits">{fmt(remaining)}</span>
        <span className="timer-mode-label">{MODE_LABELS[mode]}</span>
        <span className={`pulse-dot${isRunning ? ' visible' : ''}`} />
      </div>
    </div>
  )
}

export default Timer

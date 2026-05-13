const MODES = [
  { key: 'pomodoro', label: 'Pomodoro' },
  { key: 'short',    label: 'Short Break' },
  { key: 'long',     label: 'Long Break' },
]

function ModeButtons({ currentMode, onModeChange }) {
  return (
    <div className="mode-tabs">
      {MODES.map(({ key, label }) => (
        <button
          key={key}
          className={`mode-tab${currentMode === key ? ' active' : ''}`}
          onClick={() => onModeChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default ModeButtons

/* ── Icon helpers ── */
function ResetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10"/>
      <path d="M3.51 15a9 9 0 1 0 .49-4.5"/>
    </svg>
  )
}

function SkipIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 4 15 12 5 20 5 4"/>
      <line x1="19" y1="5" x2="19" y2="19"/>
    </svg>
  )
}

/* ── Component ── */
function ControlButtons({ isRunning, onToggle, onReset, onSkip }) {
  return (
    <div className="controls">
      <button
        className="btn-icon"
        onClick={onReset}
        title="Reset"
        aria-label="Reset timer"
      >
        <ResetIcon />
      </button>

      <button
        className="btn-main"
        onClick={onToggle}
        aria-label={isRunning ? 'Pause timer' : 'Start timer'}
      >
        {isRunning ? 'PAUSE' : 'START'}
      </button>

      <button
        className="btn-icon"
        onClick={onSkip}
        title="Skip"
        aria-label="Skip to next mode"
      >
        <SkipIcon />
      </button>
    </div>
  )
}

export default ControlButtons

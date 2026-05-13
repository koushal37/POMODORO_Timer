import { useState, useEffect, useRef, useCallback } from 'react'
import ModeButtons    from './components/ModeButtons.jsx'
import Timer          from './components/Timer.jsx'
import ControlButtons from './components/ControlButtons.jsx'

/* ── Mode config ── */
const MODES = {
  pomodoro: { secs: 25 * 60, color: '#e8604c' },
  short:    { secs:  5 * 60, color: '#60a8e8' },
  long:     { secs: 15 * 60, color: '#60c8a0' },
}

/* ── Audio helper ── */
let audioCtx = null
function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  return audioCtx
}
function beep(freq = 880, dur = 0.12, vol = 0.25) {
  try {
    const ctx  = getAudioCtx()
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(vol, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur)
    osc.start()
    osc.stop(ctx.currentTime + dur)
  } catch (_) {}
}
function chime() {
  beep(880, 0.15, 0.3)
  setTimeout(() => beep(1100, 0.15, 0.3), 180)
  setTimeout(() => beep(1320, 0.25, 0.3), 360)
}

/* ── App ── */
function App() {
  const [mode,      setMode]      = useState('pomodoro')
  const [remaining, setRemaining] = useState(MODES.pomodoro.secs)
  const [total,     setTotal]     = useState(MODES.pomodoro.secs)
  const [isRunning, setIsRunning] = useState(false)
  const [sessions,  setSessions]  = useState(0)
  const [task,      setTask]      = useState('')
  const [soundOn,   setSoundOn]   = useState(true)

  const intervalRef  = useRef(null)
  const soundOnRef   = useRef(soundOn)
  const sessionsRef  = useRef(sessions)

  // Keep refs in sync
  useEffect(() => { soundOnRef.current  = soundOn  }, [soundOn])
  useEffect(() => { sessionsRef.current = sessions }, [sessions])

  /* Apply CSS colour variable when mode changes */
  useEffect(() => {
    document.documentElement.style.setProperty('--active-color', MODES[mode].color)
  }, [mode])

  /* Update document title */
  useEffect(() => {
    const m = Math.floor(remaining / 60)
    const s = remaining % 60
    document.title = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')} — Pomodoro`
  }, [remaining])

  /* Switch mode cleanly */
  const switchMode = useCallback((newMode) => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setMode(newMode)
    setRemaining(MODES[newMode].secs)
    setTotal(MODES[newMode].secs)
  }, [])

  /* Called when a session finishes */
  const handleComplete = useCallback(() => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    if (soundOnRef.current) chime()

    setSessions(prev => {
      const next = prev + 1
      sessionsRef.current = next
      return next
    })

    // Auto-advance after short pause
    setTimeout(() => {
      const completed = sessionsRef.current
      if (mode === 'pomodoro') {
        switchMode(completed % 4 === 0 ? 'long' : 'short')
      } else {
        switchMode('pomodoro')
      }
    }, 1200)
  }, [mode, switchMode])

  /* Tick */
  const startTimer = useCallback(() => {
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          handleComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [handleComplete])

  const pauseTimer = useCallback(() => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
  }, [])

  const handleToggle = () => {
    if (soundOn) beep(660, 0.08)
    isRunning ? pauseTimer() : startTimer()
  }

  const handleReset = () => {
    if (soundOn) beep(440, 0.08)
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setRemaining(total)
  }

  const handleSkip = () => {
    if (soundOn) beep(550, 0.08)
    const next = mode === 'pomodoro'
      ? (sessions % 4 === 0 ? 'long' : 'short')
      : 'pomodoro'
    switchMode(next)
  }

  const handleModeChange = (newMode) => {
    if (newMode !== mode) {
      if (soundOn) beep(660, 0.08)
      switchMode(newMode)
    }
  }

  // Cleanup on unmount
  useEffect(() => () => clearInterval(intervalRef.current), [])

  /* Session dots (cycles of 4) */
  const filledDots = sessions % 4

  return (
    <div className="app-wrapper">

      {/* Header */}
      <header className="app-header">
        <h1>Pomodoro</h1>
        <p>Stay focused. Rest well.</p>
      </header>

      {/* Mode selector */}
      <ModeButtons currentMode={mode} onModeChange={handleModeChange} />

      {/* Ring timer */}
      <Timer
        mode={mode}
        remaining={remaining}
        total={total}
        isRunning={isRunning}
      />

      {/* Start / Pause / Reset / Skip */}
      <ControlButtons
        isRunning={isRunning}
        onToggle={handleToggle}
        onReset={handleReset}
        onSkip={handleSkip}
      />

      {/* Session counter */}
      <div className="sessions-wrap">
        <span className="sessions-label">Sessions completed</span>
        <div className="session-dots">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className={`session-dot${i < filledDots ? ' filled' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Task input */}
      <div className="task-section">
        <span className="task-label">Current Task</span>
        <input
          className="task-input"
          type="text"
          placeholder="What are you working on?"
          maxLength={60}
          value={task}
          onChange={e => setTask(e.target.value)}
        />
      </div>

      {/* Sound toggle */}
      <label className="sound-row">
        <div
          className={`toggle-track${soundOn ? ' on' : ''}`}
          onClick={() => setSoundOn(v => !v)}
        />
        Sound notifications
      </label>

      {/* Footer */}
      <footer className="app-footer">© 2025 Pomodoro Timer</footer>

    </div>
  )
}

export default App

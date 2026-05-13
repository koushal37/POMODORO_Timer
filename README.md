# 🍅 Pomodoro Timer

A clean, minimal Pomodoro Timer built with **React** and **Vite**.

Stay focused. Rest well.

---

## Features

- **Pomodoro** — 25 minute focus sessions
- **Short Break** — 5 minute breaks
- **Long Break** — 15 minute breaks
- Animated SVG ring progress indicator
- Session counter (tracks up to 4 sessions)
- Task input to label what you're working on
- Sound notifications with toggle
- Auto-switches mode when a session ends

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/SONALI-2027/Pomodoro-timer-.git

# Navigate into the project
cd Pomodoro-timer-

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder.

---

## Project Structure

```
Pomodoro-timer-/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ControlButtons.jsx
│   │   ├── ModeButtons.jsx
│   │   └── Timer.jsx
│   ├── app.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)

---

## License

MIT

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

# Tic-Tac-Toe — React HQ Intern Edition

A clean, fully-functional Tic-Tac-Toe built with React, `useReducer`, and
Context — no external state library needed.

## What's implemented

**Core game (40 marks)**
- 3x3 board, X/O alternate, filled cells can't be overwritten
- Win detection (row/column/diagonal) and draw detection
- Status text: `Next Player: X`, `Winner: O`, `Draw!`
- Centered, evenly-spaced board with hover states, responsive layout
  (sidebar stacks under the board on narrow screens)

**Manual feature — Scoreboard (15 marks)**
- Tracks X wins / O wins / draws across rounds
- Survives "Restart Board" (only "Reset scores" clears it)
- `src/components/Scoreboard.jsx`

**State management — Context + useReducer (20 marks)**
- `src/reducer/gameReducer.js` — one reducer, four named actions
  (`MAKE_MOVE`, `JUMP_TO_MOVE`, `RESET_GAME`, `RESET_SCORES`), no logic
  duplicated between them
- `src/context/GameContext.jsx` — wraps the reducer, exposes a single
  `useGame()` hook; every component reads state through that hook and
  stays "dumb" (no game rules inside JSX components)
- `src/utils/gameLogic.js` — pure win/draw calculation, framework-free

**Advanced feature — Move History + Time Travel (15 marks)**
- Every board state is kept in `history`; `stepNumber` just points at
  which one is being displayed
- Click any past move in the sidebar to jump back to that board
- Making a new move from a "rewound" state truncates the future moves,
  the same way browser history works
- `src/components/MoveHistory.jsx`

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL. To build for production:

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

## Deploy (10 marks)

### Option A — Vercel
1. Push this folder to a new GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset: **Vite** (auto-detected). Build command
   `npm run build`, output directory `dist` (Vercel fills these in for
   you).
4. Deploy. Copy the live URL for your submission.

### Option B — Netlify
1. Push this folder to a new GitHub repo.
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site →
   Import an existing project**.
3. Build command: `npm run build`. Publish directory: `dist`.
4. Deploy. Copy the live URL for your submission.

Either way, submit **both**:
- ✅ Live link
- ✅ GitHub repo link

## Loom video checklist (10 marks — no video = 0)

Keep it under 4 minutes, face visible in the corner. Suggested order:
1. **Gameplay demo** — play a full game to a win, then restart and play
   one out to a draw.
2. **Manual feature** — point at the scoreboard updating live; open
   `Scoreboard.jsx` for 5 seconds so it's clear it's real code.
3. **State management tour** — open `gameReducer.js` and
   `GameContext.jsx`; say out loud "one reducer, these four actions,
   components only ever call `useGame()`."
4. **Advanced feature** — click back through Move History and jump to
   an earlier move to show the time travel working.

> The assignment's own "pro tip" about the reducer breaking on camera
> is a joke — this reducer is a pure function with a guard clause on
> every branch, so there's nothing to refactor mid-recording. Still,
> if you extend it and something breaks live, just say what you'd fix
> and move on; it's a Loom, not a defense.

## Project structure

```
src/
  components/    Board, Square, Status, Scoreboard, MoveHistory, Controls
  context/       GameContext.jsx  (Provider + useGame hook)
  reducer/       gameReducer.js   (actions + reducer)
  utils/         gameLogic.js     (pure win/draw checks)
  App.jsx
  main.jsx
  index.css
```

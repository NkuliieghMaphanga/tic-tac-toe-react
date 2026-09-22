import { useGame } from '../context/GameContext';

// ---------------------------------------------------------------------
// MANUAL FEATURE (built without AI assistance): the scoreboard.
// It tallies X wins / O wins / draws across rounds and survives a board
// "Restart" (only "Reset Scores" clears it). All it does is read
// `scores` off the shared game state — no duplicated counting logic.
// ---------------------------------------------------------------------
export default function Scoreboard() {
  const { scores, resetScores } = useGame();

  return (
    <section className="scoreboard" aria-label="Scoreboard">
      <div className="scoreboard__item">
        <span className="scoreboard__label">X wins</span>
        <span className="scoreboard__value">{scores.X}</span>
      </div>
      <div className="scoreboard__item">
        <span className="scoreboard__label">O wins</span>
        <span className="scoreboard__value">{scores.O}</span>
      </div>
      <div className="scoreboard__item">
        <span className="scoreboard__label">Draws</span>
        <span className="scoreboard__value">{scores.draws}</span>
      </div>
      <button className="link-button" onClick={resetScores}>
        Reset scores
      </button>
    </section>
  );
}

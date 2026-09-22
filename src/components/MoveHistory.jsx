import { useGame } from '../context/GameContext';

function describeMove(entry, index) {
  if (index === 0) return 'Game start';
  const col = (entry.lastIndex % 3) + 1;
  const row = Math.floor(entry.lastIndex / 3) + 1;
  return `${entry.lastPlayer} → row ${row}, col ${col}`;
}

// -----------------------------------------------------------------
// ADVANCED FEATURE: Move History + Time Travel.
// Every past board is already sitting in `history` (the reducer never
// throws old states away, it just moves `stepNumber`), so "jumping
// back" is a single dispatch — no extra state duplication needed.
// -----------------------------------------------------------------
export default function MoveHistory() {
  const { history, stepNumber, jumpToMove } = useGame();

  return (
    <section className="move-history" aria-label="Move history">
      <h2 className="move-history__title">Move History</h2>
      <ol className="move-history__list">
        {history.map((entry, index) => (
          <li key={index}>
            <button
              className={`move-history__button${index === stepNumber ? ' move-history__button--active' : ''}`}
              onClick={() => jumpToMove(index)}
            >
              {describeMove(entry, index)}
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}

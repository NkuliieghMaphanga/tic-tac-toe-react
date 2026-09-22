import { useGame } from '../context/GameContext';

export default function Status() {
  const { winner, isDraw, currentPlayer } = useGame();

  let message = `Next Player: ${currentPlayer}`;
  let tone = 'status--playing';

  if (winner) {
    message = `Winner: ${winner}`;
    tone = 'status--winner';
  } else if (isDraw) {
    message = 'Draw!';
    tone = 'status--draw';
  }

  return (
    <p className={`status ${tone}`} role="status" aria-live="polite">
      {message}
    </p>
  );
}

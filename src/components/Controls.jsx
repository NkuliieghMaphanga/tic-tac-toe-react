import { useGame } from '../context/GameContext';

export default function Controls() {
  const { resetGame } = useGame();

  return (
    <div className="controls">
      <button className="button button--primary" onClick={resetGame}>
        Restart Board
      </button>
    </div>
  );
}

import { useGame } from '../context/GameContext';
import Square from './Square';

export default function Board() {
  const { squares, makeMove, winningLine, isGameOver } = useGame();

  return (
    <div className="board" role="grid" aria-label="Tic-tac-toe board">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => makeMove(index)}
          isWinning={winningLine?.includes(index) ?? false}
          disabled={isGameOver}
        />
      ))}
    </div>
  );
}

// Pure, framework-free game logic. Nothing in here touches React state,
// so it's trivially testable and reusable (e.g. by the "computer" AI later).

export const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Returns { winner: 'X' | 'O', line: [a,b,c] } if there's a winner,
 * otherwise null.
 */
export function calculateWinner(squares) {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return null;
}

export function isBoardFull(squares) {
  return squares.every((square) => square !== null);
}

export function isDraw(squares) {
  return !calculateWinner(squares) && isBoardFull(squares);
}

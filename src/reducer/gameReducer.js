import { calculateWinner, isDraw } from '../utils/gameLogic';

// --- Action types -----------------------------------------------------
// Centralised so components never type raw strings (typo-proofing + easy
// to grep for every place a given action is dispatched).
export const ACTIONS = {
  MAKE_MOVE: 'MAKE_MOVE',
  JUMP_TO_MOVE: 'JUMP_TO_MOVE',
  RESET_GAME: 'RESET_GAME',
  RESET_SCORES: 'RESET_SCORES',
};

const EMPTY_BOARD = Array(9).fill(null);

export const initialState = {
  // history[0] is the empty board, history[n] is the board after move n.
  history: [{ squares: EMPTY_BOARD, lastPlayer: null, lastIndex: null }],
  // Which entry of `history` is currently being displayed. Lets "undo"
  // and "time travel" share one mechanism: stepping stepNumber back
  // just *views* an old board without deleting anything, until a new
  // move is made from it (which truncates the future, same as a browser
  // history stack).
  stepNumber: 0,
  xIsNext: true,
  scores: { X: 0, O: 0, draws: 0 },
};

export function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_MOVE: {
      const { index } = action.payload;
      const currentSquares = state.history[state.stepNumber].squares;
      const alreadyDecided = calculateWinner(currentSquares) || isDraw(currentSquares);

      // Guard clauses: ignore clicks on a filled square or after the
      // game is already over. No duplicated validation elsewhere.
      if (alreadyDecided || currentSquares[index]) {
        return state;
      }

      const player = state.xIsNext ? 'X' : 'O';
      const nextSquares = currentSquares.slice();
      nextSquares[index] = player;

      // Making a move from a "rewound" state discards any future
      // moves that existed beyond this point (standard time-travel UX).
      const historyUpToNow = state.history.slice(0, state.stepNumber + 1);
      const nextHistory = [
        ...historyUpToNow,
        { squares: nextSquares, lastPlayer: player, lastIndex: index },
      ];

      const result = calculateWinner(nextSquares);
      const nextScores = { ...state.scores };
      if (result) {
        nextScores[result.winner] += 1;
      } else if (isDraw(nextSquares)) {
        nextScores.draws += 1;
      }

      return {
        ...state,
        history: nextHistory,
        stepNumber: nextHistory.length - 1,
        xIsNext: !state.xIsNext,
        scores: nextScores,
      };
    }

    case ACTIONS.JUMP_TO_MOVE: {
      const { step } = action.payload;
      if (step < 0 || step > state.history.length - 1) return state;
      return {
        ...state,
        stepNumber: step,
        xIsNext: step % 2 === 0,
      };
    }

    case ACTIONS.RESET_GAME: {
      // Keep the scoreboard — a restart should clear the *board*,
      // not the running tally the player has earned.
      return {
        ...state,
        history: initialState.history,
        stepNumber: 0,
        xIsNext: true,
      };
    }

    case ACTIONS.RESET_SCORES: {
      return { ...state, scores: { X: 0, O: 0, draws: 0 } };
    }

    default:
      return state;
  }
}

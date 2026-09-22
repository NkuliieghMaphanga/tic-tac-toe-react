import { createContext, useContext, useReducer, useMemo } from 'react';
import { gameReducer, initialState, ACTIONS } from '../reducer/gameReducer';
import { calculateWinner, isDraw } from '../utils/gameLogic';

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Derived data lives here, computed once per render, so components
  // stay "dumb" — they read values, they don't recompute game rules.
  const value = useMemo(() => {
    const current = state.history[state.stepNumber];
    const winnerResult = calculateWinner(current.squares);
    const draw = isDraw(current.squares);

    return {
      squares: current.squares,
      history: state.history,
      stepNumber: state.stepNumber,
      xIsNext: state.xIsNext,
      currentPlayer: state.xIsNext ? 'X' : 'O',
      winner: winnerResult?.winner ?? null,
      winningLine: winnerResult?.line ?? null,
      isDraw: draw,
      isGameOver: Boolean(winnerResult) || draw,
      scores: state.scores,
      makeMove: (index) => dispatch({ type: ACTIONS.MAKE_MOVE, payload: { index } }),
      jumpToMove: (step) => dispatch({ type: ACTIONS.JUMP_TO_MOVE, payload: { step } }),
      resetGame: () => dispatch({ type: ACTIONS.RESET_GAME }),
      resetScores: () => dispatch({ type: ACTIONS.RESET_SCORES }),
    };
  }, [state]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

// Custom hook — this is the only way components should touch game state.
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

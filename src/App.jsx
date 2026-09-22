import { GameProvider } from './context/GameContext';
import Board from './components/Board';
import Status from './components/Status';
import Scoreboard from './components/Scoreboard';
import MoveHistory from './components/MoveHistory';
import Controls from './components/Controls';

export default function App() {
  return (
    <GameProvider>
      <div className="page">
        <header className="page__header">
          <p className="page__eyebrow">React HQ — Junior Frontend Intern Project</p>
          <h1 className="page__title">Tic&nbsp;·&nbsp;Tac&nbsp;·&nbsp;Toe</h1>
        </header>

        <main className="layout">
          <div className="layout__game">
            <Status />
            <Board />
            <Controls />
          </div>

          <aside className="layout__sidebar">
            <Scoreboard />
            <MoveHistory />
          </aside>
        </main>
      </div>
    </GameProvider>
  );
}

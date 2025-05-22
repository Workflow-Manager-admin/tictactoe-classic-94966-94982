import React from 'react';
import './App.css';
import TicTacToe from './components/TicTacToe/TicTacToe';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="content-section">
            <div className="subtitle">Classic Game</div>
            <h1 className="title">Tic Tac Toe</h1>
            <div className="description">
              An enhanced version of the classic strategy game with customizable board sizes (3x3, 4x4, 5x5),
              AI opponent with multiple difficulty levels, local multiplayer, and visual analytics to track your performance.
            </div>
            <TicTacToe />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
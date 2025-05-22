import React from 'react';
import './GameInfo.css';

// PUBLIC_INTERFACE
/**
 * GameInfo component displays the current game status and provides control buttons.
 * 
 * @param {object} props - Component properties
 * @param {string} props.status - Current game status message
 * @param {function} props.onRestart - Function to call when restart button is clicked
 * @param {function} props.onToggleSettings - Function to toggle game settings visibility
 * @param {function} props.onToggleAnalytics - Function to toggle analytics visibility
 * @param {string} props.currentPlayer - Current player ('X' or 'O')
 * @param {boolean} props.isGameOver - Whether the game is over
 * @param {string} props.gameMode - Current game mode ('human-vs-human' or 'human-vs-ai')
 * @param {string} [props.aiDifficulty] - AI difficulty level (when in AI mode)
 * @returns {JSX.Element} - Rendered GameInfo component
 */
const GameInfo = ({ 
  status, 
  onRestart, 
  onToggleSettings, 
  onToggleAnalytics, 
  currentPlayer, 
  isGameOver,
  gameMode,
  aiDifficulty
}) => {
  // Determine status class based on current player and game state
  const statusClass = isGameOver 
    ? `game-status status-win` 
    : `game-status status-${currentPlayer.toLowerCase()}`;
  
  return (
    <div className="game-info">
      {/* Game mode indicator */}
      <div className="game-mode-indicator">
        {gameMode === 'human-vs-human' ? (
          <>
            <span className="player-icon">👤</span> vs <span className="player-icon">👤</span>
          </>
        ) : (
          <>
            <span className="player-icon">👤</span> vs <span className="player-icon">🤖</span>
            {aiDifficulty && <span>({aiDifficulty})</span>}
          </>
        )}
      </div>
      
      {/* Game status */}
      <div className={statusClass}>{status}</div>
      
      {/* Control buttons */}
      <div className="btn-group">
        <button className="btn btn-restart" onClick={onRestart}>
          Restart Game
        </button>
        <button className="btn btn-secondary" onClick={onToggleSettings}>
          Settings
        </button>
        <button className="btn btn-secondary" onClick={onToggleAnalytics}>
          Analytics
        </button>
      </div>
    </div>
  );
};

export default GameInfo;

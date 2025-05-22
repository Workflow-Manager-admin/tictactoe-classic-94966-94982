import React from 'react';
import './GameInfo.css';

// PUBLIC_INTERFACE
/**
 * GameInfo component displays the current game status and provides a reset button.
 * 
 * @param {object} props - Component properties
 * @param {string} props.status - Current game status message
 * @param {function} props.onRestart - Function to call when reset button is clicked
 * @returns {JSX.Element} - Rendered GameInfo component
 */
const GameInfo = ({ status, onRestart }) => {
  return (
    <div className="game-info">
      <div className="game-status">{status}</div>
      <button className="btn btn-restart" onClick={onRestart}>
        Restart Game
      </button>
    </div>
  );
};

export default GameInfo;

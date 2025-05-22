import React, { useState } from 'react';
import './GameSettings.css';

// PUBLIC_INTERFACE
/**
 * GameSettings component allows players to configure game options.
 * 
 * @param {object} props - Component properties
 * @param {function} props.onApplySettings - Function to call when settings are applied
 * @param {object} props.currentSettings - Current game settings
 * @param {boolean} [props.showApplyButton=true] - Whether to show the apply button
 * @returns {JSX.Element} - Rendered GameSettings component
 */
const GameSettings = ({ onApplySettings, currentSettings, showApplyButton = true }) => {
  const [settings, setSettings] = useState({
    boardSize: currentSettings.boardSize || 3,
    gameMode: currentSettings.gameMode || 'human-vs-human',
    aiDifficulty: currentSettings.aiDifficulty || 'medium',
    playerMarker: currentSettings.playerMarker || 'X',
  });
  
  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  const handleApplySettings = () => {
    onApplySettings(settings);
  };
  
  return (
    <div className="game-settings">
      <div className="settings-title">Game Settings</div>
      
      <div className="setting-group">
        <div className="setting-label">Board Size</div>
        <div className="setting-options">
          {[3, 4, 5].map(size => (
            <button
              key={size}
              className={`option-button ${settings.boardSize === size ? 'active' : ''}`}
              onClick={() => handleSettingChange('boardSize', size)}
              aria-label={`${size}x${size} board`}
            >
              {size}x{size}
            </button>
          ))}
        </div>
      </div>
      
      <div className="setting-group mode-group">
        <div className="setting-label">Game Mode</div>
        <div className="setting-options mode-options">
          <button
            className={`option-button mode-button ${settings.gameMode === 'human-vs-ai' ? 'active' : ''}`}
            onClick={() => handleSettingChange('gameMode', 'human-vs-ai')}
          >
            <div className="player-option">
              <span className="player-icon">👤</span> vs <span className="player-icon">🤖</span>
              <span className="mode-label">Play vs AI</span>
            </div>
          </button>
          <button
            className={`option-button mode-button ${settings.gameMode === 'human-vs-human' ? 'active' : ''}`}
            onClick={() => handleSettingChange('gameMode', 'human-vs-human')}
          >
            <div className="player-option">
              <span className="player-icon">👤</span> vs <span className="player-icon">👤</span>
              <span className="mode-label">Two Players</span>
            </div>
          </button>
        </div>
      </div>
      
      {settings.gameMode === 'human-vs-ai' && (
        <>
          <div className="setting-group">
            <div className="setting-label">AI Difficulty</div>
            <div className="setting-options">
              {['easy', 'medium', 'hard'].map(level => (
                <button
                  key={level}
                  className={`option-button ${settings.aiDifficulty === level ? 'active' : ''}`}
                  onClick={() => handleSettingChange('aiDifficulty', level)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="setting-group">
            <div className="setting-label">Play as</div>
            <div className="setting-options">
              <button
                className={`option-button ${settings.playerMarker === 'X' ? 'active' : ''}`}
                onClick={() => handleSettingChange('playerMarker', 'X')}
              >
                X
              </button>
              <button
                className={`option-button ${settings.playerMarker === 'O' ? 'active' : ''}`}
                onClick={() => handleSettingChange('playerMarker', 'O')}
              >
                O
              </button>
            </div>
          </div>
        </>
      )}
      
      {showApplyButton && (
        <button className="apply-button" onClick={handleApplySettings}>
          Apply Settings
        </button>
      )}
    </div>
  );
};

export default GameSettings;

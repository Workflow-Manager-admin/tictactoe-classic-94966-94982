import React, { useState, useCallback, useEffect, useRef } from 'react';
import Board from '../Board/Board';
import GameInfo from '../GameInfo/GameInfo';
import GameSettings from '../GameSettings/GameSettings';
import Analytics from '../Analytics/Analytics';
import { calculateWinner, isBoardFull, createEmptyBoard } from '../../utils/gameUtils';
import { makeAiMove } from '../../utils/aiPlayer';
import './TicTacToe.css';

// PUBLIC_INTERFACE
/**
 * TicTacToe component is the main container for the TicTacToe game.
 * It manages game state, logic, settings, and analytics.
 * 
 * @returns {JSX.Element} - Rendered TicTacToe component
 */
const TicTacToe = () => {
  // Game settings state
  const [settings, setSettings] = useState({
    boardSize: 3,
    gameMode: 'human-vs-human',
    aiDifficulty: 'medium',
    playerMarker: 'X'
  });
  
  // Game state
  const [board, setBoard] = useState(() => createEmptyBoard(settings.boardSize));
  const [isXNext, setIsXNext] = useState(true);
  const [gameHistory, setGameHistory] = useState([]);
  const [moveHistory, setMoveHistory] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  
  // Store AI timeout reference for cleanup
  const aiTimeoutRef = useRef(null);
  
  // Derived state
  const { boardSize, gameMode, aiDifficulty, playerMarker } = settings;
  const aiMarker = playerMarker === 'X' ? 'O' : 'X'; 
  const isAiTurn = gameMode === 'human-vs-ai' && 
    ((playerMarker === 'X' && !isXNext) || (playerMarker === 'O' && isXNext));
  
  // Get current player marker
  const currentPlayerMarker = isXNext ? 'X' : 'O';
  
  // Get game result (winner or draw)
  const winnerInfo = calculateWinner(board, boardSize);
  const isDraw = !winnerInfo && isBoardFull(board);
  const isGameOver = !!winnerInfo || isDraw;
  
  // Calculate win statistics
  const gameStats = {
    wins: [
      gameHistory.filter(result => result === 'X').length,
      gameHistory.filter(result => result === 'O').length,
      gameHistory.filter(result => result === 'draw').length
    ],
    moveHistory
  };
  
  /**
   * Apply new game settings and reset the board
   */
  const handleApplySettings = useCallback((newSettings) => {
    setSettings(newSettings);
    setBoard(createEmptyBoard(newSettings.boardSize));
    setIsXNext(true);
    setShowSettings(false);
  }, []);
  
  /**
   * Toggle settings visibility
   */
  const toggleSettings = useCallback(() => {
    setShowSettings(prev => !prev);
    if (showAnalytics) setShowAnalytics(false);
  }, [showAnalytics]);
  
  /**
   * Toggle analytics visibility
   */
  const toggleAnalytics = useCallback(() => {
    setShowAnalytics(prev => !prev);
    if (showSettings) setShowSettings(false);
  }, [showSettings]);
  
  /**
   * Toggle heatmap visualization
   */
  const toggleHeatmap = useCallback(() => {
    setShowHeatmap(prev => !prev);
  }, []);
  
  /**
   * Handle player move (human or AI)
   */
  const handleClick = useCallback((index) => {
    // If cell already filled, game over, or AI's turn, do nothing
    if (board[index] || isGameOver || isAiTurn) {
      return;
    }
    
    // Create a copy of the board
    const squares = [...board];
    
    // Set the value of the clicked cell
    squares[index] = currentPlayerMarker;
    
    // Update move history
    setMoveHistory(prev => [
      ...prev, 
      { player: currentPlayerMarker, position: index }
    ]);
    
    // Update state with new board and next player
    setBoard(squares);
    setIsXNext(!isXNext);
  }, [board, isXNext, isGameOver, isAiTurn, currentPlayerMarker]);
  
  /**
   * Reset game to initial state with current settings
   */
  const handleRestart = useCallback(() => {
    setBoard(createEmptyBoard(boardSize));
    setIsXNext(true);
    // Don't clear game history or move history when restarting
  }, [boardSize]);
  
  /**
   * Update game history when game ends
   */
  useEffect(() => {
    if (isGameOver) {
      let result;
      if (winnerInfo) {
        result = winnerInfo.winner;
      } else if (isDraw) {
        result = 'draw';
      }
      
      if (result) {
        setGameHistory(prev => [...prev, result]);
      }
    }
  }, [isGameOver, winnerInfo, isDraw]);
  
  /**
   * Handle AI moves
   */
  useEffect(() => {
    if (isAiTurn && !isGameOver) {
      // Clear any existing timeout
      if (aiTimeoutRef.current) {
        clearTimeout(aiTimeoutRef.current);
      }
      
      // Add small delay to make AI move seem more natural
      aiTimeoutRef.current = setTimeout(() => {
        const aiMoveIndex = makeAiMove(
          [...board], // Pass a copy to avoid direct mutation
          boardSize,
          aiDifficulty,
          aiMarker
        );
        
        // Apply AI move if valid
        if (aiMoveIndex !== undefined && board[aiMoveIndex] === null) {
          const newBoard = [...board];
          newBoard[aiMoveIndex] = aiMarker;
          
          // Update move history
          setMoveHistory(prev => [
            ...prev, 
            { player: aiMarker, position: aiMoveIndex }
          ]);
          
          // Update board and next player
          setBoard(newBoard);
          setIsXNext(!isXNext);
        }
      }, 600); // 600ms delay for AI move
    }
    
    // Clean up on unmount or before next effect run
    return () => {
      if (aiTimeoutRef.current) {
        clearTimeout(aiTimeoutRef.current);
      }
    };
  }, [board, isXNext, isAiTurn, isGameOver, aiDifficulty, aiMarker, boardSize]);
  
  // Determine current game status text
  let status;
  
  if (winnerInfo) {
    status = `Winner: ${winnerInfo.winner}`;
  } else if (isDraw) {
    status = "Game ended in a draw!";
  } else {
    status = `Current player: ${currentPlayerMarker}`;
    
    // Add AI thinking indicator
    if (isAiTurn) {
      status = "AI is thinking...";
    }
  }
  
  return (
    <div className="tictactoe">
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="game-subtitle">Enhanced with multiple board sizes, AI, and analytics</div>
      
      {/* Game settings (collapsible) */}
      <div className={`settings-container ${showSettings ? '' : 'settings-closed'}`}>
        {showSettings && (
          <GameSettings 
            onApplySettings={handleApplySettings} 
            currentSettings={settings} 
          />
        )}
      </div>
      
      {/* Game board */}
      <div className="game-board-container">
        <Board 
          squares={board} 
          onClick={handleClick} 
          size={boardSize} 
          winningLine={winnerInfo?.line || []} 
          heatmap={showHeatmap ? gameStats.moveHistory.reduce((map, move) => {
            map[move.position] = (map[move.position] || 0) + 1;
            return map;
          }, {}) : {}}
        />
      </div>
      
      {/* Game info and controls */}
      <GameInfo 
        status={status}
        onRestart={handleRestart}
        onToggleSettings={toggleSettings}
        onToggleAnalytics={toggleAnalytics}
        currentPlayer={currentPlayerMarker}
        isGameOver={isGameOver}
        gameMode={gameMode}
        aiDifficulty={gameMode === 'human-vs-ai' ? aiDifficulty : null}
      />
      
      {/* Analytics section (collapsible) */}
      <div className={`analytics-container ${showAnalytics ? '' : 'analytics-closed'}`}>
        {showAnalytics && (
          <>
            <Analytics 
              stats={gameStats} 
              boardSize={boardSize}
              showHeatmap={showHeatmap} 
            />
            <div className="toggle-analytics" onClick={toggleHeatmap}>
              {showHeatmap ? 'Hide Move Heatmap' : 'Show Move Heatmap'}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;

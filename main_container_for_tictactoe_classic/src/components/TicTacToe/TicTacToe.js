import React, { useState, useCallback } from 'react';
import Board from '../Board/Board';
import GameInfo from '../GameInfo/GameInfo';
import './TicTacToe.css';

// PUBLIC_INTERFACE
/**
 * TicTacToe component is the main container for the TicTacToe game.
 * It manages game state and logic.
 * 
 * @returns {JSX.Element} - Rendered TicTacToe component
 */
const TicTacToe = () => {
  // Initialize state for board, current player, and game status
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  
  /**
   * Calculate the winner based on the current board state
   * 
   * @param {Array} squares - Current board state
   * @returns {string|null} - 'X', 'O', or null if no winner
   */
  const calculateWinner = useCallback((squares) => {
    // Define all possible winning combinations
    const winLines = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal top-left to bottom-right
      [2, 4, 6]  // diagonal top-right to bottom-left
    ];
    
    // Check each winning combination
    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    
    return null;
  }, []);
  
  // Check if the board is full (draw)
  const isBoardFull = useCallback((squares) => {
    return squares.every(square => square !== null);
  }, []);
  
  // Handle click on a cell
  const handleClick = useCallback((i) => {
    // If cell already filled or game won, do nothing
    if (board[i] || calculateWinner(board)) {
      return;
    }
    
    // Create a copy of the board
    const squares = [...board];
    
    // Set the value of the clicked cell
    squares[i] = isXNext ? 'X' : 'O';
    
    // Update state with new board and next player
    setBoard(squares);
    setIsXNext(!isXNext);
  }, [board, isXNext, calculateWinner]);
  
  // Reset game to initial state
  const handleRestart = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }, []);
  
  // Determine current game status
  const winner = calculateWinner(board);
  let status;
  
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isBoardFull(board)) {
    status = "Game ended in a draw!";
  } else {
    status = `Current player: ${isXNext ? 'X' : 'O'}`;
  }
  
  return (
    <div className="tictactoe">
      <h1 className="game-title">Tic Tac Toe</h1>
      <Board squares={board} onClick={handleClick} />
      <GameInfo 
        status={status}
        onRestart={handleRestart}
      />
    </div>
  );
};

export default TicTacToe;

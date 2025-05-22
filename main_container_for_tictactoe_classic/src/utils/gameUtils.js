/**
 * Game utility functions for TicTacToe with support for different board sizes
 */

/**
 * Calculate winner for a board of any size
 * 
 * @param {Array} squares - Current board state
 * @param {number} size - Board size (e.g., 3 for 3x3, 4 for 4x4)
 * @returns {Object|null} - Winner info or null if no winner
 */
export const calculateWinner = (squares, size) => {
  // No need to calculate if board is empty
  if (!squares || squares.every(square => square === null)) {
    return null;
  }

  // Generate winning lines dynamically based on board size
  const winLines = [];
  
  // Rows
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(i * size + j);
    }
    winLines.push(row);
  }
  
  // Columns
  for (let i = 0; i < size; i++) {
    const col = [];
    for (let j = 0; j < size; j++) {
      col.push(j * size + i);
    }
    winLines.push(col);
  }
  
  // Diagonal top-left to bottom-right
  const diag1 = [];
  for (let i = 0; i < size; i++) {
    diag1.push(i * size + i);
  }
  winLines.push(diag1);
  
  // Diagonal top-right to bottom-left
  const diag2 = [];
  for (let i = 0; i < size; i++) {
    diag2.push(i * size + (size - 1 - i));
  }
  winLines.push(diag2);

  // Check each winning line
  for (let i = 0; i < winLines.length; i++) {
    const line = winLines[i];
    const first = squares[line[0]];
    
    if (!first) continue;
    
    let isWinningLine = true;
    for (let j = 1; j < line.length; j++) {
      if (squares[line[j]] !== first) {
        isWinningLine = false;
        break;
      }
    }
    
    if (isWinningLine) {
      return { 
        winner: first,
        line: line // Return the winning line for highlighting
      };
    }
  }
  
  return null;
};

/**
 * Check if the board is full (draw)
 * 
 * @param {Array} squares - Current board state
 * @returns {boolean} - True if board is full
 */
export const isBoardFull = (squares) => {
  return squares.every(square => square !== null);
};

/**
 * Create an empty board of given size
 * 
 * @param {number} size - Board size
 * @returns {Array} - Empty board
 */
export const createEmptyBoard = (size) => {
  return Array(size * size).fill(null);
};

/**
 * Convert position from 2D to 1D array index
 * 
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @param {number} size - Board size
 * @returns {number} - 1D array index
 */
export const getIndex = (row, col, size) => {
  return row * size + col;
};

/**
 * Convert 1D array index to 2D position
 * 
 * @param {number} index - 1D array index
 * @param {number} size - Board size
 * @returns {Object} - {row, col}
 */
export const getPosition = (index, size) => {
  return {
    row: Math.floor(index / size),
    col: index % size
  };
};

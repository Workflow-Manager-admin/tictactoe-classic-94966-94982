import { calculateWinner, isBoardFull, getPosition } from './gameUtils';

/**
 * AI Player implementation with multiple difficulty levels
 */

/**
 * Make a move for AI based on difficulty level
 * 
 * @param {Array} board - Current board state
 * @param {number} size - Board size
 * @param {string} difficulty - AI difficulty level ('easy', 'medium', 'hard')
 * @param {string} aiMarker - AI player's marker ('X' or 'O')
 * @returns {number} - Index for the AI's move
 */
export const makeAiMove = (board, size, difficulty, aiMarker) => {
  const humanMarker = aiMarker === 'X' ? 'O' : 'X';
  
  switch (difficulty) {
    case 'hard':
      return makeHardMove(board, size, aiMarker, humanMarker);
    case 'medium':
      return makeMediumMove(board, size, aiMarker, humanMarker);
    case 'easy':
    default:
      return makeEasyMove(board);
  }
};

/**
 * Easy AI: Makes random valid moves
 * 
 * @param {Array} board - Current board state
 * @returns {number} - Index for the AI's move
 */
const makeEasyMove = (board) => {
  // Find all empty cells
  const emptyCells = board
    .map((cell, index) => cell === null ? index : null)
    .filter(index => index !== null);
  
  // Choose a random empty cell
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};

/**
 * Medium AI: Mostly random but will win when possible and block immediate threats
 * 
 * @param {Array} board - Current board state
 * @param {number} size - Board size
 * @param {string} aiMarker - AI player's marker
 * @param {string} humanMarker - Human player's marker
 * @returns {number} - Index for the AI's move
 */
const makeMediumMove = (board, size, aiMarker, humanMarker) => {
  // Check if AI can win in next move
  const winMove = findWinningMove(board, size, aiMarker);
  if (winMove !== -1) return winMove;
  
  // Check if human can win in next move and block it
  const blockMove = findWinningMove(board, size, humanMarker);
  if (blockMove !== -1) return blockMove;
  
  // If center is empty, take it (for odd-sized boards)
  if (size % 2 === 1) {
    const centerIndex = Math.floor(board.length / 2);
    if (board[centerIndex] === null) {
      return centerIndex;
    }
  }
  
  // Otherwise, make a random move
  return makeEasyMove(board);
};

/**
 * Hard AI: Uses minimax algorithm to make optimal moves
 * 
 * @param {Array} board - Current board state
 * @param {number} size - Board size
 * @param {string} aiMarker - AI player's marker
 * @param {string} humanMarker - Human player's marker
 * @returns {number} - Index for the AI's move
 */
const makeHardMove = (board, size, aiMarker, humanMarker) => {
  // For larger boards (>3x3), use a depth limit to avoid excessive calculation
  const isLargeBoard = size > 3;
  const depthLimit = isLargeBoard ? 4 : 9;
  
  // Check if AI can win in next move (optimization)
  const winMove = findWinningMove(board, size, aiMarker);
  if (winMove !== -1) return winMove;
  
  // Check if human can win in next move (optimization)
  const blockMove = findWinningMove(board, size, humanMarker);
  if (blockMove !== -1) return blockMove;
  
  // For larger boards, if no immediate win/block, capture center if available
  if (isLargeBoard) {
    const centerIndex = Math.floor(board.length / 2);
    if (board[centerIndex] === null) {
      return centerIndex;
    }
  }
  
  let bestScore = -Infinity;
  let bestMove = -1;
  
  // Try each empty cell
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      // Make hypothetical move
      board[i] = aiMarker;
      
      // Calculate score based on minimax
      const score = minimax(board, size, 0, depthLimit, false, aiMarker, humanMarker, -Infinity, Infinity);
      
      // Undo the move
      board[i] = null;
      
      // Update best move if better score found
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  
  return bestMove;
};

/**
 * Find a winning move for the specified player
 * 
 * @param {Array} board - Current board state
 * @param {number} size - Board size
 * @param {string} player - Player marker to check for
 * @returns {number} - Winning move index or -1 if none exists
 */
const findWinningMove = (board, size, player) => {
  // Try each empty cell
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      // Make hypothetical move
      board[i] = player;
      
      // Check if this move would win
      const result = calculateWinner(board, size);
      
      // Undo the move
      board[i] = null;
      
      if (result && result.winner === player) {
        return i;
      }
    }
  }
  
  return -1;
};

/**
 * Minimax algorithm with alpha-beta pruning for optimal decision making
 */
const minimax = (board, size, depth, maxDepth, isMaximizing, aiMarker, humanMarker, alpha, beta) => {
  // Check for terminal states
  const result = calculateWinner(board, size);
  
  if (result) {
    return result.winner === aiMarker ? 10 - depth : depth - 10;
  }
  
  if (isBoardFull(board) || depth >= maxDepth) {
    return 0;
  }
  
  if (isMaximizing) {
    // AI's turn (maximizing)
    let bestScore = -Infinity;
    
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = aiMarker;
        const score = minimax(board, size, depth + 1, maxDepth, false, aiMarker, humanMarker, alpha, beta);
        board[i] = null;
        bestScore = Math.max(bestScore, score);
        
        // Alpha-beta pruning
        alpha = Math.max(alpha, bestScore);
        if (beta <= alpha) break;
      }
    }
    
    return bestScore;
  } else {
    // Human's turn (minimizing)
    let bestScore = Infinity;
    
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = humanMarker;
        const score = minimax(board, size, depth + 1, maxDepth, true, aiMarker, humanMarker, alpha, beta);
        board[i] = null;
        bestScore = Math.min(bestScore, score);
        
        // Alpha-beta pruning
        beta = Math.min(beta, bestScore);
        if (beta <= alpha) break;
      }
    }
    
    return bestScore;
  }
};

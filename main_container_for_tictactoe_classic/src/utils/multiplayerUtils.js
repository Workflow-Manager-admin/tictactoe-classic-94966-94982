/**
 * Multiplayer utility functions for TicTacToe.
 * This file provides the foundation for implementing networked multiplayer
 * functionality in the future.
 */

/**
 * Generate a unique game session ID for multiplayer games.
 * 
 * @returns {string} - Unique game session ID
 */
export const createGameSession = () => {
  const timestamp = new Date().getTime();
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${randomPart}`;
};

/**
 * Format game state for sending over network.
 * 
 * @param {object} gameState - Current game state
 * @returns {object} - Formatted game state for network transmission
 */
export const formatGameStateForNetwork = (gameState) => {
  // In a real implementation, this would prepare data for transmission
  // through WebSockets, Firebase, or other real-time communication
  return {
    board: gameState.board,
    currentPlayer: gameState.isXNext ? 'X' : 'O',
    lastMove: gameState.lastMove,
    gameId: gameState.sessionId,
    timestamp: new Date().toISOString()
  };
};

/**
 * Simulate network latency (for testing purposes).
 * 
 * @param {function} callback - Function to call after delay
 * @param {number} [delay=300] - Delay in milliseconds
 * @returns {number} - Timeout ID
 */
export const simulateNetworkDelay = (callback, delay = 300) => {
  return setTimeout(callback, delay);
};

/**
 * Save game session to localStorage for persistence.
 * 
 * @param {string} sessionId - Game session ID
 * @param {object} gameState - Game state to save
 */
export const saveGameSession = (sessionId, gameState) => {
  try {
    const sessions = JSON.parse(localStorage.getItem('tictactoe_sessions') || '{}');
    sessions[sessionId] = {
      ...gameState,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('tictactoe_sessions', JSON.stringify(sessions));
    return true;
  } catch (error) {
    console.error('Failed to save game session:', error);
    return false;
  }
};

/**
 * Load game session from localStorage.
 * 
 * @param {string} sessionId - Game session ID
 * @returns {object|null} - Game state or null if not found
 */
export const loadGameSession = (sessionId) => {
  try {
    const sessions = JSON.parse(localStorage.getItem('tictactoe_sessions') || '{}');
    return sessions[sessionId] || null;
  } catch (error) {
    console.error('Failed to load game session:', error);
    return null;
  }
};

/**
 * List all saved game sessions.
 * 
 * @returns {Array} - Array of session IDs and basic info
 */
export const listGameSessions = () => {
  try {
    const sessions = JSON.parse(localStorage.getItem('tictactoe_sessions') || '{}');
    return Object.entries(sessions).map(([id, data]) => ({
      id,
      lastUpdated: data.lastUpdated,
      player1: data.player1 || 'Unknown',
      player2: data.player2 || 'Unknown'
    }));
  } catch (error) {
    console.error('Failed to list game sessions:', error);
    return [];
  }
};

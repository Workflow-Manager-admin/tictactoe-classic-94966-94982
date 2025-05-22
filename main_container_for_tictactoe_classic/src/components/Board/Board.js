import React from 'react';
import Cell from '../Cell/Cell';
import './Board.css';

// PUBLIC_INTERFACE
/**
 * Board component renders a grid of cells for the TicTacToe game.
 * 
 * @param {object} props - Component properties
 * @param {Array} props.squares - Array representing the board state
 * @param {function} props.onClick - Function to call when a cell is clicked
 * @param {number} props.size - Size of the board (3 for 3x3, 4 for 4x4, etc.)
 * @param {Array} [props.winningLine] - Array of indices that form the winning line
 * @param {Object} [props.heatmap] - Optional heatmap data for cell coloring
 * @returns {JSX.Element} - Rendered Board component
 */
const Board = ({ squares, onClick, size = 3, winningLine = [], heatmap = {} }) => {
  return (
    <div className={`board board-size-${size}`}>
      {squares.map((value, index) => (
        <Cell 
          key={index} 
          value={value} 
          index={index} 
          onClick={onClick} 
          isWinning={winningLine.includes(index)}
          heatIntensity={heatmap[index] || 0}
        />
      ))}
    </div>
  );
};

export default Board;

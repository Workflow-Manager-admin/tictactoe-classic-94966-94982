import React from 'react';
import Cell from '../Cell/Cell';
import './Board.css';

// PUBLIC_INTERFACE
/**
 * Board component renders a 3x3 grid of cells for the TicTacToe game.
 * 
 * @param {object} props - Component properties
 * @param {Array} props.squares - Array of 9 elements representing the board state
 * @param {function} props.onClick - Function to call when a cell is clicked
 * @returns {JSX.Element} - Rendered Board component
 */
const Board = ({ squares, onClick }) => {
  return (
    <div className="board">
      {squares.map((value, index) => (
        <Cell 
          key={index} 
          value={value} 
          index={index} 
          onClick={onClick} 
        />
      ))}
    </div>
  );
};

export default Board;

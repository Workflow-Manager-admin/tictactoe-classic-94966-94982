import React from 'react';
import './Cell.css';

// PUBLIC_INTERFACE
/**
 * Cell component represents a single cell in the TicTacToe grid.
 * 
 * @param {object} props - Component properties
 * @param {string|null} props.value - The value of the cell ('X', 'O', or null)
 * @param {number} props.index - The index of the cell in the board array
 * @param {function} props.onClick - Function to call when the cell is clicked
 * @returns {JSX.Element} - Rendered Cell component
 */
const Cell = ({ value, index, onClick }) => {
  return (
    <button 
      className={`cell ${value ? 'cell-' + value.toLowerCase() : ''}`}
      onClick={() => onClick(index)}
      disabled={value !== null}
      aria-label={`Cell ${index}, ${value || 'empty'}`}
    >
      {value}
    </button>
  );
};

export default Cell;

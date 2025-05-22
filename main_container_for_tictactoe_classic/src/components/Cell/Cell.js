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
 * @param {boolean} [props.isWinning] - Whether this cell is part of the winning line
 * @param {number} [props.heatIntensity] - Heat intensity value for analytics visualization (0-5)
 * @returns {JSX.Element} - Rendered Cell component
 */
const Cell = ({ value, index, onClick, isWinning = false, heatIntensity = 0 }) => {
  // Calculate cell classes based on props
  const cellClass = [
    'cell',
    value ? `cell-${value.toLowerCase()}` : '',
    isWinning ? 'cell-winning' : '',
    heatIntensity > 0 ? `heat-intensity-${Math.min(5, heatIntensity)}` : ''
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={cellClass}
      onClick={() => onClick(index)}
      disabled={value !== null}
      aria-label={`Cell ${index}, ${value || 'empty'}`}
    >
      {value}
    </button>
  );
};

export default Cell;

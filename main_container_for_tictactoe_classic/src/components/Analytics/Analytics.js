import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Analytics.css';

// PUBLIC_INTERFACE
/**
 * Analytics component displays game statistics and visualizations.
 * 
 * @param {object} props - Component properties
 * @param {object} props.stats - Game statistics data
 * @param {Array} props.stats.wins - Array of win counts [X wins, O wins, draws]
 * @param {Array} props.stats.moveHistory - Array of move histories
 * @param {number} props.boardSize - Size of the game board
 * @param {boolean} [props.showHeatmap=false] - Whether to show the move heatmap
 * @returns {JSX.Element} - Rendered Analytics component
 */
const Analytics = ({ stats, boardSize, showHeatmap = false }) => {
  const { wins = [0, 0, 0], moveHistory = [] } = stats;
  
  // Prepare data for pie chart
  const pieData = [
    { name: 'X Wins', value: wins[0] },
    { name: 'O Wins', value: wins[1] },
    { name: 'Draws', value: wins[2] }
  ].filter(item => item.value > 0);
  
  // Colors for pie chart
  const COLORS = ['#4cc9f0', '#E87A41', '#cccccc'];
  
  // Create move frequency data
  const calculateMoveFrequency = () => {
    const freq = {};
    
    moveHistory.forEach(move => {
      if (!freq[move.position]) {
        freq[move.position] = { X: 0, O: 0 };
      }
      freq[move.position][move.player] += 1;
    });
    
    // Convert to array format for bar chart
    return Object.entries(freq).map(([position, counts]) => ({
      position: Number(position),
      X: counts.X || 0,
      O: counts.O || 0
    })).sort((a, b) => a.position - b.position);
  };
  
  const moveFrequency = calculateMoveFrequency();
  
  // Calculate heatmap data for visualization
  const calculateHeatmap = () => {
    const heatmap = {};
    const totalMoves = moveHistory.length;
    
    if (totalMoves === 0) return {};
    
    moveHistory.forEach(move => {
      if (!heatmap[move.position]) {
        heatmap[move.position] = 0;
      }
      heatmap[move.position] += 1;
    });
    
    // Normalize values from 0-5 for intensity
    Object.keys(heatmap).forEach(pos => {
      const normalized = Math.ceil((heatmap[pos] / Math.max(...Object.values(heatmap))) * 5);
      heatmap[pos] = normalized;
    });
    
    return heatmap;
  };
  
  // Total games played
  const totalGames = wins.reduce((sum, val) => sum + val, 0);
  
  return (
    <div className="analytics">
      <h3 className="analytics-title">Game Analytics</h3>
      
      {/* Stats summary */}
      <div className="stats-container">
        <div className="stat-box">
          <div className="stat-label">X Wins</div>
          <div className="stat-value stat-x">{wins[0]}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">O Wins</div>
          <div className="stat-value stat-o">{wins[1]}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Draws</div>
          <div className="stat-value stat-draw">{wins[2]}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Games</div>
          <div className="stat-value">{totalGames}</div>
        </div>
      </div>
      
      {/* Win distribution chart */}
      {totalGames > 0 && (
        <div className="charts-container">
          <div className="chart-section">
            <div className="chart-title">Win Distribution</div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Games']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Move distribution chart */}
          {moveFrequency.length > 0 && (
            <div className="chart-section">
              <div className="chart-title">Move Distribution by Position</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={moveFrequency}>
                  <XAxis dataKey="position" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="X" name="X Moves" fill="#4cc9f0" />
                  <Bar dataKey="O" name="O Moves" fill="#E87A41" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
      
      {/* Export heat map data for the board component */}
      {showHeatmap && (
        <div className="board-heatmap-data" style={{ display: 'none' }}>
          {JSON.stringify(calculateHeatmap())}
        </div>
      )}
    </div>
  );
};

export default Analytics;

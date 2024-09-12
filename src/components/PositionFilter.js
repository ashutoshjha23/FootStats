import React, { useState } from 'react';

const positions = [
  'All',
  'GK', 'DF', 'MF', 'FW', 
];

const PositionFilter = ({ onPositionChange }) => {
  const [selectedPosition, setSelectedPosition] = useState('All');

  const handleChange = (e) => {
    const position = e.target.value;
    setSelectedPosition(position);
    onPositionChange(position);
  };

  return (
    <div className="position-filter">
      <label htmlFor="position">Select Position:</label>
      <select id="position" value={selectedPosition} onChange={handleChange}>
        {positions.map((position) => (
          <option key={position} value={position}>
            {position}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PositionFilter;

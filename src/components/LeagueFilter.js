import React, { useState, useEffect } from 'react';

const LeagueFilter = ({ players, onLeagueChange }) => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const uniqueLeagues = Array.from(new Set(players.map(player => player.Comp)));
    setLeagues(['All', ...uniqueLeagues]);
  }, [players]);

  const handleLeagueChange = (event) => {
    onLeagueChange(event.target.value);
  };

  return (
    <div className="filter">
      <label htmlFor="league">Filter by League:</label>
      <select id="league" onChange={handleLeagueChange}>
        {leagues.map((league, index) => (
          <option key={index} value={league}>{league}</option>
        ))}
      </select>
    </div>
  );
};

export default LeagueFilter;

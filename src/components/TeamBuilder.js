import React, { useState } from 'react';
import SearchBar from './SearchBar';
import BuildPlayerCard from './BuildPlayerCard';
import './TeamBuilder.css'; 

const TeamBuilder = ({ players }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [teamSlots, setTeamSlots] = useState(Array(11).fill(null)); 
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null); 
  const handleSearch = (query) => {
    setSearchQuery(query);
    filterPlayers(query, selectedPosition, selectedLeague);
  };


  const handlePositionChange = (e) => {
    const position = e.target.value;
    setSelectedPosition(position);
    filterPlayers(searchQuery, position, selectedLeague);
  };
  const handleLeagueChange = (e) => {
    const league = e.target.value;
    setSelectedLeague(league);
    filterPlayers(searchQuery, selectedPosition, league);
  };
  const filterPlayers = (query, position, league) => {
    let filtered = players;

    if (query.trim()) {
      filtered = filtered.filter((p) =>
        p.Player.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (position) {
      filtered = filtered.filter((p) => p.Pos === position);
    }

    if (league) {
      filtered = filtered.filter((p) => p.Comp === league);
    }

    setFilteredPlayers(filtered);
  };

  const assignPlayerToSlot = (index) => {
    if (selectedPlayer) {
      const updatedSlots = [...teamSlots];
      updatedSlots[index] = selectedPlayer;
      setTeamSlots(updatedSlots);
      setSelectedPlayer(null);
    }
  };

  return (
    <div className="team-builder">
      <h2>Build Your Team</h2>
      <SearchBar onSearch={handleSearch} />
      <div className="filter">
        <label>Filter by Position: </label>
        <select value={selectedPosition} onChange={handlePositionChange}>
          <option value="">All</option>
          <option value="FW">Forward</option>
          <option value="MF">Midfielder</option>
          <option value="DF">Defender</option>
          <option value="GK">Goalkeeper</option>
        </select>
      </div>
      <div className="filter">
        <label>Filter by League: </label>
        <select value={selectedLeague} onChange={handleLeagueChange}>
          <option value="">All</option>
          <option value="Premier League">Premier League</option>
          <option value="La Liga">La Liga</option>
          <option value="Serie A">Serie A</option>
          <option value="Bundesliga">Bundesliga</option>
        </select>
      </div>

      {searchQuery && (
        <div className="player-search-results">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => (
              <div key={player.Rk} className="player-item">
                <BuildPlayerCard player={player} />
                <button onClick={() => setSelectedPlayer(player)}>Select Player</button>
              </div>
            ))
          ) : (
            <p>No players found</p>
          )}
        </div>
      )}
      <div className="football-field">
        {teamSlots.map((player, index) => (
          <div
            key={index}
            className={`team-slot slot-${index + 1}`} 
          >
            {player ? (
              <div className="player-info">
                <p>{player.Player}</p>
                <p>{player.Nation}</p>
                <p>{player.Squad}</p>
                <p>{player.Pos}</p>
              </div>
            ) : (
              <p>Empty Slot</p>
            )}
            <button onClick={() => assignPlayerToSlot(index)}>
              Assign to Slot {index + 1}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamBuilder;

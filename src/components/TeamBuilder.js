import React, { useState } from 'react';
import SearchBar from './SearchBar';
import BuildPlayerCard from './BuildPlayerCard';
import './TeamBuilder.css';

const formations = {
  formation1: {
    name: '3-3-4',
    positions: [
      { top: '5%', left: '40%' },
      { top: '15%', left: '7%' },
      { top: '15%', left: '73%' },
      { top: '37%', left: '67%' },
      { top: '37%', left: '40%' },
      { top: '37%', left: '13%' },
      { top: '60%', left: '4%' },
      { top: '60%', left: '28%' },
      { top: '60%', left: '52%' },
      { top: '60%', left: '75%' },
      { top: '80%', left: '40%' }
    ]
  },
  formation2: {
    name: '4-2-3-1',
    positions: [
      { top: '2%', left: '40%' },
      { top: '19%', left: '7%' },
      { top: '19%', left: '73%' },
      { top: '27%', left: '40%' },
      { top: '45%', left: '21%' },
      { top: '45%', left: '59%' },
      { top: '64%', left: '4%' },
      { top: '64%', left: '28%' },
      { top: '64%', left: '52%' },
      { top: '64%', left: '75%' },
      { top: '82%', left: '40%' }
    ]
  },
  formation3: {
    name: '4-4-2',
    positions: [
      { top: '5%', left: '25%' },
      { top: '5%', left: '56%' },
      { top: '26%', left: '4%' },
      { top: '29%', left: '28%' },
      { top: '29%', left: '52%' },
      { top: '26%', left: '75%' },
      { top: '55%', left: '4%' },
      { top: '55%', left: '28%' },
      { top: '55%', left: '52%' },
      { top: '55%', left: '75%' },
      { top: '78%', left: '40%' }
    ]
  },
  formation4: {
    name: '4-5-1',
    positions: [
      { top: '3%', left: '40%' },
      { top: '17%', left: '4%' },
      { top: '35%', left: '15%' },
      { top: '45%', left: '40%' },
      { top: '35%', left: '65%' },
      { top: '17%', left: '76%' },
      { top: '63%', left: '3%' },
      { top: '63%', left: '28%' },
      { top: '63%', left: '52%' },
      { top: '63%', left: '77%' },
      { top: '82%', left: '40%' }
    ]
  }
};
const TeamBuilder = ({ players }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [teamSlots, setTeamSlots] = useState(Array(11).fill(null));
  const [selectedFormation, setSelectedFormation] = useState('formation1');
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

  const handleFormationChange = (e) => {
    setSelectedFormation(e.target.value);
  };

  const resetTeamSlots = () => {
    setTeamSlots(Array(11).fill(null));
  };

  const currentFormation = formations[selectedFormation];

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

      <div className="filter">
        <label>Select Formation: </label>
        <select value={selectedFormation} onChange={handleFormationChange}>
          <option value="formation1">(3-3-4)</option>
          <option value="formation2">(4-2-3-1)</option>
          <option value="formation3">(4-4-2)</option>
          <option value="formation4">(4-5-1)</option>
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
        {currentFormation.positions.map((position, index) => (
          <div
            key={index}
            className="team-slot"
            style={{ top: position.top, left: position.left }}
          >
            {teamSlots[index] ? (
              <div className="player-info">
                <p>{teamSlots[index].Player}</p>
                <p>{teamSlots[index].Nation}</p>
              </div>
            ) : (
              <p>Empty Slot</p>
            )}
            <button 
              onClick={() => assignPlayerToSlot(index)}
              className={`assign-button ${teamSlots[index] ? 'assigned' : ''}`}
            >
              Assign to Slot {index + 1}
            </button>
          </div>
        ))}
      </div>

      <button className="reset-button" onClick={resetTeamSlots}>
        Reset All Slots
      </button>
    </div>
  );
};

export default TeamBuilder;

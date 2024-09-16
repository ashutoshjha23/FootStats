import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import PlayerCard from './components/PlayerCard';
import PositionFilter from './components/PositionFilter';
import LeagueFilter from './components/LeagueFilter';
import TeamBuilder from './components/TeamBuilder';
<<<<<<< HEAD
import GoalsBarChart from './components/GoalsBarChart';
import WelcomeScreen from './components/WelcomeScreen';
=======
import GoalsBarChart from './components/GoalsBarChart'; 
>>>>>>> 95346788eed5122796d15dcd8177ccd976b55db2
import playersData from './data/players.json';
import './styles.css';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState('All');
  const [selectedLeague, setSelectedLeague] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [showWelcome, setShowWelcome] = useState(true);
  const playersPerPage = 10;
  const paginationRange = 10;

  useEffect(() => {
    setPlayers(playersData);
  }, []);

  useEffect(() => {
    filterPlayers(searchQuery, selectedPosition, selectedLeague);
  }, [searchQuery, selectedPosition, selectedLeague]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePositionChange = (position) => {
    setSelectedPosition(position);
    setCurrentPage(1);
  };

  const handleLeagueChange = (league) => {
    setSelectedLeague(league);
    setCurrentPage(1);
  };

  const filterPlayers = (query, position, league) => {
    const filteredPlayers = playersData.filter((p) => {
      const matchesQuery = p.Player && p.Player.toLowerCase().includes(query.toLowerCase());
      const matchesPosition = position === 'All' || p.Pos.includes(position);
      const matchesLeague = league === 'All' || p.Comp.includes(league);
      return matchesQuery && matchesPosition && matchesLeague;
    });
    setSelectedPlayers(filteredPlayers);
  };

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = selectedPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);
  const totalPages = Math.ceil(selectedPlayers.length / playersPerPage);
  const startPage = Math.max(1, currentPage - Math.floor(paginationRange / 2));
  const endPage = Math.min(totalPages, startPage + paginationRange - 1);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleWelcomeScreen = () => {
    setShowWelcome(false);
  };

  return (
    <Router>
      <div className={`app ${!showWelcome ? 'slide-up' : ''}`}>
        {showWelcome ? (
          <WelcomeScreen onStart={handleWelcomeScreen} />
        ) : (
          <>
            <header>
              <nav>
                <Link to="/">Stats</Link>
                <Link to="/build-team">Build Your Team</Link>
                <Link to="/top-goals">Top Scorers</Link>
              </nav>
            </header>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <h1>Player Stats</h1>
                    <SearchBar onSearch={handleSearch} />
                    <PositionFilter onPositionChange={handlePositionChange} />
                    <LeagueFilter players={players} onLeagueChange={handleLeagueChange} />
                    {searchQuery && (
                      <div className="player-cards">
                        {currentPlayers.length > 0 ? (
                          currentPlayers.map((player) => (
                            <PlayerCard key={player.Rk} player={player} />
                          ))
                        ) : (
                          <p>No players found</p>
                        )}
                      </div>
                    )}
                    {searchQuery && (
                      <div className="pagination">
                        {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((pageNumber) => (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={currentPage === pageNumber ? 'active' : ''}
                          >
                            {pageNumber}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                }
              />
              <Route path="/build-team" element={<TeamBuilder players={players} />} />
              <Route path="/top-goals" element={<GoalsBarChart players={players} />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;

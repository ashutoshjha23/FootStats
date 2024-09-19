import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import playersData from '../data/players.json';
import Chart from 'chart.js/auto';

const GoalsAssistsBarChart = () => {
  const [leagueTopPlayers, setLeagueTopPlayers] = useState({});
  const [selectedLeague, setSelectedLeague] = useState('Premier League');
  const [statType, setStatType] = useState('Goals');

  useEffect(() => {
    const categorizeTopPlayersByLeague = () => {
      const leagueGroups = playersData.reduce((acc, player) => {
        const league = player.Comp;
        if (!acc[league]) acc[league] = [];
        acc[league].push(player);
        return acc;
      }, {});

      const topPlayersByLeague = {};
      for (let league in leagueGroups) {
        topPlayersByLeague[league] = {
          goals: leagueGroups[league]
            .sort((a, b) => b.Goals - a.Goals)
            .slice(0, 7),
          assists: leagueGroups[league]
            .sort((a, b) => b.Assists - a.Assists)
            .slice(0, 7),
        };
      }
      setLeagueTopPlayers(topPlayersByLeague);
    };

    categorizeTopPlayersByLeague();
  }, []);

  const handleLeagueChange = (event) => {
    setSelectedLeague(event.target.value);
  };

  const handleStatTypeChange = (event) => {
    setStatType(event.target.value);
  };

  const dataForSelectedLeague = leagueTopPlayers[selectedLeague]
    ? leagueTopPlayers[selectedLeague][statType.toLowerCase()] || []
    : [];

  return (
    <div className="goals-assists-chart-container">
      <h2>Top Players by {statType} in {selectedLeague}</h2>

      <div className="filter-container">
        <label htmlFor="league-filter">Select League:</label>
        <select id="league-filter" value={selectedLeague} onChange={handleLeagueChange}>
          {Object.keys(leagueTopPlayers).map((league) => (
            <option key={league} value={league}>
              {league}
            </option>
          ))}
        </select>

        <label htmlFor="stat-type-filter" style={{ marginLeft: '20px' }}>Select Stat:</label>
        <select id="stat-type-filter" value={statType} onChange={handleStatTypeChange}>
          <option value="Goals">Most Goals</option>
          <option value="Assists">Most Assists</option>
        </select>
      </div>

      {dataForSelectedLeague.length > 0 ? (
        <div className="league-chart">
          <h3>{statType} Leaders - {selectedLeague}</h3>
          <Bar
            data={{
              labels: dataForSelectedLeague.map((player) => player.Player),
              datasets: [
                {
                  label: 'Goals',
                  data: dataForSelectedLeague.map((player) => player.Goals),
                  backgroundColor: 'rgba(255, 0, 0, 0.6)',
                  borderColor: 'rgba(255, 0, 0, 1)',
                  borderWidth: 1,
                },
                {
                  label: 'Assists',
                  data: dataForSelectedLeague.map((player) => player.Assists),
                  backgroundColor: 'rgba(54, 162, 235, 0.6)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        </div>
      ) : (
        <p>No data available for the selected league or stat.</p>
      )}
    </div>
  );
};

export default GoalsAssistsBarChart;

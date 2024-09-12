import React from 'react';
import './BuildPlayerCard.css'; 

const BuildPlayerCard = ({ player }) => {
  if (!player) return null;

  return (
    <div className="build-player-card">
      <h3>{player.Player}</h3>
      <p><strong>Nation:</strong> {player.Nation}</p>
      <p><strong>Squad:</strong> {player.Squad}</p>
      <p><strong>Position:</strong> {player.Pos}</p>
    </div>
  );
};

export default BuildPlayerCard;

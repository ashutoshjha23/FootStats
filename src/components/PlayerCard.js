import React, { useState } from 'react';
import Modal from './Modal'; 
import './PlayerCard.css'; 

const PlayerCard = ({ player }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMoreStatsClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="player-card">
      <h3>{player.Player}</h3>
      <p><strong>Nationality:</strong> {player.Nation}</p>
      <p><strong>Squad:</strong> {player.Squad}</p>
      <p><strong>Position:</strong> {player.Pos}</p>
      <button onClick={handleMoreStatsClick}>More Stats</button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} player={player} />
    </div>
  );
};

export default PlayerCard;

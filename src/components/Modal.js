import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, player }) => {
  if (!isOpen || !player) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2 className="modal-title">{player.Player}</h2>
        <div className="modal-body">
          <p><strong>Nationality:</strong> {player.Nation}</p>
          <p><strong>Squad:</strong> {player.Squad}</p>
          <p><strong>Position:</strong> {player.Pos}</p>
          <p><strong>Age:</strong> {player.Age}</p>
          <p><strong>Pass Completion Rate:</strong> {(player.PasTotCmp / player.PasTotAtt * 100).toFixed(2)}%</p>
          <p><strong>Total Passes Attempted:</strong> {player.PasTotAtt}</p>
          <p><strong>Total Passes Completed:</strong> {player.PasTotCmp}</p>
          <p><strong>Total Passes Progressing Distance:</strong> {player.PasTotPrgDist}</p>
          <p><strong>Dribble Success Rate:</strong> {(player.TklDri / player.TklDriAtt * 100).toFixed(2)}%</p>
          <p><strong>Successful Tackles:</strong> {player.TklWon}</p>
          <p><strong>Total Carry Distance:</strong> {player.CarTotDist}</p>
          <p><strong>Progressive Carry Distance:</strong> {player.CarPrgDist}</p>
          <p><strong>Successful Recoveries:</strong> {player.Recov}</p>
          <p><strong>Total Blocks:</strong> {player.Blocks}</p>
          <p><strong>Crosses Attempted:</strong> {player.Crs}</p>
          <p><strong>Crosses Completed:</strong> {player.PasCrs}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;

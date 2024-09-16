import React from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="welcome-screen">
      <h1>FootStats</h1>
      <button onClick={onStart} className="start-button">
        Enter
      </button>
    </div>
  );
};

export default WelcomeScreen;

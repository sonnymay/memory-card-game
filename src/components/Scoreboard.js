// src/components/Scoreboard.js
import React from 'react';
import './Scoreboard.css';

const Scoreboard = ({ currentScore, bestScore }) => {
  return (
    <div className="scoreboard">
      <h2>Memory Card Game</h2>
      <div>
        <span>Current Score: {currentScore}</span>
        <span>Best Score: {bestScore}</span>
      </div>
    </div>
  );
};

export default Scoreboard;

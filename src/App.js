// src/App.js
import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import Scoreboard from './components/Scoreboard';
import './App.css';

const App = () => {
  const [cards, setCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=12'
    );
    const data = await response.json();
    const cardData = data.results.map((pokemon, index) => ({
      id: index,
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
    }));
    setCards(shuffleArray(cardData.concat(cardData))); // Duplicating the array for pairs
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (card) => {
    if (selectedCards.includes(card)) {
      resetGame();
    } else {
      setSelectedCards([...selectedCards, card]);
      setCurrentScore(currentScore + 1);
      if (currentScore + 1 > bestScore) {
        setBestScore(currentScore + 1);
      }
    }

    if (selectedCards.length === cards.length - 1) {
      // All cards have been matched
      resetGame();
    }
  };

  const resetGame = () => {
    setSelectedCards([]);
    setCurrentScore(0);
    setCards(shuffleArray(cards));
  };

  return (
    <div className="App">
      <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

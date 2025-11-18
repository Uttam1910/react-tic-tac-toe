import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Board from './components/Board';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [scores, setScores] = useState({
    playerX: 0,
    playerO: 0,
    draws: 0
  });

  useEffect(() => {
    const savedScores = localStorage.getItem('tictactoescores');
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }

    const savedTheme = localStorage.getItem('tictactoetheme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark-mode');
        localStorage.setItem('tictactoetheme', 'dark');
      } else {
        document.documentElement.classList.remove('dark-mode');
        localStorage.setItem('tictactoetheme', 'light');
      }
      return newMode;
    });
  }, []);

  const updateScores = useCallback((winner) => {
    setScores(prev => {
      const updated = { ...prev };
      if (winner === 'X') updated.playerX += 1;
      else if (winner === 'O') updated.playerO += 1;
      else if (winner === 'draw') updated.draws += 1;
      localStorage.setItem('tictactoescores', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const resetScores = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all scores? This cannot be undone.')) {
      const newScores = { playerX: 0, playerO: 0, draws: 0 };
      setScores(newScores);
      localStorage.setItem('tictactoescores', JSON.stringify(newScores));
    }
  }, []);

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="header">
        <h1>🎮 Tic Tac Toe Pro</h1>
        <div className="header-icons">
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </button>
          <button 
            className="info-btn"
            onClick={() => alert('Tic Tac Toe Pro v2.0\n\n✨ Features:\n✓ Single & Multiplayer modes\n✓ AI with 3 difficulty levels\n✓ Score tracking\n✓ Dark/Light theme\n✓ Fully responsive\n\nTip: Try Hard mode for a challenge! 🤖')}
            title="About this game"
            aria-label="Show information about the game"
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </button>
        </div>
      </div>

      <div className="stats">
        <div className="stat-card" role="status" aria-live="polite">
          <div className="stat-label">Player X</div>
          <div className="stat-value">{scores.playerX}</div>
        </div>
        <div className="stat-card" role="status" aria-live="polite">
          <div className="stat-label">Draws</div>
          <div className="stat-value">{scores.draws}</div>
        </div>
        <div className="stat-card" role="status" aria-live="polite">
          <div className="stat-label">Player O / AI</div>
          <div className="stat-value">{scores.playerO}</div>
        </div>
      </div>

      <Board onGameEnd={updateScores} />

      {(scores.playerX > 0 || scores.playerO > 0 || scores.draws > 0) && (
        <button 
          className="reset-button" 
          style={{ marginTop: '20px', maxWidth: '600px' }} 
          onClick={resetScores}
          aria-label="Reset all game scores"
        >
          Reset All Scores
        </button>
      )}
    </div>
  );
}

export default App;

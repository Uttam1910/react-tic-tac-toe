import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Square from './Square';
import './Board.css';

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function Board({ onGameEnd }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState('pvp');
  const [difficulty, setDifficulty] = useState('medium');
  const [gameEnded, setGameEnded] = useState(false);
  const [winnerLine, setWinnerLine] = useState(null);

  const getEmptySquares = useCallback((sq) => 
    sq
      .map((square, index) => (square === null ? index : null))
      .filter(val => val !== null),
    []
  );

  const isDraw = useCallback((sq) => sq.every(square => square !== null), []);

  const minimax = useCallback((sq, depth, isMaximizing) => {
    for (let line of WINNING_LINES) {
      const [a, b, c] = line;
      if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
        return sq[a] === 'O' ? 10 - depth : depth - 10;
      }
    }
    if (isDraw(sq)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      getEmptySquares(sq).forEach(index => {
        const newSq = [...sq];
        newSq[index] = 'O';
        const score = minimax(newSq, depth + 1, false);
        bestScore = Math.max(score, bestScore);
      });
      return bestScore;
    } else {
      let bestScore = Infinity;
      getEmptySquares(sq).forEach(index => {
        const newSq = [...sq];
        newSq[index] = 'X';
        const score = minimax(newSq, depth + 1, true);
        bestScore = Math.min(score, bestScore);
      });
      return bestScore;
    }
  }, [isDraw, getEmptySquares]);

  const makeAIMove = useCallback(() => {
    setSquares(prevSquares => {
      const emptySquares = getEmptySquares(prevSquares);
      if (emptySquares.length === 0) return prevSquares;

      let selectedIndex;
      if (difficulty === 'easy') {
        selectedIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
      } else if (difficulty === 'medium') {
        if (Math.random() < 0.7) {
          let bestScore = -Infinity;
          let bestMoves = [];
          emptySquares.forEach(index => {
            const newSq = [...prevSquares];
            newSq[index] = 'O';
            const score = minimax(newSq, 0, false);
            if (score > bestScore) {
              bestScore = score;
              bestMoves = [index];
            } else if (score === bestScore) {
              bestMoves.push(index);
            }
          });
          selectedIndex = bestMoves[Math.floor(Math.random() * bestMoves.length)];
        } else {
          selectedIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        }
      } else {
        let bestScore = -Infinity;
        let bestMove = emptySquares[0];
        emptySquares.forEach(index => {
          const newSq = [...prevSquares];
          newSq[index] = 'O';
          const score = minimax(newSq, 0, false);
          if (score > bestScore) {
            bestScore = score;
            bestMove = index;
          }
        });
        selectedIndex = bestMove;
      }

      const newSquares = [...prevSquares];
      newSquares[selectedIndex] = 'O';
      
      for (let line of WINNING_LINES) {
        const [a, b, c] = line;
        if (newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {
          setWinnerLine(line);
          setGameEnded(true);
          onGameEnd(newSquares[a]);
          return newSquares;
        }
      }
      
      if (isDraw(newSquares)) {
        setGameEnded(true);
        onGameEnd('draw');
      }
      
      setIsXNext(true);
      return newSquares;
    });
  }, [difficulty, getEmptySquares, isDraw, minimax, onGameEnd]);

  useEffect(() => {
    if (gameMode === 'ai' && !isXNext && !gameEnded) {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isXNext, gameMode, gameEnded, makeAIMove]);

  const handleClick = useCallback((index) => {
    if (gameEnded || (gameMode === 'ai' && !isXNext)) return;
    
    setSquares(prevSquares => {
      if (prevSquares[index]) return prevSquares;
      
      const newSquares = [...prevSquares];
      newSquares[index] = isXNext ? 'X' : 'O';

      for (let line of WINNING_LINES) {
        const [a, b, c] = line;
        if (newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {
          setWinnerLine(line);
          setGameEnded(true);
          onGameEnd(newSquares[a]);
          return newSquares;
        }
      }

      if (isDraw(newSquares)) {
        setGameEnded(true);
        onGameEnd('draw');
        return newSquares;
      }

      setIsXNext(!isXNext);
      return newSquares;
    });
  }, [gameEnded, gameMode, isXNext, isDraw, onGameEnd]);

  const resetGame = useCallback(() => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setGameEnded(false);
    setWinnerLine(null);
  }, []);

  const winner = useMemo(() => {
    for (let line of WINNING_LINES) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }, [squares]);

  const draw = useMemo(() => isDraw(squares) && !winner, [squares, isDraw, winner]);
  const status = winner 
    ? `🎉 Winner: Player ${winner} ${gameMode === 'ai' && winner === 'O' ? '(AI)' : ''}` 
    : draw 
    ? `🤝 It's a Draw!` 
    : `${gameMode === 'ai' ? (isXNext ? '👤 Your Turn (X)' : '🤖 AI Thinking (O)...') : `Turn: Player ${isXNext ? 'X' : 'O'}`}`;

  return (
    <div className="board-container">
      <div className="status" style={{ color: winner ? '#ec4899' : draw ? '#14b8a6' : '#667eea' }}>
        {status}
      </div>

      <div className="board">
        <div className="board-row">
          {[0, 1, 2].map(i => (
            <Square 
              key={i}
              value={squares[i]} 
              onClick={() => handleClick(i)} 
              isWinner={winnerLine?.includes(i)}
              disabled={gameMode === 'ai' && !isXNext}
            />
          ))}
        </div>
        <div className="board-row">
          {[3, 4, 5].map(i => (
            <Square 
              key={i}
              value={squares[i]} 
              onClick={() => handleClick(i)} 
              isWinner={winnerLine?.includes(i)}
              disabled={gameMode === 'ai' && !isXNext}
            />
          ))}
        </div>
        <div className="board-row">
          {[6, 7, 8].map(i => (
            <Square 
              key={i}
              value={squares[i]} 
              onClick={() => handleClick(i)} 
              isWinner={winnerLine?.includes(i)}
              disabled={gameMode === 'ai' && !isXNext}
            />
          ))}
        </div>
      </div>

      <div className="game-controls">
        <div className="control-group">
          <span className="control-label">Game Mode</span>
          <div className="game-mode-buttons">
            <button 
              className={`mode-btn ${gameMode === 'pvp' ? 'active' : ''}`}
              onClick={() => { setGameMode('pvp'); resetGame(); }}
              disabled={!gameEnded && squares.some(s => s !== null)}
              aria-label="Play against another player"
            >
              2 Players
            </button>
            <button 
              className={`mode-btn ${gameMode === 'ai' ? 'active' : ''}`}
              onClick={() => { setGameMode('ai'); resetGame(); }}
              disabled={!gameEnded && squares.some(s => s !== null)}
              aria-label="Play against AI"
            >
              vs AI
            </button>
          </div>
        </div>

        {gameMode === 'ai' && (
          <div className="control-group">
            <span className="control-label">Difficulty</span>
            <div className="difficulty-buttons">
              <button 
                className={`diff-btn ${difficulty === 'easy' ? 'active' : ''}`}
                onClick={() => { setDifficulty('easy'); resetGame(); }}
                disabled={!gameEnded && squares.some(s => s !== null)}
                aria-label="Easy difficulty"
              >
                Easy
              </button>
              <button 
                className={`diff-btn ${difficulty === 'medium' ? 'active' : ''}`}
                onClick={() => { setDifficulty('medium'); resetGame(); }}
                disabled={!gameEnded && squares.some(s => s !== null)}
                aria-label="Medium difficulty"
              >
                Medium
              </button>
              <button 
                className={`diff-btn ${difficulty === 'hard' ? 'active' : ''}`}
                onClick={() => { setDifficulty('hard'); resetGame(); }}
                disabled={!gameEnded && squares.some(s => s !== null)}
                aria-label="Hard difficulty"
              >
                Hard
              </button>
            </div>
          </div>
        )}
      </div>

      {(winner || draw) && (
        <button className="reset-button" onClick={resetGame} aria-label="Play another game">
          Play Again
        </button>
      )}
    </div>
  );
}

export default Board;

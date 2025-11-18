import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCircle } from '@fortawesome/free-solid-svg-icons';
import './Square.css';

function Square({ value, onClick, isWinner, disabled }) {
  const renderIcon = () => {
    if (value === 'X') {
      return <FontAwesomeIcon icon={faTimes} />;
    } else if (value === 'O') {
      return <FontAwesomeIcon icon={faCircle} />;
    }
    return null;
  };

  return (
    <button 
      className={`square ${isWinner ? 'winner' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled || value !== null}
    >
      {renderIcon()}
    </button>
  );
}

export default Square;

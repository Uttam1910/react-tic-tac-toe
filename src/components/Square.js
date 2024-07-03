import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCircle } from '@fortawesome/free-solid-svg-icons';
import './Square.css';

function Square({ value, onClick }) {
  const renderIcon = () => {
    if (value === 'X') {
      return <FontAwesomeIcon icon={faTimes} />;
    } else if (value === 'O') {
      return <FontAwesomeIcon icon={faCircle} />;
    }
    return null;
  };

  return (
    <button className="square" onClick={onClick}>
      {renderIcon()}
    </button>
  );
}

export default Square;

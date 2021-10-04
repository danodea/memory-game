import React from 'react';
import './Card.css';

function Card(props) {

    const handleClick = () => {
        props.clickHandler(props.index);
    }

    return (
      <div className={`Card ${props.isFound ? 'found' : ''}`} onClick={handleClick}>
          <p className="name">
              {props.isSelected ? props.name : null}
          </p>
      </div>
    );
  }
  
  export default Card;
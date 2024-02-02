import logo from './logo.svg';
import React, { useState } from 'react';
import './Card.css';

function Card({image, code, key}) {

   const [rotation, setRotation] = useState(`${Math.random()*90 -30}deg`);
    return (
        <img className="card" key={key} alt={code} src={image} style={{rotate: rotation}}></img>
    );
}
export default Card;
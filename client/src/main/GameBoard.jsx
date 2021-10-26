/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

const GameBoard = () => {
  const [unitTop, setUnitTop] = useState(500);
  const [unitLeft, setUnitLeft] = useState(500);
  const [targetTop, setTargetTop] = useState(750);
  const [targetLeft, setTargetLeft] = useState(750);
  const [moving, setMoving] = useState(false);
  const [attacking, setAttacking] = useState(false);
  const [eliminated, setEliminated] = useState(false);

  const attack = (itr) => {
    console.log('==========================');
    const distance = (Math.sqrt((Math.abs(unitLeft - targetLeft) ** 2)
      + (Math.abs(unitTop - targetTop) ** 2)) / 28).toFixed(2);
    console.log('Distance:', distance);
    const requiredRoll = Math.round(distance * itr);
    console.log('Roll required to hit:', requiredRoll);
    const attackRoll = Math.ceil(Math.random() * 20);
    console.log('Attacker Roll:', attackRoll);
    if (attackRoll >= requiredRoll) {
      console.log('Hit.');
      const saveRoll = Math.ceil(Math.random() * 20);
      if (saveRoll >= attackRoll) {
        console.log(`Save succeeded with roll of ${saveRoll}`);
      } else {
        console.log(`Save failed with roll of ${saveRoll}`);
        setEliminated(true);
      }
    } else {
      console.log('Miss.');
    }
    console.log('==========================');
  };

  return (
    <div style={{ marginTop: '9vh', height: '91vh' }}>
      Open The Console.
      <input
        type="button"
        value="Attack"
        onClick={() => {
          setAttacking(true);
          setMoving(false);
        }}
      />
      <input
        type="button"
        value="Move"
        onClick={() => {
          setMoving(true);
          setAttacking(false);
        }}
      />
      <div
        style={{
          height: '87vh', width: '100vw',
        }}
        onMouseDown={(event) => {
          if (moving) {
            setUnitLeft(event.clientX);
            setUnitTop(event.clientY);
          }
        }}
      >
        <img
          className="gamepiece"
          style={{ top: `${unitTop - 25}px`, left: `${unitLeft - 25}px` }}
          alt="Flamer"
          src="Standing Rifleman.png"
        />
        <img
          className="gamepiece"
          style={{ top: `${targetTop - 25}px`, left: `${targetLeft - 25}px`, transform: `rotate(${eliminated ? '90deg' : '0deg'})` }}
          onClick={() => { attack(0.8); }}
          alt="Flamer"
          src="Standing Rifleman Black.png"
        />
      </div>
    </div>
  );
};

export default GameBoard;

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

const GameBoard = () => {
  const [newGame, setNewGame] = useState(true);
  const [unitTop, setUnitTop] = useState(500);
  const [unitLeft, setUnitLeft] = useState(500);
  const [targetTop, setTargetTop] = useState(750);
  const [targetLeft, setTargetLeft] = useState(750);
  const [moving, setMoving] = useState(true);
  const [attacking, setAttacking] = useState(false);
  const [targetEliminated, setTargetEliminated] = useState(false);
  const [unitEliminated, setUnitEliminated] = useState(false);

  if (newGame) { console.log('When "Move" appears in top left, click on the field to move. When "Attack" appears in the top left, click enemy unit to attack.'); }

  const attack = (itr, attacker) => {
    console.log('==========================');
    if (attacker === 'player') {
      console.log('Attacking Computer.');
    } else {
      console.log('Computer Attacks.');
    }
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
        return false;
      }
      console.log(`Save failed with roll of ${saveRoll}`);
      if (attacker === 'player') {
        setTargetEliminated(true);
        return true;
      }
      setUnitEliminated(true);
      return true;
    }
    console.log('Miss.');
    return false;
  };

  const computerTurn = () => {
    setTargetTop(Math.floor(Math.random() * (document.documentElement.clientHeight - 80)));
    setTargetLeft(Math.floor(Math.random() * document.documentElement.clientWidth));
    setTimeout(() => {
      if (!attack(0.8, 'target')) {
        setMoving(true);
      }
    }, 1200);
  };

  return (
    <div style={{ marginTop: '9vh', height: '91vh' }}>
      Open The Console.
      {attacking ? (
        <input
          type="button"
          value="Attack"
          onClick={() => {
            setAttacking(true);
            setMoving(false);
          }}
        />
      )
        : null}
      {moving ? (
        <input
          type="button"
          value="Move"
          onClick={() => {
            setMoving(true);
            setAttacking(false);
          }}
        />
      )
        : null}
      <div
        style={{
          height: '87vh', width: '100vw',
        }}
        onMouseDown={(event) => {
          if (moving) {
            setUnitLeft(event.clientX);
            setUnitTop(event.clientY);
            setMoving(false);
            setAttacking(true);
            setNewGame(false);
          }
        }}
      >
        <img
          className="gamepiece"
          style={{ top: `${unitTop - 25}px`, left: `${unitLeft - 25}px`, transform: `rotate(${unitEliminated ? '90deg' : '0deg'})` }}
          alt="standing Rifleman"
          src="Standing Rifleman.png"
        />
        <img
          className="gamepiece"
          style={{ top: `${targetTop - 25}px`, left: `${targetLeft - 25}px`, transform: `rotate(${targetEliminated ? '90deg' : '0deg'})` }}
          onClick={() => {
            if (attacking) {
              setAttacking(false);
              if (attack(0.8, 'player') === false) {
                setTimeout(computerTurn, 1000);
              }
            }
          }}
          alt="Standing Rifleman black"
          src="Standing Rifleman black.png"
        />
      </div>
    </div>
  );
};

export default GameBoard;

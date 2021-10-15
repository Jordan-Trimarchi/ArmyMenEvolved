import React, { useContext, useEffect, useState } from 'react';
import Context from '../context';

const MinesAndFalls = () => {
  const {
    targetUnit,
    elevation,
    playerUnit,
  } = useContext(Context);

  const [crossedMines, setCrossedMines] = useState('');
  const [canCrossMines, setCanCrossMines] = useState(true);
  const [survivedFall, setSurvivedFall] = useState('');
  const [canCheckFall, setCanCheckFall] = useState(true);

  useEffect(() => {
    setCrossedMines('');
    setCanCrossMines(true);
    setSurvivedFall('');
    setCanCheckFall(true);
  }, [playerUnit]);
  return (
    <>
      <div className={`row ${crossedMines > 1 ? 'one-button' : 'two-buttons'}`}>
        {canCrossMines ? (
          <input
            type="Button"
            value="Cross Mines"
            onClick={() => {
              setCanCrossMines(false);
              const roll = Math.ceil(Math.random() * 20);
              setCrossedMines(roll >= 6 ? `Rolled ${roll}: Success.` : `Rolled ${roll}: Failure.`);
              setTimeout(() => {
                setCanCrossMines(true);
              }, 5000);
            }}
          />
        ) : <span>&#10710;</span>}
        {crossedMines ? <span className="info-point">{crossedMines}</span> : null}
      </div>
      {targetUnit === 'ground' && Math.round(elevation) > 1
        ? (
          <div className={`row ${survivedFall > 1 ? 'one-button' : 'two-buttons'}`}>
            {canCheckFall ? (
              <input
                type="Button"
                value="Tuck and Roll"
                onClick={() => {
                  setCanCheckFall(false);
                  const roll = Math.ceil(Math.random() * 20);
                  setSurvivedFall(roll >= Math.round(elevation) ? `Needed ${Math.round(elevation)}+: Rolled ${roll}: Success.` : `Rolled ${roll}: Failure.`);
                  setTimeout(() => {
                    setCanCheckFall(true);
                  }, 5000);
                }}
              />
            ) : <span>&#10710;</span>}
            {survivedFall ? <span className="info-point">{survivedFall}</span> : null}
          </div>
        ) : null}
      {targetUnit === 'ground' && elevation && Math.round(elevation) < 2
        ? <div className="row center-div">{'You\'re fine.'}</div>
        : null}

      {targetUnit === 'ground' && !elevation
        ? <div className="row center-div">Enter Elevation to roll for fall survival.</div>
        : null}
    </>
  );
};

export default MinesAndFalls;

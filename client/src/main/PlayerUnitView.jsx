import React, { useEffect, useContext } from 'react';
import MinesAndFalls from './MinesAndFalls';
import Context from '../context';
import PlayerUnitRows from './PlayerUnitRows';

const PlayerUnitView = () => {
  const {
    playerUnit,
    targetUnit,
    rollToHit,
    setRollToHitAug,
    elevation,
    setElevation,
    distance,
    setIsInPartialCover,
    rollResult,
    setRollResult,
    setUsingMortarMechanics,
    usingGrenade,
    setUsingGrenade,
    setIsCriticalHit,
    usingSideArm,
    setUsingSideArm,
    setSpotted,
    setIsInRecon,
    setUnitIsNearCaptain,
    setUnitIsNearSergeant,
    setIsMounted,
    setIsSnipey,
    isSnipey,
  } = useContext(Context);

  useEffect(() => {
    if (playerUnit.name === 'Flamer') { setUsingSideArm(true); }
    setUsingGrenade(false);
    setIsMounted(false);
    setIsSnipey(false);
    setUnitIsNearCaptain(false);
    setUnitIsNearSergeant(false);
    setIsInPartialCover(false);
    setSpotted(false);
    setIsInRecon(false);
    setRollToHitAug(0);
    setUsingSideArm(false);
    setRollResult('');
    setElevation('');
  }, [playerUnit]);

  useEffect(() => {
    if (rollResult === '20' || (rollResult >= rollToHit && isSnipey)) {
      setIsCriticalHit(true);
    } else {
      setIsCriticalHit(false);
    }
  }, [rollResult, isSnipey]);

  useEffect(() => {
    if ((playerUnit.name === 'Mortar' && !usingSideArm) || (playerUnit.name === 'Standing Rifleman' && usingGrenade) || (playerUnit.name === 'Bazooka' && elevation > distance / 2)) {
      setUsingMortarMechanics(true);
    } else {
      setUsingMortarMechanics(false);
    }
  }, [playerUnit, usingGrenade, usingSideArm, elevation, distance, rollToHit, rollResult]);

  return (
    <div className="player-unit-view">
      <h2>
        {`Unit: ${playerUnit.name}`}
        <img className="avatar" src={`${playerUnit.name}.png`} />
      </h2>

      {playerUnit && targetUnit
        ? <PlayerUnitRows />
        : null}

      <MinesAndFalls />

      <h2>Unit Stats</h2>
      {Object.keys(playerUnit).map((item) => (
        item !== 'name' ? (
          <div className="row">
            <span className={`info-point ${playerUnit[item].length > 93 ? 'long-span' : ''}`}>
              {`${item}:`}
            </span>
            <span className="info">
              {playerUnit[item]}
            </span>
          </div>
        ) : null
      ))}
    </div>
  );
};

export default PlayerUnitView;

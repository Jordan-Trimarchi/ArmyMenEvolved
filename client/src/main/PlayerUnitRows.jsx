import React, { useContext } from 'react';
import Context from '../context';
import AttackRoll from './AttackRoll';
import RollToHitControllers from './RollToHitControllers';
import UnitSpecificControllers from './UnitSpecificControllers';

const PlayerUnitRows = () => {
  const {
    distance,
    setDistance,
    playerUnit,
    setUsingGrenade,
    setIsMounted,
    setIsSnipey,
    setIsInPartialCover,
    usingMortarMechanics,
    elevation,
    setElevation,
    setRollToHit,
    setRollToHitAug,
    setSpotted,
    currentITR,
    setUnitIsNearCaptain,
    setUnitIsNearSergeant,
    checkFallView,
    setCheckFallView,
  } = useContext(Context);

  const isBazooka = playerUnit.name === 'Bazooka';

  const handleClear = () => {
    setRollToHit(0);
    setRollToHitAug(0);
    setElevation('');
    setDistance(0);
    setSpotted(false);
    setIsInPartialCover(false);
    setUnitIsNearCaptain(false);
    setUnitIsNearSergeant(false);
    setIsSnipey(false);
    setIsMounted(false);
    setUsingGrenade(false);
    setCheckFallView(false);
  };

  return (
    <div>
      <div className="row">
        <h2>Attack Calculator</h2>
        <input type="button" value="Clear All" onClick={handleClear} />
      </div>

      <div className="row">
        <span className="info-point">Distance to target: </span>
        <input
          value={distance}
          onChange={(event) => { setDistance(event.target.value); }}
          type="number"
          step=".0625"
          placeholder="Inches"
          min="0"
        />
      </div>

      <UnitSpecificControllers />

      <div className="row">

        {!usingMortarMechanics || isBazooka ? (
          <span className="info-point">
            {` Elevation: Unit is
            ${elevation === '0' || !elevation ? 'level with ' : `${Math.abs(elevation)} inches ${elevation >= 0 ? 'higher than ' : 'lower than '}`}
            target.`}
          </span>
        )
          : <span className="info-point">Elevation:</span>}

        {!usingMortarMechanics || isBazooka || checkFallView
          ? (
            <input
              value={elevation}
              name="elevation"
              onChange={(event) => { setElevation(event.target.value); }}
              type="number"
              step=".0625"
              placeholder="Inches"
            />
          )
          : (
            <div>
              Target is uphill: Measure diagonally.
              <br />
              Target is downhill: Measure horizontally to space above target.
            </div>
          )}

      </div>

      <RollToHitControllers />

      <div className="row">
        <span className="info-point">Current Inches To Roll:</span>
        <span className="info">
          {currentITR}
        </span>
      </div>

      <AttackRoll />

    </div>
  );
};

export default PlayerUnitRows;

import React, { useContext } from 'react';
import { Checkbox } from '@material-ui/core';
import Context from '../context';
import AttackRoll from './AttackRoll';
import useStyles from './useStyles';

const PlayerUnitRows = () => {
  const {
    distance,
    setDistance,
    playerUnit,
    usingSideArm,
    setUsingSideArm,
    setCurrentITR,
    setUsingGrenade,
    setIsMounted,
    setIsSnipey,
    handleRollToHitAugChange,
    setIsInPartialCover,
    usingGrenade,
    isMounted,
    isSnipey,
    usingMortarMechanics,
    elevation,
    setElevation,
    isInPartialCover,
    spotted,
    setRollToHit,
    setRollToHitAug,
    setSpotted,
    isInRecon,
    setIsInRecon,
    currentITR,
    setUnitIsNearCaptain,
    setUnitIsNearSergeant,
    unitIsNearCaptain,
    unitIsNearSergeant,
  } = useContext(Context);
  const classes = useStyles();

  const handleClear = () => {
    setRollToHit(0);
    setRollToHitAug(0);
    setElevation('0');
    setDistance(0);
    setSpotted(false);
    setIsInPartialCover(false);
    setUnitIsNearCaptain(false);
    setUnitIsNearSergeant(false);
    setIsSnipey(false);
    setIsMounted(false);
    setUsingGrenade(false);
  };

  const handleSidearm = (event) => {
    if (event.target.checked) { setUsingSideArm(true); } else { setUsingSideArm(false); }
    if (event.target.checked) { setCurrentITR(playerUnit['Sidearm Inches To Roll']); } else { setCurrentITR(playerUnit['Inches To Roll'] || playerUnit['Mortar Inches To Roll']); }
  };

  const handleGrenade = (event) => {
    if (event.target.checked) { setUsingGrenade(true); } else { setUsingGrenade(false); }
    if (event.target.checked) { setCurrentITR(1); } else { setCurrentITR(playerUnit['Inches To Roll']); }
  };

  const handleMount = (event) => {
    if (event.target.checked) { setIsMounted(true); } else { setIsMounted(false); }
    if (event.target.checked) { setCurrentITR(0.53); } else { setCurrentITR(playerUnit['Inches To Roll']); }
  };

  const handleSneakAttack = (event) => {
    if (event.target.checked) { setIsSnipey(true); } else { setIsSnipey(false); }
    if (event.target.checked) { setCurrentITR(0.43); } else { setCurrentITR(playerUnit['Inches To Roll']); }
  };

  const handleCover = (event) => {
    handleRollToHitAugChange(event, 3);
    if (event.target.checked) { setIsInPartialCover(true); } else { setIsInPartialCover(false); }
  };
  return (
    <div>
      <div className="row">
        <span className="fake-h3">Attack Calculator</span>
        <input type="button" value="Clear All" onClick={handleClear} />
      </div>
      <div className="row">
        <span className="info-point">Distance to target: </span>
        <input
          value={distance}
          onChange={(event) => {
            setDistance(event.target.value);
          }}
          type="number"
          step=".0625"
          placeholder="Inches"
          min="0"
          style={{ width: '5em' }}
        />
      </div>
      {playerUnit['Sidearm Inches To Roll'] && !playerUnit['Inches To Roll']
        ? (
          <div className="row">
            <span className="info-point">Use Sidearm: </span>
            <Checkbox className={classes.unitSelect} checked={playerUnit.name === 'Flamer' ? true : usingSideArm} onChange={handleSidearm} />
          </div>
        )
        : null}
      {playerUnit.name === 'Standing Rifleman'
        ? (
          <div className="row">
            <span className="info-point">Throw Grenade: </span>
            <Checkbox
              className={classes.unitSelect}
              checked={usingGrenade}
              onChange={handleGrenade}
            />
          </div>
        )
        : null}
      {playerUnit.name === 'Kneeling Rifleman' ? (
        <div className="row">
          <span className="info-point">
            Mount up (.53 ITR)
            :
          </span>
          <Checkbox
            className={classes.unitSelect}
            onChange={handleMount}
            checked={isMounted}
          />
        </div>
      ) : null}
      {playerUnit.name === 'Prone Rifleman' ? (
        <div className="row">
          <span className="info-point">Dead-Eye (2 actions: .43 ITR):</span>
          <Checkbox
            className={classes.unitSelect}
            onChange={handleSneakAttack}
            checked={isSnipey}
          />
        </div>
      ) : null}
      <div className="row">
        {!usingMortarMechanics || playerUnit.name === 'Bazooka' ? (
          <span className="info-point">
            Elevation: Unit is
            {' '}
            {elevation === '0' || !elevation ? 'level with ' : `${Math.abs(elevation)} inches ${elevation >= 0 ? 'higher than ' : 'lower than '}`}
            target.
            {' '}
          </span>
        )
          : <span className="info-point">Elevation:</span>}
        {!usingMortarMechanics || playerUnit.name === 'Bazooka' ? (
          <input
            value={elevation}
            name="elevation"
            onChange={(event) => {
              setElevation(event.target.value);
            }}
            type="number"
            step=".0625"
            placeholder="Inches"
            style={{ width: '5em' }}
          />
        )
          : (
            <div>
              Target is uphill: Measure diagonally.
              {' '}
              <br />
              {' '}
              Target is downhill: Measure horizontally to space above target.
            </div>
          )}
      </div>
      {!usingMortarMechanics || playerUnit.name === 'Bazooka' ? (
        <div className="row">
          <span className="info-point">Target is in partial cover:</span>
          <Checkbox className={classes.unitSelect} name="cover" onChange={handleCover} checked={isInPartialCover} />
        </div>
      ) : null}
      <div className="row">
        <span className="info-point">
          {`Template #3: Actively 'Spotted' by ${playerUnit.name === 'Recon Scout' ? 'another ' : ''}Recon Scout:`}
        </span>
        <Checkbox
          className={classes.unitSelect}
          checked={spotted}
          onChange={(event) => {
            setSpotted(!spotted);
            if (isInRecon) {
              handleRollToHitAugChange(event, -2);
              setIsInRecon(false);
            } else {
              handleRollToHitAugChange(event, -3);
            }
          }}
        />
      </div>
      {playerUnit.name !== 'Captain'
        ? (
          <div className="row">
            <span className="info-point">{'Template #3: Within \'Call to Arms\' radius of Captain:'}</span>
            <Checkbox
              className={classes.unitSelect}
              onChange={(event) => {
                if (playerUnit['Unit Class'] === 'Infantry') {
                  handleRollToHitAugChange(event, -2);
                } else {
                  handleRollToHitAugChange(event, -1);
                }
                if (event.target.checked) {
                  setUnitIsNearCaptain(true);
                } else { setUnitIsNearCaptain(false); }
              }}
              checked={unitIsNearCaptain}
            />
          </div>
        ) : null}
      {playerUnit.name !== 'Sergeant' && playerUnit['Unit Class'] === 'Infantry'
        ? (
          <div className="row">
            <span className="info-point">{'Template #2: Within \'Rally\' radius of Sergeant:'}</span>
            <Checkbox
              className={classes.unitSelect}
              onChange={(event) => {
                if (playerUnit['Unit Class'] === 'Infantry') {
                  handleRollToHitAugChange(event, -1);
                }
                if (event.target.checked) {
                  setUnitIsNearSergeant(true);
                } else { setUnitIsNearSergeant(false); }
              }}
              checked={unitIsNearSergeant}
            />
          </div>
        ) : null}
      {spotted ? null
        : (
          <div className="row">
            <span className="info-point">{`Template #2: Within 'Recon' radius of ${playerUnit.name === 'Recon Scout' ? 'another ' : ''}Recon Scout:`}</span>
            <Checkbox
              className={classes.unitSelect}
              checked={isInRecon}
              onChange={(event) => {
                handleRollToHitAugChange(event, -1);
                if (event.target.checked) {
                  setIsInRecon(true);
                } else {
                  setIsInRecon(false);
                }
              }}
            />
          </div>
        )}
      <div className="row">
        <span className="info-point">Current Inches To Roll:</span>
        <span>
          {' '}
          {currentITR}
        </span>
      </div>

      <AttackRoll />

    </div>
  );
};

export default PlayerUnitRows;

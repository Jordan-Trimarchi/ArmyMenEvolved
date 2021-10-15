import React, { useContext } from 'react';
import { Checkbox } from '@material-ui/core';
import Context from '../context';
import useStyles from '../useStyles';

const RollToHitControllers = () => {
  const {
    usingMortarMechanics,
    isInPartialCover,
    spotted,
    playerUnit,
    handleRollToHitAugChange,
    setIsInPartialCover,
    setSpotted,
    isInRecon,
    setIsInRecon,
    unitIsNearCaptain,
    setUnitIsNearCaptain,
    unitIsNearSergeant,
    setUnitIsNearSergeant,

  } = useContext(Context);

  const { unitSelect } = useStyles();

  const isBazooka = playerUnit.name === 'Bazooka';

  const handleCover = (event) => {
    handleRollToHitAugChange(event, 3);
    if (event.target.checked) { setIsInPartialCover(true); } else { setIsInPartialCover(false); }
  };

  return (
    <div>
      {!usingMortarMechanics || isBazooka ? (
        <div className="row">
          <span className="info-point">Target is in partial cover:</span>
          <Checkbox className={unitSelect} name="cover" onChange={handleCover} checked={isInPartialCover} />
        </div>
      ) : null}
      <div className="row">
        <span className="info-point">
          {`Template #3: Actively 'Spotted' by ${playerUnit.name === 'Recon Scout' ? 'another ' : ''}Recon Scout:`}
        </span>
        <Checkbox
          className={unitSelect}
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
      {
        playerUnit.name !== 'Captain'
          ? (
            <div className="row">
              <span className="info-point">{'Template #3: Within \'Call to Arms\' radius of Captain:'}</span>
              <Checkbox
                className={unitSelect}
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
          ) : null
      }
      {
        playerUnit.name !== 'Sergeant' && playerUnit['Unit Class'] === 'Infantry'
          ? (
            <div className="row">
              <span className="info-point">{'Template #2: Within \'Rally\' radius of Sergeant:'}</span>
              <Checkbox
                className={unitSelect}
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
          ) : null
      }
      {
        spotted ? null
          : (
            <div className="row">
              <span className="info-point">{`Template #2: Within 'Recon' radius of ${playerUnit.name === 'Recon Scout' ? 'another ' : ''}Recon Scout:`}</span>
              <Checkbox
                className={unitSelect}
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
          )
      }
    </div>
  );
};

export default RollToHitControllers;

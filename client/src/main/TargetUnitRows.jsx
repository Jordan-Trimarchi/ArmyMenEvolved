import { Checkbox } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import Context from '../context';
import useStyles from '../useStyles';

const TargetUnitRows = () => {
  const {
    targetUnit,
    playerUnit,
    targetUnitSaveAug,
    setTargetUnitSaveAug,
    usingGrenade,
    usingSideArm,
    targetIsNearCaptain,
    setTargetIsNearCaptain,
    targetIsNearSergeant,
    setTargetIsNearSergeant,
  } = useContext(Context);

  const [isBehindDestBarrier, setIsBehindDestBarrier] = useState(false);

  const classes = useStyles();
  const explosiveBaseline = playerUnit ? playerUnit['Explosive Baseline Save Requirement'] : null;
  const unitName = playerUnit ? playerUnit.name : null;
  const targetName = targetUnit.name;

  const handleSaveAugChange = (event, value) => {
    if (event.target.checked) {
      setTargetUnitSaveAug(targetUnitSaveAug + value);
    } else {
      setTargetUnitSaveAug(targetUnitSaveAug - value);
    }
  };

  return (
    <>
      <div className="row">
        <span className="info-point">Inherant Save Requirement Augmentation: </span>
        <span>
          {targetUnit['Save Requirement'] || 0}
        </span>
      </div>

      {((explosiveBaseline && unitName !== 'Standing Rifleman') || (unitName === 'Standing Rifleman' && usingGrenade)) && !usingSideArm
        ? (
          <div className="row">
            <span className="info-point">Explosive Baseline Save Requirement: </span>
            <span>
              {explosiveBaseline}
            </span>
          </div>
        )
        : null}

      {(explosiveBaseline && unitName !== 'Standing Rifleman') && !usingSideArm
        ? (
          <div className="row">
            <span className="info-point">Behind exploding barrier:</span>
            <Checkbox
              className={classes.unitSelect}
              onChange={(event) => {
                handleSaveAugChange(event, -2);
                if (event.target.checked) {
                  setIsBehindDestBarrier(true);
                } else { setIsBehindDestBarrier(false); }
              }}
              checked={isBehindDestBarrier}
            />
          </div>
        )
        : null}

      {targetName !== 'Captain'
        ? (
          <div className="row">
            <span className="info-point">{'Template #3: Within \'Call to Arms\' radius of Captain:'}</span>
            <Checkbox
              className={classes.unitSelect}
              onChange={(event) => {
                handleSaveAugChange(event, -2);
                if (event.target.checked) {
                  setTargetIsNearCaptain(true);
                } else { setTargetIsNearCaptain(false); }
              }}
              checked={targetIsNearCaptain}
            />
          </div>
        )
        : null}

      {targetName !== 'Sergeant'
        ? (
          <div className="row">
            <span className="info-point">{'Template #2: Within \'Rally\' radius of Sergeant:'}</span>
            <Checkbox
              className={classes.unitSelect}
              onChange={(event) => {
                handleSaveAugChange(event, -1);
                if (event.target.checked) {
                  setTargetIsNearSergeant(true);
                } else { setTargetIsNearSergeant(false); }
              }}
              checked={targetIsNearSergeant}
            />
          </div>
        )
        : null}

      <div className="row">
        <span className="info-point">Total Save Requirement Augmentation: </span>
        <span>
          {(targetUnitSaveAug || 0)}
        </span>
      </div>
    </>
  );
};

export default TargetUnitRows;

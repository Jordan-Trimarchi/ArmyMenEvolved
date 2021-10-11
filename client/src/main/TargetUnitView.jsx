import { Checkbox } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import unitStats from './unitStats.jsx';
import useStyles from './useStyles.js';

const TargetUnitView = ({ targetUnit, playerUnit, targetUnitSaveAug, setTargetUnitSaveAug, isNearCaptain, isNearSergeant, setIsNearCaptain, setIsNearSergeant, rollResult, rollToHit, usingMortarMechanics, usingGrenade, isCriticalHit, usingSideArm }) => {
  const [canRollToSave, setCanRollToSave] = useState(true);
  const [saved, setSaved] = useState('');
  const [saveRollResult, setSaveRollResult] = useState('0');

  const classes = useStyles();

  const handleSaveAugChange = (event, value) => {
    if (event.target.checked) {
      setTargetUnitSaveAug(targetUnitSaveAug + value);
    } else {
      setTargetUnitSaveAug(targetUnitSaveAug - value);
    }
  };

  const rollToSave = () => {
    const tuSaveAug = (targetUnitSaveAug || 0);
    let rolled = rollResult ? Number(rollResult) : null;

    if (playerUnit && usingGrenade) {
      rolled = 11;
    }
    if (playerUnit && playerUnit.name === "Bazooka" && !usingSideArm) {
      rolled = 12;
    }
    if (playerUnit && playerUnit.name === "Mortar" && !usingSideArm) {
      rolled = 13;
    }
    if (
      (
        (
          rollResult
          && tuSaveAug + Number(rollResult) <= 20
          && rollResult >= rollToHit
          && !isCriticalHit
        )
        || usingMortarMechanics
      )
      && rollResult > 1) {
      return (
        <div style={{borderBottom:'solid'}}>
          {saved ? <h3 style={{ display: 'flex', justifyContent: "center" }}>{saved}</h3> : null}
          <h3 style={{ display: 'flex', justifyContent: "center" }}>
            Roll of {rolled + targetUnitSaveAug}+ required to save.
          </h3>
        </div>
      )
    } else if (((rollResult
      && ((targetUnitSaveAug || 0) + Number(rollResult) >= 20 || isCriticalHit)) || usingMortarMechanics) && rollResult > 1) {
      return <h3 style={{ display: 'flex', justifyContent: "center", borderBottom:'solid' }}>
        {isCriticalHit ? 'Critical: ' : ''}Unable to Save.
      </h3>
    }
  };

  useEffect(() => {
    setSaveRollResult('0');
    setSaved('');
    setCanRollToSave(true);
  }, [playerUnit, targetUnit, rollResult]);

  return (
    <div className="fade-in" style={{ transition: '1s', width: '38.5vw', display: 'flex', flexDirection: 'column', borderLeft: 'solid', borderRight: 'solid' }}>
      <h2 style={{ textDecoration: 'underline', display: 'flex', justifyContent: "center" }}>Target: {targetUnit}</h2>
      <div className="row">
        <span className="info-point">Inherant Save Requirement Augmentation: </span>
        <span> {unitStats[targetUnit]["Save Requirement"] || 0}</span>
      </div>
      {playerUnit && (playerUnit["Explosive Baseline Save Requirement"] || usingGrenade) && !usingSideArm ? <div className="row">
        <span className="info-point">Explosive Baseline Save Requirement: </span>
        <span> {playerUnit["Explosive Baseline Save Requirement"] || playerUnit["Grenade OSR"]}</span>
      </div>
        : null}
      {targetUnit !== 'Captain'
        ? <div className="row">
          <span className="info-point">{`Template #3: Within 'Call to Arms' radius of Captain:`}</span>
          <Checkbox className={classes.unitSelect} onChange={(event) => {
            handleSaveAugChange(event, -2);
            event.target.checked ? setIsNearCaptain(true) : setIsNearCaptain(false);
          }} checked={isNearCaptain} />
        </div>
        : null}
      {targetUnit !== 'Sergeant'
        ? <div className="row">
          <span className="info-point">{`Template #2: Within 'Rally' radius of Sergeant:`}</span>
          <Checkbox className={classes.unitSelect} onChange={(event) => {
            handleSaveAugChange(event, -1);
            event.target.checked ? setIsNearSergeant(true) : setIsNearSergeant(false);
          }} checked={isNearSergeant} />
        </div>
        : null}
      <div className="row">
        <span className="info-point" >Total Save Requirement Augmentation: </span>
        <span> {(targetUnitSaveAug ? targetUnitSaveAug : 0)}</span>
      </div>
      {((rollResult
        && (targetUnitSaveAug || 0) + Number(rollResult) <= 20
        && rollResult >= rollToHit
        && !isCriticalHit) || usingMortarMechanics) && rollResult > 1
        ? <div className="row" style={{ justifyContent: 'center' }}>
          {canRollToSave ? <input type="Button" value="Roll To Save" onClick={() => {
            setCanRollToSave(false);
            const roll = Math.ceil(Math.random() * 20);
            setSaved(roll >= Number(rollResult) + targetUnitSaveAug ? `Rolled ${roll}:  Save Successful.` : `Rolled ${roll}: Save Failed.`);
            setTimeout(() => {
              setCanRollToSave(true);
              console.log('boom.')
            }, 5000);
          }}
          /> : <div>&#10710;</div>}
        </div>
        : null}
      {rollToSave()}
    </div>
  );
};

export default TargetUnitView;
import React, { useState, useEffect } from 'react';
import unitStats from './unitStats.jsx';

const TargetUnitView = ({ targetUnit, playerUnit, targetUnitSaveAug, setTargetUnitSaveAug, isNearCaptain, isNearSergeant, setIsNearCaptain, setIsNearSergeant, offSaveReq, rollResult, rollToHit, usingMortarMechanics, usingGrenade, isCriticalHit, rollToHitAug }) => {
  const [canRollToSave, setCanRollToSave] = useState(true);
  const [saved, setSaved] = useState('');
  const [saveRollResult, setSaveRollResult] = useState('0');

  const handleSaveAugChange = (event, value) => {
    if (event.target.checked) {
      setTargetUnitSaveAug(targetUnitSaveAug + value);
    } else {
      setTargetUnitSaveAug(targetUnitSaveAug - value);
    }
  };


  const rollToSave = () => {
    if (((rollResult
      && (targetUnitSaveAug || 0) + offSaveReq + Number(rollResult) <= 20
      && rollResult >= rollToHit
      && !isCriticalHit) || usingMortarMechanics) && rollResult > 1) {
      return <h3 style={{ display: 'flex', justifyContent: "center" }}>
        Roll of {Number(rollResult) + targetUnitSaveAug + offSaveReq}+ required to save.
      </h3>
    } else if (((rollResult
      && ((targetUnitSaveAug || 0) + offSaveReq + Number(rollResult) >= 20 || isCriticalHit)) || usingMortarMechanics) && rollResult > 1) {
      return <h3 style={{ display: 'flex', justifyContent: "center" }}>
        {isCriticalHit ? 'Critical: ' : ''}Unable to Save.
      </h3>
    }
  };

  useEffect(() => {
    setSaveRollResult('0');
    setSaved('');
  }, [playerUnit, targetUnit, rollResult, rollToHit, targetUnitSaveAug, rollToHitAug]);

  return (
    <div>
      <h2 style={{ textDecoration: 'underline', display: 'flex', justifyContent: "center" }}>{targetUnit}</h2>
      <div className="row">
        <span className="info-point">Inherant Save Requirement Augmentation: </span>
        <span> {unitStats[targetUnit]["Save Requirement"] || 0}</span>
      </div>
      {playerUnit ? playerUnit["Offensive Save Requirement"] || usingGrenade ? <div className="row">
        <span className="info-point">Attacker's Offensive Save Requirement Augmentation: </span>
        <span> {playerUnit["Offensive Save Requirement"] || playerUnit["Grenade OSR"]}</span>
      </div>
        : null : null}
      {targetUnit !== 'Captain'
        ? <div className="row">
          <span className="info-point">{`Template #3: Within 'Call to Arms' radius of Captain:`}</span>
          <input type="checkbox" onChange={(event) => {
            handleSaveAugChange(event, -2);
            event.target.checked ? setIsNearCaptain(true) : setIsNearCaptain(false);
          }} checked={isNearCaptain} />
        </div>
        : null}
      {targetUnit !== 'Sergeant'
        ? <div className="row">
          <span className="info-point">{`Template #2: Within 'Rally' radius of Sergeant:`}</span>
          <input type="checkbox" onChange={(event) => {
            handleSaveAugChange(event, -1);
            event.target.checked ? setIsNearSergeant(true) : setIsNearSergeant(false);
          }} checked={isNearSergeant} />
        </div>
        : null}
      <div className="row">
        <span className="info-point" >Total Save Requirement Augmentation: </span>
        <span> {(targetUnitSaveAug ? targetUnitSaveAug : 0) + offSaveReq}</span>
      </div>
      {((rollResult
        && (targetUnitSaveAug || 0) + offSaveReq + Number(rollResult) <= 20
        && rollResult >= rollToHit
        && !isCriticalHit) || usingMortarMechanics) && rollResult > 1
        ? <div className="row">
          {canRollToSave ? <input type="Button" value="Roll To Save" onClick={() => {
            setCanRollToSave(false);
            const roll = Math.ceil(Math.random() * 20);
            setSaved(roll >= Number(rollResult) + targetUnitSaveAug + offSaveReq ? `${roll}: Save Successful` : `${roll}: Save Failed`);
            setTimeout(() => {
              setCanRollToSave(true);
            }, 5000);
          }}
          /> : <div>⏳</div>}
          <span>{saved}</span>
        </div>
        : null}
      {rollToSave()}
    </div>
  );
};

export default TargetUnitView;
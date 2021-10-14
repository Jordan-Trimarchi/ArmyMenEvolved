import React, { useContext, useEffect, useState } from 'react';
import Context from '../context';

const RollToSave = () => {
  const {
    targetUnitSaveAug,
    rollResult,
    playerUnit,
    targetUnit,
    usingGrenade,
    usingSideArm,
    rollToHit,
    isCriticalHit,
    usingMortarMechanics,
  } = useContext(Context);

  const [saved, setSaved] = useState('');
  const [canRollToSave, setCanRollToSave] = useState(true);

  const unitName = playerUnit ? playerUnit.name : null;
  let saveReq = (rollResult + targetUnitSaveAug);

  if ((unitName === 'Bazooka' && !usingSideArm) || usingGrenade) { saveReq = 12 + targetUnitSaveAug; }
  if (unitName === 'Mortar' && !usingSideArm) { saveReq = 13 + targetUnitSaveAug; }
  if (saveReq < 1) { saveReq = 1; }

  useEffect(() => {
    setSaved('');
    setCanRollToSave(true);
  }, [playerUnit, targetUnit, rollResult]);

  const handleRollToSaveClick = () => {
    const roll = Math.ceil(Math.random() * 20);
    const saveSucceeded = roll >= saveReq;
    const successText = `Rolled ${roll}:  Save Successful.`;
    const failureText = `Rolled ${roll}: Save Failed.`;

    setSaved(saveSucceeded ? successText : failureText);
    setCanRollToSave(false);

    setTimeout(() => {
      setCanRollToSave(true);
    }, 5000);
  };

  return (
    <>
      {!isCriticalHit && (rollResult >= rollToHit || usingMortarMechanics) && rollResult
        ? (
          <>
            <div className="row" style={{ justifyContent: 'center' }}>
              {canRollToSave
                ? <input type="Button" value="Roll To Save" onClick={handleRollToSaveClick} />
                : <div>&#10710;</div>}
            </div>

            <div style={{ borderBottom: 'solid' }}>
              {saved ? <h3 style={{ display: 'flex', justifyContent: 'center' }}>{saved}</h3> : null}
              <h3 style={{ display: 'flex', justifyContent: 'center' }}>
                {`Roll of ${saveReq}+ required to save.`}
              </h3>
            </div>
          </>
        )
        : null}

      {isCriticalHit
        ? (
          <div style={{ borderBottom: 'solid' }}>
            <h3 style={{ display: 'flex', justifyContent: 'center' }}>
              Critical Hit: Unable to Save.
            </h3>
          </div>
        )
        : null}
    </>
  );
};

export default RollToSave;

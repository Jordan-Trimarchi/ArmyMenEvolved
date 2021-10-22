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
    setIsDead,
  } = useContext(Context);

  const [saved, setSaved] = useState('');
  const [canRollToSave, setCanRollToSave] = useState(true);

  const unitName = playerUnit ? playerUnit.name : null;
  const isExplosive = playerUnit.name === 'Bazooka' || playerUnit.name === 'Flamer' || playerUnit.name === 'Mortar';
  let saveReq = (Number(rollResult) + targetUnitSaveAug);

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

    setSaved(saveSucceeded && rollResult < 20 ? successText : failureText);
    setCanRollToSave(false);
    setIsDead(!saveSucceeded);

    setTimeout(() => {
      setCanRollToSave(true);
    }, 5000);
  };

  return (
    <>
      {(rollResult >= rollToHit || usingMortarMechanics) && rollResult < 20 && rollResult > 1
        ? (
          <>
            <div className="row" style={{ justifyContent: 'center' }}>
              {canRollToSave
                ? <input type="Button" value="Roll To Save" onClick={handleRollToSaveClick} />
                : <div>&#10710;</div>}
            </div>

            <div style={{ borderBottom: 'solid' }}>
              {saved ? <h3>{saved}</h3> : null}
              <h3>
                {`Roll of ${saveReq}+ required to save${rollResult >= rollToHit ? '' : ' if hit'}.`}
              </h3>
            </div>
          </>
        )
        : null}

      {isCriticalHit
        ? (
          <div style={{ borderBottom: 'solid' }}>
            <h3>
              {`Critical Hit: ${isExplosive ? 'Boom.' : 'Unable to Save.'}`}
            </h3>
          </div>
        )
        : null}

      {rollResult > 20
        ? (
          <div style={{ borderBottom: 'solid' }}>
            <h3>
              These dice are rigged.
            </h3>
          </div>
        )
        : null}
    </>
  );
};

export default RollToSave;

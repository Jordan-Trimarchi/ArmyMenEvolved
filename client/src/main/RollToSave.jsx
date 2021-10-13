import React from 'react';

const RollToSave = ({
  targetUnitSaveAug,
  rollResult,
  playerUnit,
  usingGrenade,
  usingSideArm,
  rollToHit,
  isCriticalHit,
  usingMortarMechanics,
  saved,
}) => {
  const TUSaveAug = (targetUnitSaveAug || 0);
  let rolled = rollResult ? Number(rollResult) : null;

  if (playerUnit && usingGrenade) {
    rolled = 11;
  }
  if (playerUnit && playerUnit.name === 'Bazooka' && !usingSideArm) {
    rolled = 12;
  }
  if (playerUnit && playerUnit.name === 'Mortar' && !usingSideArm) {
    rolled = 13;
  }

  return (
    <>
      {
        ((rollResult
          && TUSaveAug + Number(rollResult) <= 20
          && rollResult >= rollToHit
          && !isCriticalHit)
          || usingMortarMechanics)
          && rollResult > 1
          ? (
            <div style={{ borderBottom: 'solid' }}>
              {saved ? <h3 style={{ display: 'flex', justifyContent: 'center' }}>{saved}</h3> : null}
              <h3 style={{ display: 'flex', justifyContent: 'center' }}>
                Roll of
                {' '}
                {rolled + targetUnitSaveAug}
                + required to save.
              </h3>
            </div>
          )
          : null
      }

      {
        ((rollResult
          && ((targetUnitSaveAug
            || 0) + Number(rollResult) >= 20
            || isCriticalHit))
          || usingMortarMechanics)
          && rollResult > 1
          ? (
            <h3 style={{ display: 'flex', justifyContent: 'center', borderBottom: 'solid' }}>
              {isCriticalHit ? 'Critical: ' : ''}
              Unable to Save.
            </h3>
          ) : null
      }
    </>
  );
};

export default RollToSave;

import React, { useContext, useState } from 'react';
import Context from '../context';
import RollToSave from './RollToSave';
import TargetUnitRows from './TargetUnitRows';

const TargetUnitView = () => {
  const [isBehindDestBarrier, setIsBehindDestBarrier] = useState(false);
  const {
    targetUnit,
    playerUnit,
    targetUnitSaveAug,
    setTargetUnitSaveAug,
    isNearCaptain,
    isNearSergeant,
    setIsNearCaptain,
    setIsNearSergeant,
    rollResult,
    rollToHit,
    usingMortarMechanics,
    usingGrenade,
    isCriticalHit,
    usingSideArm,
  } = useContext(Context);

  const handleSaveAugChange = (event, value) => {
    if (event.target.checked) {
      setTargetUnitSaveAug(targetUnitSaveAug + value);
    } else {
      setTargetUnitSaveAug(targetUnitSaveAug - value);
    }
  };

  return (
    <div
      className="fade-in"
      style={{
        transition: '1s', width: '38.5vw', display: 'flex', flexDirection: 'column', borderLeft: 'solid', borderRight: 'solid',
      }}
    >
      <h2 style={{ textDecoration: 'underline', display: 'flex', justifyContent: 'center' }}>
        {`Target: ${targetUnit.name}`}
      </h2>
      <TargetUnitRows
        targetUnit={targetUnit}
        playerUnit={playerUnit}
        targetUnitSaveAug={targetUnitSaveAug}
        usingGrenade={usingGrenade}
        usingSideArm={usingSideArm}
        handleSaveAugChange={handleSaveAugChange}
        isBehindDestBarrier={isBehindDestBarrier}
        setIsBehindDestBarrier={setIsBehindDestBarrier}
        isNearCaptain={isNearCaptain}
        setIsNearCaptain={setIsNearCaptain}
        isNearSergeant={isNearSergeant}
        setIsNearSergeant={setIsNearSergeant}
      />
      <RollToSave
        targetUnitSaveAug={targetUnitSaveAug}
        rollResult={rollResult}
        playerUnit={playerUnit}
        usingGrenade={usingGrenade}
        usingSideArm={usingSideArm}
        rollToHit={rollToHit}
        isCriticalHit={isCriticalHit}
        usingMortarMechanics={usingMortarMechanics}
        targetUnit={targetUnit}
      />
    </div>
  );
};

export default TargetUnitView;

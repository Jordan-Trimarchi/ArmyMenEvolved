import React, { useEffect, useState } from 'react';
import UnitSelectors from './UnitSelectors';
import TargetUnitView from './TargetUnitView';
import PlayerUnitView from './PlayerUnitView';
import Context from '../context';

const Combat = () => {
  const [playerUnit, setPlayerUnit] = useState(null);
  const [targetUnit, setTargetUnit] = useState(null);
  const [targetUnitSaveAug, setTargetUnitSaveAug] = useState(0);
  const [rollToHitAug, setRollToHitAug] = useState(0);
  const [isInPartialCover, setIsInPartialCover] = useState(false);
  const [isNearCaptain, setIsNearCaptain] = useState(false);
  const [isNearSergeant, setIsNearSergeant] = useState(false);
  const [rollToHit, setRollToHit] = useState('');
  const [distance, setDistance] = useState('');
  const [elevation, setElevation] = useState('');
  const [currentITR, setCurrentITR] = useState(null);
  const [rollResult, setRollResult] = useState('');
  const [usingMortarMechanics, setUsingMortarMechanics] = useState(false);
  const [usingGrenade, setUsingGrenade] = useState(false);
  const [isCriticalHit, setIsCriticalHit] = useState(false);
  const [usingSideArm, setUsingSideArm] = useState(false);

  const isBazooka = playerUnit && playerUnit.name === 'Bazooka';

  const handleRollToHitAugChange = (event, value) => {
    if (event.target.checked) {
      setRollToHitAug(rollToHitAug + value);
    } else {
      setRollToHitAug(rollToHitAug - value);
    }
  };

  const handleRollToHitCalc = () => {
    if (distance) {
      setRollToHit(Math.round((distance * currentITR) - (elevation / 3)) + rollToHitAug);
    }
  };

  useEffect(() => {
    setIsNearCaptain(false);
    setIsNearSergeant(false);
    setIsInPartialCover(false);
    if (targetUnit) { setTargetUnitSaveAug(targetUnit['Save Requirement'] ? targetUnit['Save Requirement'] : 0); }
  }, [targetUnit]);

  useEffect(() => {
    handleRollToHitCalc();
    if (isBazooka && targetUnit === 'barrier-vehicle') {
      setCurrentITR(playerUnit['Inches To Roll vs Vehicle/Structure']);
    } else if (isBazooka) {
      setCurrentITR(playerUnit['Inches To Roll vs Infantry']);
    }
  }, [distance, rollToHitAug, playerUnit, targetUnit, elevation, currentITR]);

  return (
    <Context.Provider value={{
      currentITR,
      distance,
      elevation,
      isCriticalHit,
      isInPartialCover,
      isNearCaptain,
      isNearSergeant,
      playerUnit,
      rollResult,
      rollToHit,
      rollToHitAug,
      targetUnit,
      targetUnitSaveAug,
      usingGrenade,
      usingMortarMechanics,
      usingSideArm,
      handleRollToHitAugChange,
      setCurrentITR,
      setDistance,
      setElevation,
      setIsCriticalHit,
      setIsInPartialCover,
      setIsNearCaptain,
      setIsNearSergeant,
      setPlayerUnit,
      setRollResult,
      setRollToHit,
      setRollToHitAug,
      setTargetUnit,
      setTargetUnitSaveAug,
      setUsingGrenade,
      setUsingMortarMechanics,
      setUsingSideArm,
    }}
    >
      <UnitSelectors />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        {playerUnit ? (<PlayerUnitView />) : null}
        {targetUnit ? <TargetUnitView /> : null}
      </div>
    </Context.Provider>
  );
};

export default Combat;

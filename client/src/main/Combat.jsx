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
  const [unitIsNearCaptain, setUnitIsNearCaptain] = useState(false);
  const [unitIsNearSergeant, setUnitIsNearSergeant] = useState(false);
  const [targetIsNearCaptain, setTargetIsNearCaptain] = useState(false);
  const [targetIsNearSergeant, setTargetIsNearSergeant] = useState(false);
  const [rollToHit, setRollToHit] = useState('');
  const [distance, setDistance] = useState('');
  const [elevation, setElevation] = useState('');
  const [currentITR, setCurrentITR] = useState(null);
  const [rollResult, setRollResult] = useState('');
  const [usingMortarMechanics, setUsingMortarMechanics] = useState(false);
  const [usingGrenade, setUsingGrenade] = useState(false);
  const [isCriticalHit, setIsCriticalHit] = useState(false);
  const [usingSideArm, setUsingSideArm] = useState(false);
  const [spotted, setSpotted] = useState(false);
  const [isInRecon, setIsInRecon] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSnipey, setIsSnipey] = useState(false);
  const [checkFallView, setCheckFallView] = useState(false);
  const [isDead, setIsDead] = useState(false);

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
    setUnitIsNearCaptain(false);
    setUnitIsNearSergeant(false);
    setTargetIsNearCaptain(false);
    setTargetIsNearSergeant(false);
    setIsInPartialCover(false);
    if (targetUnit) { setTargetUnitSaveAug(targetUnit['Save Requirement'] ? targetUnit['Save Requirement'] : 0); }
  }, [targetUnit]);

  useEffect(() => {
    handleRollToHitCalc();
    setIsDead(false);
    if (isBazooka && targetUnit === 'barrier' && !usingSideArm) {
      setCurrentITR(playerUnit['Inches To Roll vs Vehicle/Structure']);
    } else if (isBazooka) {
      setCurrentITR(playerUnit['Inches To Roll vs Infantry']);
    }
  }, [distance, rollToHitAug, playerUnit, targetUnit, elevation, currentITR, usingSideArm]);

  useEffect(() => {
    setCheckFallView(!usingMortarMechanics);
  }, [usingMortarMechanics]);

  return (
    <Context.Provider value={{
      checkFallView,
      currentITR,
      distance,
      elevation,
      isCriticalHit,
      isDead,
      isInPartialCover,
      isInRecon,
      isMounted,
      unitIsNearCaptain,
      unitIsNearSergeant,
      targetIsNearCaptain,
      targetIsNearSergeant,
      isSnipey,
      playerUnit,
      rollResult,
      rollToHit,
      rollToHitAug,
      spotted,
      targetUnit,
      targetUnitSaveAug,
      usingGrenade,
      usingMortarMechanics,
      usingSideArm,
      handleRollToHitAugChange,
      setCheckFallView,
      setCurrentITR,
      setDistance,
      setElevation,
      setIsCriticalHit,
      setIsDead,
      setIsInPartialCover,
      setIsInRecon,
      setUnitIsNearCaptain,
      setUnitIsNearSergeant,
      setTargetIsNearCaptain,
      setTargetIsNearSergeant,
      setIsMounted,
      setIsSnipey,
      setPlayerUnit,
      setRollResult,
      setRollToHit,
      setRollToHitAug,
      setSpotted,
      setTargetUnit,
      setTargetUnitSaveAug,
      setUsingGrenade,
      setUsingMortarMechanics,
      setUsingSideArm,
    }}
    >
      <UnitSelectors />
      <div className="split-view-container">
        {playerUnit ? (<PlayerUnitView />) : <div> </div>}
        {targetUnit ? <TargetUnitView /> : null}
      </div>
    </Context.Provider>
  );
};

export default Combat;

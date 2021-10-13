import React, { useEffect, useState } from 'react';
import unitStats from './unitStats';
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
    if (targetUnit) {
      setTargetUnitSaveAug(targetUnit['Save Requirement'] ? targetUnit['Save Requirement'] : 0);
    }
  }, [targetUnit]);

  useEffect(() => {
    handleRollToHitCalc();
    if (playerUnit && playerUnit.name === 'Bazooka' && targetUnit === 'barrier-vehicle') {
      setCurrentITR(playerUnit['Inches To Roll vs Vehicle/Structure']);
    } else if (playerUnit && playerUnit.name === 'Bazooka' && targetUnit !== 'barrier-vehicle') {
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
      setRollResult,
      setRollToHit,
      setRollToHitAug,
      setTargetUnitSaveAug,
      setUsingGrenade,
      setUsingMortarMechanics,
      setUsingSideArm,
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-around', borderBottom: 'solid' }}>
        <select
          onChange={(event) => {
            setPlayerUnit(unitStats[event.target.value]);
            setCurrentITR(
              (unitStats[event.target.value]['Inches To Roll']
                || unitStats[event.target.value]['Mortar Inches To Roll']
              )
              || unitStats[event.target.value]['Sidearm Inches To Roll'],
            );
          }}
          name="Unit"
        >
          <option value="">--Select Unit--</option>
          {Object.keys(unitStats).map((unit) => <option value={unit} key={unit}>{unit}</option>)}
        </select>
        <select
          onChange={(event) => {
            setTargetUnit(unitStats[event.target.value] || event.target.value);
          }}
          name="Target"
        >
          <option value="">--Select Target--</option>
          {playerUnit && playerUnit.name === 'Bazooka' ? <option value="barrier-vehicle">Barrier / Vehicle</option> : null}
          {Object.keys(unitStats).map((unit) => <option value={unit} key={unit}>{unit}</option>)}
          <option value="ground">The Ground</option>
        </select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div>
          {playerUnit
            ? (
              <PlayerUnitView />
            )
            : null}
        </div>
        <div>
          {targetUnit && targetUnit !== 'barrier-vehicle' && targetUnit !== 'ground'
            ? (
              <TargetUnitView />
            )
            : null}
          {targetUnit === 'barrier-vehicle'
            ? (
              <div style={{
                transition: '1s', width: '38.5vw', display: 'flex', flexDirection: 'column', borderRight: 'solid', borderLeft: 'solid', borderBottom: 'solid',
              }}
              >
                <h2 style={{ textDecoration: 'underline', display: 'flex', justifyContent: 'center' }}>Barrier / Vehicle</h2>
                <div className="row">
                  <span className="info-point">Suggested Tactics:</span>
                  <span> Obliterate It. </span>
                </div>
              </div>
            )
            : null}
          {targetUnit === 'ground'
            ? (
              <div style={{
                transition: '1s', width: '38.5vw', display: 'flex', flexDirection: 'column', borderRight: 'solid', borderLeft: 'solid', borderBottom: 'solid',
              }}
              >
                <h2 style={{ textDecoration: 'underline', display: 'flex', justifyContent: 'center' }}>The Ground</h2>
                <h3 style={{ display: 'flex', justifyContent: 'center' }}>{'It\'s not the fall that kills you, it\'s the sudden stop at the end.'}</h3>
              </div>
            ) : null}
        </div>
      </div>
    </Context.Provider>
  );
};

export default Combat;

import React, { useEffect, useState } from 'react';
import unitStats from './unitStats.jsx';
import TargetUnitView from './TargetUnitView.jsx';
import PlayerUnitView from './PlayerUnitView.jsx';


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
  const [offSaveReq, setOffSaveReq] = useState(0);
  const [usingMortarMechanics, setUsingMortarMechanics] = useState(false);
  const [usingGrenade, setUsingGrenade] = useState(false);
  const [isCriticalHit, setIsCriticalHit] = useState(false);

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
    setTargetUnitSaveAug(unitStats[targetUnit] ? unitStats[targetUnit]["Save Requirement"] ? unitStats[targetUnit]["Save Requirement"] : 0 : 0);
  }, [targetUnit]);

  useEffect(() => {
    if (playerUnit && playerUnit["Offensive Save Requirement"]) {
      setOffSaveReq(playerUnit["Offensive Save Requirement"]);
    } else {
      setOffSaveReq(0);
    }
    setRollResult('');
  }, [playerUnit]);

  useEffect(() => {
    handleRollToHitCalc();
    if (playerUnit && playerUnit.name === 'Bazooka' && targetUnit === 'barrier-vehicle') {
      setCurrentITR(playerUnit['Inches To Roll vs Vehicle/Structure']);
    } else if (playerUnit && playerUnit.name === 'Bazooka' && targetUnit !== 'barrier-vehicle') {
      setCurrentITR(playerUnit['Inches To Roll vs Infantry']);
    }
  }, [distance, rollToHitAug, playerUnit, targetUnit, elevation, currentITR]);



  return (
    <>
      <div style={{ display: 'flex', justifyContent: "space-around", borderBottom: "solid" }}>
        <select onChange={(event) => {
          setPlayerUnit(unitStats[event.target.value]);
          setCurrentITR(
            (unitStats[event.target.value]["Inches To Roll"]
              || unitStats[event.target.value]["Mortar Inches To Roll"]
            )
            || unitStats[event.target.value]["Sidearm Inches To Roll"]
          );
        }} name="Unit">
          <option value="">--Select Unit--</option>
          {Object.keys(unitStats).map((unit) => {
            return <option value={unit} key={unit}>{unit}</option>
          })}
        </select>
        <select onChange={(event) => {
          setTargetUnit(event.target.value);
        }} name="Target">
          <option value="">--Select Target--</option>
          {playerUnit && playerUnit.name === 'Bazooka' ? <option value="barrier-vehicle">Barrier / Vehicle</option> : null}
          {Object.keys(unitStats).map((unit) => {
            return <option value={unit} key={unit}>{unit}</option>
          })}
        </select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div>
          {playerUnit ?
            <PlayerUnitView
              playerUnit={playerUnit}
              targetUnit={targetUnit}
              rollToHit={rollToHit}
              setRollToHit={setRollToHit}
              setRollToHitAug={setRollToHitAug}
              elevation={elevation}
              setElevation={setElevation}
              distance={distance}
              setDistance={setDistance}
              isInPartialCover={isInPartialCover}
              setIsInPartialCover={setIsInPartialCover}
              handleRollToHitAugChange={handleRollToHitAugChange}
              currentITR={currentITR}
              setCurrentITR={setCurrentITR}
              rollResult={rollResult}
              setRollResult={setRollResult}
              setOffSaveReq={setOffSaveReq}
              usingMortarMechanics={usingMortarMechanics}
              setUsingMortarMechanics={setUsingMortarMechanics}
              usingGrenade={usingGrenade}
              setUsingGrenade={setUsingGrenade}
              isCriticalHit={isCriticalHit}
              setIsCriticalHit={setIsCriticalHit}
            />
            : null}
        </div>
        <div>
          {targetUnit && targetUnit !== 'barrier-vehicle'
            ?
            <TargetUnitView
              targetUnit={targetUnit}
              playerUnit={playerUnit}
              targetUnitSaveAug={targetUnitSaveAug}
              setTargetUnitSaveAug={setTargetUnitSaveAug}
              handleRollToHitAugChange={handleRollToHitAugChange}
              isNearCaptain={isNearCaptain}
              isNearSergeant={isNearSergeant}
              setIsNearCaptain={setIsNearCaptain}
              setIsNearSergeant={setIsNearSergeant}
              rollResult={rollResult}
              rollToHit={rollToHit}
              offSaveReq={offSaveReq}
              usingMortarMechanics={usingMortarMechanics}
              usingGrenade={usingGrenade}
              isCriticalHit={isCriticalHit}
              rollToHitAug={rollToHitAug}
            />
            : targetUnit === 'barrier-vehicle'
              ?
              <div style={{ transition: '1s', width: '38.5vw', display: 'flex', flexDirection: 'column', borderRight: 'solid', borderLeft: 'solid', borderBottom: 'solid' }}>
                <h2 style={{ textDecoration: 'underline', display: 'flex', justifyContent: "center" }}>Barrier / Vehicle</h2>
                <div className="row">
                  <span className="info-point">Suggested Tactics:</span>
                  <span> Obliterate It. </span>
                </div>
              </div>
              : null}
        </div>
      </div>
    </>
  )

};

export default Combat;

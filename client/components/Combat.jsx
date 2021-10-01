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
  const [distance, setDistance] = useState(0);
  const [elevation, setElevation] = useState('0');
  const [currentITR, setCurrentITR] = useState(null);
  const [rollResult, setRollResult] = useState(0);
  const [offSaveReq, SetOffSaveReq] = useState(0);

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
      SetOffSaveReq(playerUnit["Offensive Save Requirement"]);
    } else {
      SetOffSaveReq(0);
    }
    setRollResult(0);
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
          <option value="">--Select your unit--</option>
          {Object.keys(unitStats).map((unit) => {
            return <option value={unit} key={unit}>{unit}</option>
          })}
        </select>
        <select onChange={(event) => {
          setTargetUnit(event.target.value);
        }} name="Target">
          <option value="">--Select your target--</option>
          {playerUnit && playerUnit.name === 'Bazooka' ? <option value="barrier-vehicle">Barrier / Vehicle</option> : null}
          {Object.keys(unitStats).map((unit) => {
            return <option value={unit} key={unit}>{unit}</option>
          })}
        </select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '50vw', display: 'flex', flexDirection: 'column', borderRight: 'solid' }}>
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
            />
            : null}
        </div>
        <div style={{ width: '49vw', marginLeft: '1vw', display: 'flex', flexDirection: 'column', borderLeft: 'solid' }}>
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
            />
            : targetUnit === 'barrier-vehicle'
              ?
              <div>
                <h2 style={{ display: 'flex', justifyContent: "center" }}>Barrier / Vehicle</h2>
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

import React, { useEffect, useState } from 'react';
import unitStats from './unitStats.jsx';

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



  const handleSaveAugChange = (event, value) => {
    if (event.target.checked) {
      setTargetUnitSaveAug(targetUnitSaveAug + value);
    } else {
      setTargetUnitSaveAug(targetUnitSaveAug - value);
    }
  };
  const handleRollToHitAugChange = (event, value) => {
    if (event.target.checked) {
      setRollToHitAug(rollToHitAug + value);
    } else {
      setRollToHitAug(rollToHitAug - value);
    }
  };

  const handleRollToHitCalc = () => {
    if (distance) {
      console.log(distance, unitStats[playerUnit]['Inches To Roll']);
      setRollToHit(Math.round(distance * unitStats[playerUnit]['Inches To Roll']) + rollToHitAug);
    }
  };

  useEffect(() => {
    setIsNearCaptain(false);
    setIsNearSergeant(false);
    setIsInPartialCover(false);
  }, [targetUnit]);

  useEffect(() => {
    handleRollToHitCalc();
  }, [distance, rollToHitAug, playerUnit, targetUnit]);



  return (
    <>
      <select onChange={(event) => { setPlayerUnit(event.target.value); }} name="Unit">
        <option value="">--Select your unit--</option>
        {Object.keys(unitStats).map((unit) => {
          return <option value={unit} key={unit}>{unit}</option>
        })}
      </select>
      <select onChange={(event) => {
        setTargetUnit(event.target.value);
        setTargetUnitSaveAug(unitStats[event.target.value]["Save Requirement"] || 0);
      }} name="Target">
        <option value="">--Select your target--</option>
        {Object.keys(unitStats).map((unit) => {
          return <option value={unit} key={unit}>{unit}</option>
        })}
      </select>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '50vw', display: 'flex', flexDirection: 'column', borderRight: 'solid' }}>
          {playerUnit ?
            <div>
              <h3>Player Unit: {playerUnit}</h3>
              {Object.keys(unitStats[playerUnit]).map((item) => {
                return <div style={{ borderBottom: 'solid' }}>
                  <span className="info-point">{item}: </span>
                  <span>{unitStats[playerUnit][item]} </span>
                </div>
              })}
              {playerUnit && targetUnit ?
                <div>
                  <input onChange={(event) => {
                    setDistance(event.target.value);
                  }} type="number" step=".0625" placeholder='Inches' min="0" style={{ width: '5em' }} />
                  {
                    rollToHit > 20.5
                      ? <div>Unable to hit.</div>
                      : rollToHit
                        ? <div>Roll of {rollToHit} required to hit.</div>
                        : null
                  }
                  {targetUnit !== 'Captain' ? <div>
                    <span style={{ borderBottom: 'solid' }} className="info-point">{`Within 'Call to Arms' radius (Template #3) of Captain:`}</span>
                    <input type="checkbox" onChange={(event) => {
                      handleRollToHitAugChange(event, -2);
                      event.target.checked ? setIsNearCaptain(true) : setIsNearCaptain(false);
                    }} checked={isNearCaptain} />
                  </div> : null}
                  {targetUnit !== 'Sergeant' ? <div>
                    <span style={{ borderBottom: 'solid' }} className="info-point">{`Within 'Rally' radius (Template #2) of Sergeant:`}</span>
                    <input type="checkbox" onChange={(event) => {
                      handleRollToHitAugChange(event, -1);
                      event.target.checked ? setIsNearSergeant(true) : setIsNearSergeant(false);
                    }} checked={isNearSergeant} />
                  </div> : null}
                </div>
                : null}
            </div>
            : null}
        </div>
        <div style={{ width: '49vw', marginLeft: '1vw', display: 'flex', flexDirection: 'column', borderLeft: 'solid' }}>
          {targetUnit
            ?
            <div>
              <h3>Target Unit: {targetUnit}</h3>
              <span style={{ borderBottom: 'solid' }} className="info-point">Inherant Save Requirement Augmentation: </span>
              <span> {unitStats[targetUnit]["Save Requirement"] || 0}</span>
              <div>
                <span style={{ borderBottom: 'solid' }} className="info-point">In partial cover:</span>
                <input type="checkbox" onChange={(event) => {
                  handleRollToHitAugChange(event, 3);
                  event.target.checked ? setIsInPartialCover(true) : setIsInPartialCover(false);
                }} checked={isInPartialCover} />
              </div>
              {targetUnit !== 'Captain' ? <div>
                <span style={{ borderBottom: 'solid' }} className="info-point">{`Within 'Call to Arms' radius (Template #3) of Captain:`}</span>
                <input type="checkbox" onChange={(event) => {
                  handleSaveAugChange(event, -2);
                  event.target.checked ? setIsNearCaptain(true) : setIsNearCaptain(false);
                }} checked={isNearCaptain} />
              </div> : null}
              {targetUnit !== 'Sergeant' ? <div>
                <span style={{ borderBottom: 'solid' }} className="info-point">{`Within 'Rally' radius (Template #2) of Sergeant:`}</span>
                <input type="checkbox" onChange={(event) => {
                  handleSaveAugChange(event, -1);
                  event.target.checked ? setIsNearSergeant(true) : setIsNearSergeant(false);
                }} checked={isNearSergeant} />
              </div> : null}
              <span className="info-point" style={{ borderBottom: 'solid' }}>Total Save Requirement Augmentation: </span>
              <span> {targetUnitSaveAug || 0}</span>
            </div>
            : null}
        </div>
      </div>
    </>
  )

};

export default Combat;

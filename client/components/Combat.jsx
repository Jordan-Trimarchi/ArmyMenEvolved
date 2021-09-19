import React, { useState } from 'react';
import unitStats from './unitStats.jsx';

const Combat = () => {
  const [playerUnit, setPlayerUnit] = useState(null);
  const [targetUnit, setTargetUnit] = useState(null);
  const [targetUnitSaveAug, setTargetUnitSaveAug] = useState(0);
  const [rollToHitAug, setRollToHitAug] = useState(0);

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
        setTargetUnitSaveAug(unitStats[event.target.value]["Save Requirement"]);
      }} name="Target">
        <option value="">--Select your target--</option>
        {Object.keys(unitStats).map((unit) => {
          return <option value={unit} key={unit}>{unit}</option>
        })}
      </select>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '50vw', display: 'flex', flexDirection: 'column', borderRight: 'solid' }}>
          <h3>Player Unit: {playerUnit}</h3>
          {playerUnit ? Object.keys(unitStats[playerUnit]).map((item) => {
            return <div style={{ borderBottom: 'solid' }}>
              <span className="info-point">{item}: </span>
              <span>{unitStats[playerUnit][item]} </span>
            </div>
          }) : null}
        </div>
        <div style={{ width: '49vw', marginLeft: '1vw', display: 'flex', flexDirection: 'column', borderLeft: 'solid' }}>
          <h3>Target Unit: {targetUnit}</h3>
          {targetUnit
            ?
            <div>
              <span style={{ borderBottom: 'solid' }} className="info-point">Inherant Save Requirement Augmentation: </span>
              <span> {unitStats[targetUnit]["Save Requirement"] || 0}</span>
              <div>
                <span style={{ borderBottom: 'solid' }} className="info-point">In partial cover:</span>
                <input type="checkbox" onChange={(event) => { handleRollToHitAugChange(event, 3) }} />
              </div>
              <div>
                <span style={{ borderBottom: 'solid' }} className="info-point">{`Within 'Call to Arms' radius (Template #3) of Captain:`}</span>
                <input type="checkbox" onChange={(event) => { handleSaveAugChange(event, -2) }} />
              </div>
              <div>
                <span style={{ borderBottom: 'solid' }} className="info-point">{`Within 'Rally' radius (Template $2) of Sergeant:`}</span>
                <input type="checkbox" onChange={(event) => { handleSaveAugChange(event, -1) }} />
              </div>
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

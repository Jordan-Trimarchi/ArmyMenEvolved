import React, { useContext } from 'react';
import Context from '../context';
import unitStats from './unitStats';

const UnitSelectors = () => {
  const {
    playerUnit,
    setPlayerUnit,
    setTargetUnit,
    setCurrentITR,
  } = useContext(Context);

  const isBazooka = playerUnit && playerUnit.name === 'Bazooka';

  return (
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
        name="UnitSelect"
      >
        <option value="">--Select Unit--</option>
        {Object.keys(unitStats).map((unit) => <option value={unit} key={unit}>{unit}</option>)}
      </select>
      <select
        onChange={(event) => {
          setTargetUnit(unitStats[event.target.value] || event.target.value);
        }}
        name="TargetSelect"
      >
        <option value="">--Select Target--</option>
        {isBazooka ? <option value="barrier-vehicle">Barrier / Vehicle</option> : null}
        {Object.keys(unitStats).map((unit) => <option value={unit} key={unit}>{unit}</option>)}
        <option value="ground">The Ground</option>
      </select>
    </div>
  );
};

export default UnitSelectors;

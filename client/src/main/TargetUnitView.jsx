import React, { useContext } from 'react';
import Context from '../context';
import RollToSave from './RollToSave';
import TargetUnitRows from './TargetUnitRows';

const TargetUnitView = () => {
  const { playerUnit, targetUnit } = useContext(Context);

  return (
    <div className="target">
      {targetUnit === 'barrier' && (playerUnit.name === 'Bazooka' || playerUnit.name === 'Mortar')
        ? (
          <div className="target-unit-view static-pane">
            <h2>Barrier</h2>
            <h3>Obliterate it.</h3>
          </div>
        )
        : null}

      {targetUnit === 'ground'
        ? (
          <div className="target-unit-view static-pane">
            <h2>The Ground</h2>
            <h3>{'It\'s not the fall that kills you, it\'s the sudden stop at the end.'}</h3>
          </div>
        ) : null}
      {targetUnit !== 'ground' && targetUnit !== 'barrier'
        ? (
          <div className="target-unit-view">
            <h2>
              {`Target: ${targetUnit.name}`}
            </h2>
            <TargetUnitRows />
            <RollToSave />
          </div>
        )
        : null}
    </div>
  );
};

export default TargetUnitView;

import React, { useContext } from 'react';
import Context from '../context';
import RollToSave from './RollToSave';
import TargetUnitRows from './TargetUnitRows';

const TargetUnitView = () => {
  const { playerUnit, targetUnit, isDead, isCriticalHit } = useContext(Context);

  return (
    <div className="target">
      {targetUnit === 'barrier' && (playerUnit.name === 'Bazooka' || playerUnit.name === 'Mortar')
        ? (
          <div className="target-unit-view static-pane">
            <h2>
              Target: Barrier
              <img className="avatar" alt="" src={`${targetUnit}.png`} />
            </h2>
            <h3>Obliterate it.</h3>
          </div>
        )
        : null}

      {targetUnit === 'ground'
        ? (
          <div className="target-unit-view static-pane">
            <h2>
              Target: Ground
              <img className="avatar" alt="" src={`${targetUnit}.png`} />
            </h2>
            <h3>{'It\'s not the fall that kills you, it\'s the sudden stop at the end.'}</h3>
          </div>
        ) : null}
      {targetUnit !== 'ground' && targetUnit !== 'barrier'
        ? (
          <div className="target-unit-view">
            <h2>
              {`Target: ${targetUnit.name}`}
              <img className="avatar" style={{ transform: `rotate(${isDead || isCriticalHit ? '90deg' : '0deg'})` }} alt="" src={`${targetUnit.name} black.png`} />
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

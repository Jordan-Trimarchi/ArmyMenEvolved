/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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

  const isArtillery = playerUnit && (playerUnit.name === 'Bazooka' || playerUnit.name === 'Mortar');

  const handlePlayerUnitClick = (event) => {
    setPlayerUnit(unitStats[event.target.alt]);
    setCurrentITR(
      (unitStats[event.target.alt]['Inches To Roll']
        || unitStats[event.target.alt]['Mortar Inches To Roll']
      )
      || unitStats[event.target.alt]['Sidearm Inches To Roll'],
    );
  };

  const handleTargetUnitClick = (event) => {
    setTargetUnit(unitStats[event.target.alt] || event.target.alt);
  };

  return (
    <div className="unit-selectors">
      <div className="icons">
        <img className="icon" alt="Captain" src="Captain.png" onClick={handlePlayerUnitClick} />
        <img className="icon" alt="Sergeant" src="Sergeant.png" onClick={handlePlayerUnitClick} />
        <img className="icon" alt="Flamer" src="Flamer.png" onClick={handlePlayerUnitClick} />
        <img className="icon" alt="Mortar" src="Mortar.png" onClick={handlePlayerUnitClick} />
        <img className="icon" alt="Bazooka" src="Bazooka.png" onClick={handlePlayerUnitClick} />
        <img className="icon" alt="Recon Scout" src="Recon Scout.png" onClick={handlePlayerUnitClick} />
        <img className="icon" alt="Engineer" src="Engineer.png" onClick={handlePlayerUnitClick} />
        <img className="icon" alt="Standing Rifleman" src="Standing Rifleman.png" onClick={handlePlayerUnitClick} />
        <img className="icon" alt="Kneeling Rifleman" src="Kneeling Rifleman.png" onClick={handlePlayerUnitClick} />
        <img className="icon" alt="Prone Rifleman" src="Prone Rifleman.png" onClick={handlePlayerUnitClick} />
      </div>
      <div className="icons">
        <div className="icons-other">
          {isArtillery ? <img className="icon-wide" alt="barrier" src="barrier.png" onClick={handleTargetUnitClick} /> : null}
          <img className="icon-wide" alt="ground" src="ground.png" onClick={handleTargetUnitClick} />
        </div>
        <img className="icon" alt="Captain" src="Captain black.png" onClick={handleTargetUnitClick} />
        <img className="icon" alt="Sergeant" src="Sergeant black.png" onClick={handleTargetUnitClick} />
        <img className="icon" alt="Flamer" src="Flamer black.png" onClick={handleTargetUnitClick} />
        <img className="icon" alt="Mortar" src="Mortar black.png" onClick={handleTargetUnitClick} />
        <img className="icon" alt="Bazooka" src="Bazooka black.png" onClick={handleTargetUnitClick} />
        <img className="icon" alt="Recon Scout" src="Recon Scout black.png" onClick={handleTargetUnitClick} />
        <img className="icon" alt="Engineer" src="Engineer black.png" onClick={handleTargetUnitClick} />
        <img className="icon" alt="Standing Rifleman" src="Standing Rifleman black.png" onClick={handleTargetUnitClick} />
        <img className="icon" alt="Kneeling Rifleman" src="Kneeling Rifleman black.png" onClick={handleTargetUnitClick} />
        <img className="icon" alt="Prone Rifleman" src="Prone Rifleman black.png" onClick={handleTargetUnitClick} />
      </div>

    </div>
  );
};

export default UnitSelectors;

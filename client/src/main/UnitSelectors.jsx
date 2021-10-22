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
        <img className="icon" alt="Captain" src="captain.png" onClick={handlePlayerUnitClick} />
        <img className="icon" alt="Sergeant" src="sergeant.png" onClick={handlePlayerUnitClick} />
        <img className="icon" alt="Flamer" src="flamer.png" onClick={handlePlayerUnitClick} />
        <img className="icon" alt="Mortar" src="mortar.png" onClick={handlePlayerUnitClick} />
        <img className="icon" alt="Bazooka" src="bazooka.png" onClick={handlePlayerUnitClick} />
        <img className="icon" alt="Recon Scout" src="recon.png" onClick={handlePlayerUnitClick} />
        <img className="icon" alt="Engineer" src="engineer.png" onClick={handlePlayerUnitClick} />
        <img className="icon" alt="Standing Rifleman" src="standing.png" onClick={handlePlayerUnitClick} />
        <img className="icon" alt="Kneeling Rifleman" src="kneeling.png" onClick={handlePlayerUnitClick} />
        <img className="icon" alt="Prone Rifleman" src="prone.png" onClick={handlePlayerUnitClick} />
      </div>
      <div className="icons">
        <div className="icons-other">
          {isArtillery ? <img className="icon-wide" alt="barrier" src="barrier.png" onClick={handleTargetUnitClick} /> : null}
          <img className="icon-wide" alt="ground" src="ground.png" onClick={handleTargetUnitClick} />
        </div>
        <img className="icon" alt="Captain" src="captainblack.png" onClick={handleTargetUnitClick} />
        <img className="icon" alt="Sergeant" src="sergeantblack.png" onClick={handleTargetUnitClick} />
        <img className="icon" alt="Flamer" src="flamerblack.png" onClick={handleTargetUnitClick} />
        <img className="icon" alt="Mortar" src="mortarblack.png" onClick={handleTargetUnitClick} />
        <img className="icon" alt="Bazooka" src="bazookablack.png" onClick={handleTargetUnitClick} />
        <img className="icon" alt="Recon Scout" src="reconblack.png" onClick={handleTargetUnitClick} />
        <img className="icon" alt="Engineer" src="engineerblack.png" onClick={handleTargetUnitClick} />
        <img className="icon" alt="Standing Rifleman" src="standingblack.png" onClick={handleTargetUnitClick} />
        <img className="icon" alt="Kneeling Rifleman" src="kneelingblack.png" onClick={handleTargetUnitClick} />
        <img className="icon" alt="Prone Rifleman" src="proneblack.png" onClick={handleTargetUnitClick} />
      </div>

    </div>
  );
};

export default UnitSelectors;

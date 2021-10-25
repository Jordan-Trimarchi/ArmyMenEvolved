import React, { useContext } from 'react';
import { Checkbox } from '@material-ui/core';
import useStyles from '../useStyles';
import Context from '../context';

const UnitSpecificControllers = () => {
  const {
    playerUnit,
    isMounted,
    isSnipey,
    usingGrenade,
    usingSideArm,
    setCurrentITR,
    setIsMounted,
    setIsSnipey,
    setUsingGrenade,
    setUsingSideArm,
  } = useContext(Context);

  const { unitSelect } = useStyles();

  const handleSidearm = (event) => {
    if (event.target.checked) { setUsingSideArm(true); } else { setUsingSideArm(false); }
    if (event.target.checked) {
      setCurrentITR(playerUnit['Sidearm Inches To Roll']);
    } else {
      setCurrentITR(playerUnit['Inches To Roll'] || playerUnit['Mortar Inches To Roll'] || playerUnit['Sidearm Inches To Roll']);
    }
  };

  const handleGrenade = (event) => {
    if (event.target.checked) { setUsingGrenade(true); } else { setUsingGrenade(false); }
    if (event.target.checked) { setCurrentITR(1); } else { setCurrentITR(playerUnit['Inches To Roll']); }
  };

  const handleMount = (event) => {
    if (event.target.checked) { setIsMounted(true); } else { setIsMounted(false); }
    if (event.target.checked) { setCurrentITR(0.53); } else { setCurrentITR(playerUnit['Inches To Roll']); }
  };

  const handleSneakAttack = (event) => {
    if (event.target.checked) { setIsSnipey(true); } else { setIsSnipey(false); }
    if (event.target.checked) { setCurrentITR(0.43); } else { setCurrentITR(playerUnit['Inches To Roll']); }
  };

  return (
    <div>
      {playerUnit['Sidearm Inches To Roll']
        ? (
          <div className="row">
            <span className="info-point">Use Sidearm: </span>
            <Checkbox className={unitSelect} checked={playerUnit.name === 'Flamer' ? true : usingSideArm} onChange={handleSidearm} />
          </div>
        )
        : null}
      {playerUnit.name === 'Standing Rifleman'
        ? (
          <div className="row">
            <span className="info-point">Throw Grenade: </span>
            <Checkbox className={unitSelect} checked={usingGrenade} onChange={handleGrenade} />
          </div>
        )
        : null}
      {playerUnit.name === 'Kneeling Rifleman' ? (
        <div className="row">
          <span className="info-point">
            Mount up (.53 ITR)
            :
          </span>
          <Checkbox className={unitSelect} onChange={handleMount} checked={isMounted} />
        </div>
      ) : null}
      {playerUnit.name === 'Prone Rifleman' ? (
        <div className="row">
          <span className="info-point">Dead-Eye (2 actions: .43 ITR):</span>
          <Checkbox className={unitSelect} onChange={handleSneakAttack} checked={isSnipey} />
        </div>
      ) : null}
    </div>
  );
};

export default UnitSpecificControllers;

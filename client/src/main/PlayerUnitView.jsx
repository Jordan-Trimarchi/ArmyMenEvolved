import { Checkbox } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import useStyles from './useStyles';

const PlayerUnitView = ({ playerUnit, targetUnit, rollToHit, setRollToHit, setRollToHitAug, elevation, setElevation, distance, setDistance, handleRollToHitAugChange, isInPartialCover, setIsInPartialCover, currentITR, setCurrentITR, rollResult, setRollResult, usingMortarMechanics, setUsingMortarMechanics, usingGrenade, setUsingGrenade, setIsCriticalHit, usingSideArm, setUsingSideArm }) => {
  const [spotted, setSpotted] = useState(false);
  const [isInRecon, setIsInRecon] = useState(false);
  const [isNearCaptain, setIsNearCaptain] = useState(false);
  const [isNearSergeant, setIsNearSergeant] = useState(false);
  const [canRoll, setCanRoll] = useState(true);
  const [canRoll12, setCanRoll12] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isSnipey, setIsSnipey] = useState(false);
  const [d12Result, setD12Result] = useState(0);
  const [crossedMines, setCrossedMines] = useState('');
  const [canCrossMines, setCanCrossMines] = useState(true);
  const classes = useStyles();

  const handleClear = () => {
    setRollToHit(0);
    setRollToHitAug(0);
    setElevation('0');
    setDistance(0);
    setSpotted(false);
    setIsInPartialCover(false);
    setIsNearCaptain(false);
    setIsNearSergeant(false);
    setIsSnipey(false);
    setIsMounted(false);
    setUsingGrenade(false);
  };

  useEffect(() => {
    setUsingGrenade(false);
    setIsMounted(false);
    setIsSnipey(false);
    setIsNearCaptain(false);
    setIsNearSergeant(false);
    setIsInPartialCover(false);
    setSpotted(false);
    setIsInRecon(false);
    setCrossedMines('');
    setCanCrossMines(true);
    setD12Result(0);
    setRollToHitAug(0);
    setUsingSideArm(false);
  }, [playerUnit]);

  const handleSidearm = (event) => {
    event.target.checked ? setUsingSideArm(true) : setUsingSideArm(false);
    event.target.checked ? setCurrentITR(playerUnit['Sidearm Inches To Roll']) : setCurrentITR(playerUnit["Inches To Roll"]
      || playerUnit["Mortar Inches To Roll"]
    );
  };

  const handleGrenade = (event) => {
    event.target.checked ? setUsingGrenade(true) : setUsingGrenade(false);
    if (event.target.checked) {
      setCurrentITR(1);
    } else {
      setCurrentITR(playerUnit["Inches To Roll"]);
    }
  };

  const handleMount = (event) => {
    event.target.checked ? setIsMounted(true) : setIsMounted(false);
    if (event.target.checked) {
      setCurrentITR(0.53);
    } else {
      setCurrentITR(playerUnit["Inches To Roll"]);
    }
  };

  const handleSneakAttack = (event) => {
    event.target.checked ? setIsSnipey(true) : setIsSnipey(false);
    if (event.target.checked) {
      setCurrentITR(0.43);
    } else {
      setCurrentITR(playerUnit["Inches To Roll"]);
    }
  };

  useEffect(() => {
    setUsingGrenade(false);
    setIsMounted(false);
    setIsSnipey(false);
    setIsNearCaptain(false);
    setIsNearSergeant(false);
    setIsInPartialCover(false);
    setSpotted(false);
    setIsInRecon(false);
    setCrossedMines('');
    setCanCrossMines(true);
    setD12Result(0);
    setRollToHitAug(0);
  }, [playerUnit]);

  useEffect(() => {
    if (rollResult === '20' || (rollResult >= rollToHit && isSnipey)) {
      setIsCriticalHit(true);
    } else {
      setIsCriticalHit(false);
    }
  }, [rollResult, isSnipey]);

  useEffect(() => {
    if ((playerUnit.name === 'Mortar' && !usingSideArm) || (playerUnit.name === 'Standing Rifleman' && usingGrenade) || (playerUnit.name === 'Bazooka' && elevation > distance / 2)) {
      setUsingMortarMechanics(true);
    } else {
      setUsingMortarMechanics(false);
    }
  }, [playerUnit, usingGrenade, usingSideArm, elevation, distance, rollToHit, rollResult]);

  return (
    <div className='fade-in' style={{ transition: '1s', width: '38.5vw', display: 'flex', flexDirection: 'column', borderRight: 'solid', borderLeft: 'solid' }}>
      <h2 style={{ textDecoration: 'underline', display: 'flex', justifyContent: "center" }}>Unit: {playerUnit.name}</h2>
      {playerUnit && targetUnit ?
        <div className="fade-in">
          <div className='row'>
            <span className="fake-h3">Attack Calculator</span>
            <input type="button" value="Clear All" onClick={handleClear} />
          </div>
          <div className="row">
            <span className="info-point">Distance to target: </span>
            <input value={distance} onChange={(event) => {
              setDistance(event.target.value);
            }} type="number" step=".0625" placeholder='Inches' min="0" style={{ width: '5em' }} />
          </div>
          {playerUnit["Sidearm Inches To Roll"] && !playerUnit["Inches To Roll"] ?
            <div className="row">
              <span className="info-point">Use Sidearm: </span>
              <Checkbox className={classes.unitSelect} checked={playerUnit.name === 'Flamer' ? true : usingSideArm} onChange={handleSidearm} />
            </div>
            : null
          }
          {playerUnit.name === "Standing Rifleman" ?
            <div className="row">
              <span className="info-point">Throw Grenade: </span>
              <Checkbox className={classes.unitSelect} checked={usingGrenade} onChange={handleGrenade} />
            </div>
            : null
          }
          {playerUnit.name === 'Kneeling Rifleman' ? <div className="row">
            <span className="info-point">{`Mount up (.53 ITR)`}:</span>
            <Checkbox className={classes.unitSelect} onChange={handleMount} checked={isMounted} />
          </div> : null}
          {playerUnit.name === 'Prone Rifleman' ? <div className="row">
            <span className="info-point">{'Dead-Eye (2 actions: .43 ITR):'}</span>
            <Checkbox className={classes.unitSelect} onChange={handleSneakAttack} checked={isSnipey} />
          </div> : null}
          <div className="row">
            <span className="info-point">Elevation: Unit is {elevation === '0' ? 'level with' : `${Math.abs(elevation)} inches ${elevation >= 0 ? 'higher' : 'lower'}`} than target. </span>
            <input value={elevation} name="elevation" onChange={(event) => {
              setElevation(event.target.value);
            }} type="number" step=".0625" placeholder='Inches' style={{ width: '5em' }} />
          </div>
          {usingMortarMechanics === false ? <div className="row">
            <span className="info-point">Target is in partial cover:</span>
            <Checkbox className={classes.unitSelect} name="cover" onChange={(event) => {
              handleRollToHitAugChange(event, 3);
              event.target.checked ? setIsInPartialCover(true) : setIsInPartialCover(false);
            }} checked={isInPartialCover} />
          </div> : null}
          <div className="row">
            <span className="info-point">{`Template #3: Actively 'Spotted' by ${playerUnit.name === 'Recon Scout' ? 'another ' : ''}Recon Scout:`}</span>
            <Checkbox className={classes.unitSelect} checked={spotted} onChange={(event) => {
              setSpotted(!spotted);
              if (isInRecon) {
                handleRollToHitAugChange(event, -2);
                setIsInRecon(false);
              } else {
                handleRollToHitAugChange(event, -3);
              }
            }}
            />
          </div>
          {playerUnit.name !== 'Captain' ?
            <div className="row">
              <span className="info-point">{`Template #3: Within 'Call to Arms' radius of Captain:`}</span>
              <Checkbox className={classes.unitSelect} onChange={(event) => {
                if (playerUnit["Unit Class"] === 'Infantry') {
                  handleRollToHitAugChange(event, -2);
                } else {
                  handleRollToHitAugChange(event, -1);
                }
                event.target.checked ? setIsNearCaptain(true) : setIsNearCaptain(false);
              }} checked={isNearCaptain} />
            </div> : null}
          {playerUnit.name !== 'Sergeant' && playerUnit["Unit Class"] === 'Infantry' ?
            <div className="row">
              <span className="info-point">{`Template #2: Within 'Rally' radius of Sergeant:`}</span>
              <Checkbox className={classes.unitSelect} onChange={(event) => {
                if (playerUnit["Unit Class"] === 'Infantry') {
                  handleRollToHitAugChange(event, -1);
                }
                event.target.checked ? setIsNearSergeant(true) : setIsNearSergeant(false);
              }} checked={isNearSergeant} />
            </div> : null}
          {spotted ? null :
            <div className="row">
              <span className="info-point">{`Template #2: Within 'Recon' radius of ${playerUnit.name === 'Recon Scout' ? 'another ' : ''}Recon Scout:`}</span>
              <Checkbox className={classes.unitSelect} checked={isInRecon} onChange={(event) => {
                handleRollToHitAugChange(event, -1);
                if (event.target.checked) {
                  setIsInRecon(true);
                } else {
                  setIsInRecon(false);
                }
              }}
              />
            </div>
          }
          <div className="row">
            <span className="info-point">Current Inches To Roll:</span>
            <span> {currentITR}</span>
          </div>
          {
            rollToHit > 20.5 || (distance && distance < playerUnit["Minimum Range"] && !usingSideArm)
              ? <h3 style={{ display: 'flex', justifyContent: "center" }}>Unable to hit.</h3>
              : rollToHit && distance
                ?
                <div>
                  <div className="row">
                    <span className="info-point">Roll Result: </span>
                    {canRoll ? <input value={rollResult} onChange={(event) => {
                      setRollResult(event.target.value);
                    }} type="number" step="1" placeholder='Roll' min="1" max="20" style={{ width: '5em' }} /> : <div style={{ marginRight: '.25em' }}>{rollResult}</div>}
                  </div>
                  <div className="row" style={{ justifyContent: usingMortarMechanics && rollResult > 1 ? 'space-around' : 'center' }}>
                    {canRoll ?
                      <div>
                        <input value='Roll D20' onClick={() => {
                          if (canRoll) {
                            setRollResult(String(Math.ceil(Math.random() * 20)));
                            setCanRoll(false);
                            setTimeout(() => {
                              setCanRoll(true);
                            }, 7500);
                          }
                        }} type="button" />
                      </div>
                      : <span>&#10710;</span>}
                    {usingMortarMechanics && rollResult > 1 && rollResult < rollToHit ?
                      <div>
                        {canRoll12 ? <input value='Roll D12' onClick={
                          () => {
                            if (canRoll12) {
                              setD12Result(String(Math.ceil(Math.random() * 12)));
                              setCanRoll12(false);
                              setTimeout(() => {
                                setCanRoll12(true);
                              }, 7500);
                            }
                          }} type="button" /> : <div>&#10710;</div>}
                      </div>
                      : null}
                  </div>
                  {rollResult > 1 || rollToHit < 2 ? <h3 style={{ display: 'flex', justifyContent: 'center' }}>
                    {rollResult >= rollToHit && rollResult ? `Rolled ${rollResult}: Hit.` : rollResult > 0 ? `Rolled ${rollResult}: Miss.` : null}
                  </h3> : null}

                  {usingMortarMechanics && rollResult > 1 && rollResult < rollToHit
                    ? <h3 style={{ display: 'flex', justifyContent: 'center' }}> Off by {rollToHit - Number(rollResult) <= (usingGrenade ? 5 : 8)
                      ? rollToHit - Number(rollResult)
                      : (usingGrenade ? 5 : 8)} inches{d12Result ? ` toward ${d12Result} o'clock` : '. Roll D12'}. </h3>
                    : null}

                  {rollResult === '1' && rollToHit > 1 ? <h3 style={{ display: 'flex', justifyContent: 'center' }}>
                    Critical Failure: Weapon is jammed until end of next turn.
                  </h3> : null}

                  <h3 style={{ display: 'flex', justifyContent: 'center' }}>Roll of {rollToHit > 0 ? rollToHit : 1}+ required to hit.</h3>
                </div>
                : null
          }
        </div>
        : null}
      <div className="row" style={{ justifyContent: crossedMines ? 'space-around' : 'center' }}>
        {canCrossMines ? <input type="Button" value="Cross Mines" onClick={() => {
          setCanCrossMines(false);
          const roll = Math.ceil(Math.random() * 20);
          setCrossedMines(roll >= 6 ? `Rolled ${roll}: Success.` : `Rolled ${roll}: Failure.`);
          setTimeout(() => {
            setCanCrossMines(true);
          }, 5000);
        }}
        /> : <span>&#10710;</span>}
        {crossedMines ? <span className="info-point">{crossedMines}</span> : null}
      </div>
      <div>
        <h3 style={{ textDecoration: 'underline' }}>Unit Stats</h3>
        {Object.keys(playerUnit).map((item) => {
          if (item !== "name") {
            const styles = {}
            playerUnit[item].length > 93 ? styles.textDecoration = 'underline' : null
            return <div className="row">
              <span style={styles} className="info-point">{item}: </span>
              <span>{playerUnit[item]} </span>
            </div>
          }
        })}
      </div>
    </div>
  );
};

export default PlayerUnitView;
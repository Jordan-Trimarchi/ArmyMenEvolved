import React, { useState, useEffect } from 'react';

const PlayerUnitView = ({ playerUnit, targetUnit, rollToHit, setRollToHit, setRollToHitAug, elevation, setElevation, distance, setDistance, handleRollToHitAugChange, isInPartialCover, setIsInPartialCover, setCurrentITR, rollResult, setRollResult, setOffSaveReq, usingMortarMechanics, setUsingMortarMechanics, usingGrenade, setUsingGrenade, isCriticalHit, setIsCriticalHit }) => {
  const [spotted, setSpotted] = useState(false);
  const [isInRecon, setIsInRecon] = useState(false);
  const [isNearCaptain, setIsNearCaptain] = useState(false);
  const [isNearSergeant, setIsNearSergeant] = useState(false);
  const [usingSideArm, setUsingSideArm] = useState(false);
  const [canRoll, setCanRoll] = useState(true);
  const [canRoll12, setCanRoll12] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isSneaky, setIsSneaky] = useState(false);
  const [d12Result, setD12Result] = useState(0);

  const handleClear = () => {
    setRollToHit(0);
    setRollToHitAug(0);
    setElevation('0');
    setDistance(0);
    setSpotted(false);
    setIsInPartialCover(false);
    setIsNearCaptain(false);
    setIsNearSergeant(false);
    setIsSneaky(false);
    setIsMounted(false);
    setUsingGrenade(false);
  };

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
      setOffSaveReq(2);
    } else {
      setCurrentITR(playerUnit["Inches To Roll"]);
      setOffSaveReq(0);
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
    event.target.checked ? setIsSneaky(true) : setIsSneaky(false);
    if (event.target.checked) {
      setCurrentITR(0.53);
    } else {
      setCurrentITR(playerUnit["Inches To Roll"]);
    }
  };

  useEffect(() => {
    setUsingGrenade(false);
    setIsMounted(false);
    setIsSneaky(false);
    setIsNearCaptain(false);
    setIsNearSergeant(false);
  }, [playerUnit]);

  useEffect(() => {
    if (rollResult === '20' || (rollResult >= rollToHit && isSneaky)) {
      setIsCriticalHit(true);
    } else {
      setIsCriticalHit(false);
    }
  }, [rollResult, isSneaky]);

  useEffect(() => {
    if (rollResult > 0 && ((playerUnit.name === 'Mortar' && !usingSideArm) || (playerUnit.name === 'Standing Rifleman' && usingGrenade) || (playerUnit.name === 'Bazooka' && elevation > distance / 2)) && rollResult < rollToHit) {
      setUsingMortarMechanics(true);
    } else {
      setUsingMortarMechanics(false);
    }
  }, [playerUnit, usingGrenade, usingSideArm, elevation, distance, rollToHit, rollResult]);

  return (
    <div>
      <h2 style={{ textDecoration: 'underline', display: 'flex', justifyContent: "center" }}>{playerUnit.name}</h2>
      {playerUnit && targetUnit ?
        <div>
          <div className='row'>
            <span className="fake-h3">Attack Calculator</span>
            <button type="button" onClick={handleClear}>Clear All</button>
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
              <input checked={playerUnit.name === 'Flamer' ? true : usingSideArm} onChange={handleSidearm} type="checkbox" />
            </div>
            : null
          }
          {playerUnit.name === "Standing Rifleman" ?
            <div className="row">
              <span className="info-point">Throw Grenade: </span>
              <input checked={usingGrenade} onChange={handleGrenade} type="checkbox" />
            </div>
            : null
          }
          {playerUnit.name === 'Kneeling Rifleman' ? <div className="row">
            <span className="info-point">Mount up:</span>
            <input type="checkbox" onChange={handleMount} checked={isMounted} />
          </div> : null}
          {playerUnit.name === 'Prone Rifleman' ? <div className="row">
            <span className="info-point">{'Sneak Attack(2 actions):'}</span>
            <input type="checkbox" onChange={handleSneakAttack} checked={isSneaky} />
          </div> : null}
          <div className="row">
            <span className="info-point">Elevation: Unit is {elevation === '0' ? 'level with' : `${Math.abs(elevation)} inches ${elevation >= 0 ? 'higher' : 'lower'}`} than target. </span>
            <input value={elevation} name="elevation" onChange={(event) => {
              setElevation(event.target.value);
            }} type="number" step=".0625" placeholder='Inches' style={{ width: '5em' }} />
          </div>
          <div className="row">
            <span className="info-point">Target is in partial cover:</span>
            <input name="cover" type="checkbox" onChange={(event) => {
              handleRollToHitAugChange(event, 3);
              event.target.checked ? setIsInPartialCover(true) : setIsInPartialCover(false);
            }} checked={isInPartialCover} />
          </div>
          {playerUnit.name !== 'Captain' ?
            <div className="row">
              <span className="info-point">{`Template #3: ${playerUnit.name} is within 'Call to Arms' radius of Captain:`}</span>
              <input type="checkbox" onChange={(event) => {
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
              <span className="info-point">{`Template #2: ${playerUnit.name} is within 'Rally' radius of Sergeant:`}</span>
              <input type="checkbox" onChange={(event) => {
                if (playerUnit["Unit Class"] === 'Infantry') {
                  handleRollToHitAugChange(event, -1);
                }
                event.target.checked ? setIsNearSergeant(true) : setIsNearSergeant(false);
              }} checked={isNearSergeant} />
            </div> : null}
          <div className="row">
            <span className="info-point">{`Template #3: ${playerUnit.name} is actively 'Spotted' by ${playerUnit.name === 'Recon Scout' ? 'another ' : ''}Recon Scout:`}</span>
            <input checked={spotted} type="checkbox" onChange={(event) => {
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
          {spotted ? null :
            <div className="row">
              <span className="info-point">{`Template #2: ${playerUnit.name} is within 'Recon' radius of ${playerUnit.name === 'Recon Scout' ? 'another ' : ''}Recon Scout:`}</span>
              <input type="checkbox" onChange={(event) => {
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
          {
            rollToHit > 20.5 || (distance < playerUnit["Minimum Range"] && !usingSideArm)
              ? <h3 style={{ display: 'flex', justifyContent: "center" }}>Unable to hit.</h3>
              : rollToHit
                ?
                <div>
                  <div className="row">
                    <span className="info-point">Roll Result: </span>
                    {canRoll ? <input value={rollResult} onChange={(event) => {
                      setRollResult(event.target.value);
                    }} type="number" step="1" placeholder='Roll' min="1" max="20" style={{ width: '5em' }} /> : <div style={{ marginRight: '.25em' }}>{rollResult}</div>}
                  </div>
                  <div className="row">
                    <span className="info-point">D20:</span>
                    {canRoll ? <input value='Roll' onClick={() => {
                      if (canRoll) {
                        setRollResult(String(Math.ceil(Math.random() * 20)));
                        setCanRoll(false);
                        setTimeout(() => {
                          setCanRoll(true);
                        }, 10000);
                      }
                    }} type="button" /> : <div>⏳</div>}
                  </div>
                  {usingMortarMechanics && rollResult !== '1' ? <div className="row">
                    <span className="info-point">D12:</span>
                    {
                      canRoll12 ? <input value='Roll' onClick={() => {
                        if (canRoll12) {
                          setD12Result(String(Math.ceil(Math.random() * 12)));
                          setCanRoll12(false);
                          setTimeout(() => {
                            setCanRoll12(true);
                          }, 10000);
                        }
                      }} type="button" /> : <div>⏳</div>}
                  </div> : null}
                  {crossingMines ? <div>
                    {rollResult !== '1' ? <h3 style={{ display: 'flex', justifyContent: 'center' }}>
                      {rollResult >= rollToHit ? 'Hit' : rollResult > 0 ? 'Miss' : null}
                    </h3> : null}

                    {usingMortarMechanics && rollResult !== '1'
                      ? <h3 style={{ display: 'flex', justifyContent: 'center' }}> Off by {rollToHit - Number(rollResult) <= 8
                        ? rollToHit - Number(rollResult)
                        : 8} inches{d12Result ? ` toward ${d12Result} o'clock` : '. Roll D12'}. </h3>
                      : null}

                    {rollResult === '1' ? <h3 style={{ display: 'flex', justifyContent: 'center' }}>
                      Critical Failure: Weapon is jammed until end of next turn.
                    </h3> : null}

                    <h3 style={{ display: 'flex', justifyContent: 'center' }}>Roll of {rollToHit > 0 ? rollToHit : 0}+ required to hit.</h3>
                  </div> : null}
                </div>
                : null
          }
        </div>
        : null}
      <div>
        <h3>Unit Stats</h3>
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
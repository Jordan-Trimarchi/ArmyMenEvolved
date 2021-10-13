import React, { useState } from 'react';

const AttackRoll = ({
  rollToHit,
  distance,
  rollResult,
  setRollResult,
  usingMortarMechanics,
  d12Result,
  setD12Result,
  usingGrenade,
}) => {
  const [canRoll, setCanRoll] = useState(true);
  const [canRoll12, setCanRoll12] = useState(true);

  const maxMiss = usingGrenade ? 5 : 8;
  return (
    <>
      {
        rollToHit >= 20.5
          ? <h3 style={{ display: 'flex', justifyContent: 'center' }}>Unable to hit.</h3>
          : null
      }

      {rollToHit <= 20.49 && distance
        ? (
          <div>

            <div className="row">
              <span className="info-point">Roll Result: </span>
              {canRoll ? (
                <input
                  value={rollResult}
                  onChange={(event) => {
                    setRollResult(Number(event.target.value));
                  }}
                  type="number"
                  step="1"
                  placeholder="Roll"
                  min="1"
                  max="20"
                  style={{ width: '5em' }}
                />
              ) : <div style={{ marginRight: '.25em' }}>{rollResult}</div>}
            </div>

            <div className="row" style={{ justifyContent: usingMortarMechanics && rollResult > 1 ? 'space-around' : 'center' }}>
              {canRoll
                ? (
                  <div>
                    <input
                      value="Roll D20"
                      onClick={() => {
                        if (canRoll) {
                          setRollResult(Math.ceil(Math.random() * 20));
                          setCanRoll(false);
                          setTimeout(() => {
                            setCanRoll(true);
                          }, 7500);
                        }
                      }}
                      type="button"
                    />
                  </div>
                )
                : <span>&#10710;</span>}
              {usingMortarMechanics && rollResult > 1 && rollResult < rollToHit
                ? (
                  <div>
                    {canRoll12 ? (
                      <input
                        value="Roll D12"
                        onClick={
                          () => {
                            if (canRoll12) {
                              setD12Result(String(Math.ceil(Math.random() * 12)));
                              setCanRoll12(false);
                              setTimeout(() => {
                                setCanRoll12(true);
                              }, 7500);
                            }
                          }
                        }
                        type="button"
                      />
                    ) : <div>&#10710;</div>}
                  </div>
                )
                : null}
            </div>

            {rollResult > 1 || rollToHit < 2 ? (
              <h3 style={{ display: 'flex', justifyContent: 'center' }}>
                {rollResult >= rollToHit && rollResult ? `Rolled ${rollResult}: Hit.` : null}
                {rollResult < rollToHit && rollResult ? `Rolled ${rollResult}: Miss.` : null}
              </h3>
            ) : null}

            {usingMortarMechanics && rollResult > 1 && rollResult < rollToHit
              ? (
                <h3 style={{ display: 'flex', justifyContent: 'center' }}>
                  Off by
                  {` ${rollToHit - rollResult <= maxMiss ? rollToHit - rollResult : maxMiss} `}
                  inches
                  {d12Result ? ` toward ${d12Result} o'clock` : '. Roll D12'}
                  .
                </h3>
              )
              : null}

            {rollResult === 1 && rollToHit > 1 ? (
              <h3 style={{ display: 'flex', justifyContent: 'center' }}>
                <p>Critical Failure: Weapon Jam.</p>
                <p>Any unit within 1 inch may unjam using 1 action.</p>
              </h3>
            ) : null}

            <h3 style={{ display: 'flex', justifyContent: 'center' }}>
              {`Roll of ${rollToHit > 0 ? rollToHit : 1}+ required to hit.`}
            </h3>
          </div>
        )
        : null}
    </>
  );
};

export default AttackRoll;
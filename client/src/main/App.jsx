import React, { useState } from 'react';
import Combat from './Combat';
import GameBoard from './GameBoard';

const App = () => {
  const [viewingRules, setViewingRules] = useState(false);
  const [playing, setPlaying] = useState(false);
  return (
    <div>
      <div className="header">
        <h1>Army Men Evolved</h1>
        <input
          className="rules-back-button"
          value={viewingRules ? 'Back' : 'Rules'}
          type="button"
          onClick={() => {
            setViewingRules(!viewingRules);
            setPlaying(false);
          }}
        />
        <input
          className="rules-back-button"
          value={playing ? 'Back' : 'Play Here'}
          type="button"
          onClick={() => {
            setViewingRules(false);
            setPlaying(!playing);
          }}
        />
      </div>
      {viewingRules ? <iframe title="rules" style={{ width: '100%', height: '100vh' }} src="https://drive.google.com/file/d/1AzVqaFvFOD8iXwt936GSCgFjrIP5iq-b/preview" /> : null}
      {playing ? <GameBoard /> : null}
      {!viewingRules && !playing ? <Combat /> : null}
    </div>
  );
};

export default App;

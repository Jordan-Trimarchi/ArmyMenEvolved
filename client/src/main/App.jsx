import React, { useState } from 'react';
import Combat from './Combat';

const App = () => {
  const [viewingCombat, setViewingCombat] = useState(true);
  return (
    <div>
      <div className="header">
        <h1>Army Men Evolved</h1>
        <input value="Rules" style={{ backgroundColor: 'rgb(100,100, 100, .75)' }} type="button" onClick={() => setViewingCombat(!viewingCombat)} />
      </div>
      {viewingCombat ? <Combat /> : <iframe title="rules" style={{ width: '100%', height: '100vh' }} src="https://drive.google.com/file/d/1AzVqaFvFOD8iXwt936GSCgFjrIP5iq-b/preview" />}
    </div>
  );
};

export default App;

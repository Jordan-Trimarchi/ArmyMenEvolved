import React, { useState } from 'react';
import Combat from './Combat.jsx';

const App = () => {
  const [viewingCombat, setViewingCombat] = useState(true);
  return (
    <div>
      <div className="header">
        <h1>Army Men Evolved</h1>
        <input value='Rules' type='button' onClick={() => setViewingCombat(!viewingCombat)} />
      </div>
      {viewingCombat ? <Combat /> : <iframe style={{ width: '100%', height: '100vh' }} src="https://drive.google.com/file/d/1AzVqaFvFOD8iXwt936GSCgFjrIP5iq-b/preview" />}
    </div>)
};

export default App;

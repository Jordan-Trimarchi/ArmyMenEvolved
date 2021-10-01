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
      {viewingCombat ? <Combat /> : <embed style={{ width: '100%', height: '65vh' }} src="https://drive.google.com/file/d/1ZNVa0JkGo_5whu6C6ZciUDVlxVObqvvE/preview" />}
    </div>)
};

export default App;

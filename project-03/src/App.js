import React, { useState } from 'react';
import './App.css';

function App() {
  const [color, setColor] = useState('#000000');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  return (
    <div className="App">
      <div className="color-picker-container">
        <h1>Color Picker Tool</h1>
        
        <div className="color-display" style={{ backgroundColor: color }}>
          <span className="color-value">{color}</span>
        </div>

        <div className="controls">
          <button onClick={toggleColorPicker} className="btn">
            {showColorPicker ? 'Hide Color Picker' : 'Show Color Picker'}
          </button>
          
          {showColorPicker && (
            <div className="picker-wrapper">
              <input
                type="color"
                value={color}
                onChange={handleColorChange}
                className="color-input"
              />
            </div>
          )}
        </div>

        <div className="color-info">
          <p>Click the button above to {showColorPicker ? 'hide' : 'show'} the color picker</p>
          <p>Selected color: {color}</p>
        </div>
      </div>
    </div>
  );
}

export default App;

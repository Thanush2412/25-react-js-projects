import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="App">
      <div className="counter-container">
        <h1>Counter App</h1>
        <div className="counter-display">
          <h2>{count}</h2>
        </div>
        <div className="counter-buttons">
          <button onClick={decrement} className="btn">-</button>
          <button onClick={reset} className="btn">Reset</button>
          <button onClick={increment} className="btn">+</button>
        </div>
      </div>
    </div>
  );
}

export default App;

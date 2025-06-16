import React from 'react';
import useLocalStorage from './useLocalStorage';
import './App.css';

function App() {
  const [name, setName] = useLocalStorage('name', '');
  const [age, setAge] = useLocalStorage('age', 0);
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`App ${theme}`}>
      <div className="container">
        <h1>useLocalStorage Hook Demo</h1>
        
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            placeholder="Enter your age"
          />
        </div>

        <div className="form-group">
          <label>Theme:</label>
          <button onClick={toggleTheme}>
            Current Theme: {theme}
          </button>
        </div>

        <div className="info">
          <h2>Stored Values:</h2>
          <p>Name: {name}</p>
          <p>Age: {age}</p>
          <p>Theme: {theme}</p>
          <p className="note">
            Try refreshing the page - the values will persist!
          </p>
        </div>
      </div>
    </div>
  );
}

export default App; 
import React from 'react';
import './App.css';
import CityInsights from './components/CityInsights';

function App() {
  return (
    <div className="app">
      <div className="app-content">
        <h1>City Insights Dashboard</h1>
        <p className="subtitle">Interactive map and data explorer for city analytics</p>
        <CityInsights />
      </div>
    </div>
  );
}

export default App; 
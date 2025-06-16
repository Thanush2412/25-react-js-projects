import React from 'react';
import MultiStepForm from './components/MultiStepForm';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="app-content">
        <h1>Multi-Step Form</h1>
        <p className="subtitle">Complete all steps to create your account</p>
        <MultiStepForm />
      </div>
    </div>
  );
}

export default App; 
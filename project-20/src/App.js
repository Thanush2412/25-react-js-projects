import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <header className="app-header">
          <h1>Dark/Light Mode Demo</h1>
          <ThemeToggle />
      </header>
        <main className="app-content">
          <section className="content-section">
            <h2>Welcome to Theme Switching Demo</h2>
            <p>This project demonstrates how to implement a dark/light mode theme switcher using React Context.</p>
            <div className="feature-list">
              <h3>Features:</h3>
              <ul>
                <li>Theme persistence using localStorage</li>
                <li>Smooth transitions between themes</li>
                <li>Accessible toggle button</li>
                <li>CSS variables for easy theme customization</li>
              </ul>
            </div>
          </section>
        </main>
    </div>
    </ThemeProvider>
  );
}

export default App;

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Lazy load components
const Dashboard = lazy(() => import('./components/Dashboard'));
const Analytics = lazy(() => import('./components/Analytics'));
const Settings = lazy(() => import('./components/Settings'));
const Profile = lazy(() => import('./components/Profile'));

// Loading component
const Loading = () => (
  <div className="loading">
    <div className="loading-spinner"></div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="nav-menu">
          <div className="nav-header">
            <h1>Dashboard</h1>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/analytics">Analytics</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>

        <main className="content">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App; 
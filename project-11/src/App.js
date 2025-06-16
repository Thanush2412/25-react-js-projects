import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import UserCard from './components/UserCard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchUser = async (username) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>GitHub User Finder</h1>
      <SearchForm onSearch={searchUser} />
      
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Searching...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      {user && !loading && !error && <UserCard user={user} />}
    </div>
  );
}

export default App;

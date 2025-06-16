import React, { useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { countries } from '../data/countries';
import './DebouncedSearch.css';

const DebouncedSearch = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const filtered = countries.filter(country =>
    country.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="debounced-search-container">
      <h2>Debounced Country Search</h2>
      <input
        type="text"
        placeholder="Type a country name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="results">
        {debouncedSearch && filtered.length === 0 && (
          <div className="no-results">No countries found.</div>
        )}
        {filtered.map(country => (
          <div key={country} className="result-item">
            {country}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebouncedSearch; 
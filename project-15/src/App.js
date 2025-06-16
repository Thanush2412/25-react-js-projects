import React from 'react';
import { FilterProvider } from './context/FilterContext';
import Filter from './components/Filter';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  return (
    <FilterProvider>
      <main>
        <h1>Product Filter & Search</h1>
        <div className="container">
          <Filter />
          <ProductList />
        </div>
      </main>
    </FilterProvider>
  );
}

export default App;

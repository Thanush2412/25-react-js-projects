import React from 'react';
import { useFilterContext } from '../context/FilterContext';

const Filter = () => {
  const {
    filters: { text, category, brand, price, inStock, featured },
    updateFilters,
    clearFilters,
    sortProducts,
    all_products
  } = useFilterContext();

  // Get unique categories and brands
  const categories = ['all', ...new Set(all_products.map(p => p.category))];
  const brands = ['all', ...new Set(all_products.map(p => p.brand))];

  return (
    <div className="filter-container">
      <div className="search-box">
        <input
          type="text"
          name="text"
          value={text}
          onChange={updateFilters}
          placeholder="Search products..."
        />
      </div>

      <div className="filter-section">
        <h3>Category</h3>
        <select name="category" value={category} onChange={updateFilters}>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <h3>Brand</h3>
        <select name="brand" value={brand} onChange={updateFilters}>
          {brands.map(b => (
            <option key={b} value={b}>
              {b.charAt(0).toUpperCase() + b.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <h3>Price</h3>
        <input
          type="range"
          name="price"
          min="0"
          max={Math.max(...all_products.map(p => p.price))}
          value={price}
          onChange={updateFilters}
        />
        <span>${price}</span>
      </div>

      <div className="filter-section">
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="inStock"
              checked={inStock}
              onChange={updateFilters}
            />
            In Stock Only
          </label>
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="featured"
              checked={featured}
              onChange={updateFilters}
            />
            Featured Only
          </label>
        </div>
      </div>

      <div className="filter-section">
        <h3>Sort By</h3>
        <select onChange={sortProducts}>
          <option value="price-lowest">Price (Lowest)</option>
          <option value="price-highest">Price (Highest)</option>
          <option value="name-a">Name (A-Z)</option>
          <option value="name-z">Name (Z-A)</option>
        </select>
      </div>

      <button className="clear-filters" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default Filter; 
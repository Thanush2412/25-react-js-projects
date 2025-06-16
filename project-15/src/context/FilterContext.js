import React, { createContext, useContext, useReducer, useEffect } from 'react';
import products from '../data/products';

const FilterContext = createContext();

const initialState = {
  all_products: products,
  filtered_products: products,
  filters: {
    text: '',
    category: 'all',
    brand: 'all',
    price: 0,
    inStock: false,
    featured: false
  },
  sort: 'price-lowest'
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_PRODUCTS':
      let maxPrice = Math.max(...state.all_products.map(p => p.price));
      return {
        ...state,
        filtered_products: [...state.all_products],
        filters: { ...state.filters, price: maxPrice }
      };

    case 'UPDATE_FILTERS':
      const { name, value } = action.payload;
      return {
        ...state,
        filters: { ...state.filters, [name]: value }
      };

    case 'FILTER_PRODUCTS':
      const { all_products } = state;
      const { text, category, brand, price, inStock, featured } = state.filters;
      
      let tempProducts = [...all_products];
      
      // Text filter
      if (text) {
        tempProducts = tempProducts.filter(product => 
          product.name.toLowerCase().includes(text.toLowerCase())
        );
      }
      
      // Category filter
      if (category !== 'all') {
        tempProducts = tempProducts.filter(product => 
          product.category === category
        );
      }
      
      // Brand filter
      if (brand !== 'all') {
        tempProducts = tempProducts.filter(product => 
          product.brand === brand
        );
      }
      
      // Price filter
      tempProducts = tempProducts.filter(product => 
        product.price <= price
      );
      
      // In stock filter
      if (inStock) {
        tempProducts = tempProducts.filter(product => 
          product.inStock
        );
      }
      
      // Featured filter
      if (featured) {
        tempProducts = tempProducts.filter(product => 
          product.featured
        );
      }
      
      return { ...state, filtered_products: tempProducts };

    case 'SORT_PRODUCTS':
      let sortedProducts = [...state.filtered_products];
      switch (action.payload) {
        case 'price-lowest':
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-highest':
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        case 'name-a':
          sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-z':
          sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }
      return { ...state, filtered_products: sortedProducts, sort: action.payload };

    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          category: 'all',
          brand: 'all',
          price: Math.max(...state.all_products.map(p => p.price)),
          inStock: false,
          featured: false
        }
      };

    default:
      return state;
  }
};

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'LOAD_PRODUCTS' });
  }, []);

  useEffect(() => {
    dispatch({ type: 'FILTER_PRODUCTS' });
  }, [state.filters]);

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    
    if (name === 'price') {
      value = Number(value);
    }
    if (name === 'inStock' || name === 'featured') {
      value = e.target.checked;
    }
    
    dispatch({ type: 'UPDATE_FILTERS', payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  const sortProducts = (e) => {
    dispatch({ type: 'SORT_PRODUCTS', payload: e.target.value });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        updateFilters,
        clearFilters,
        sortProducts
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
}; 
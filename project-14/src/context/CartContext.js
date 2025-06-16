import React, { createContext, useReducer } from 'react';

// Initial state
const initialState = {
  items: [],
  total: 0,
  amount: 0
};

// Create context
export const CartContext = createContext();

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, amount: item.amount + 1 }
              : item
          ),
          total: state.total + action.payload.price,
          amount: state.amount + 1
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, amount: 1 }],
        total: state.total + action.payload.price,
        amount: state.amount + 1
      };

    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(item => item.id === action.payload);
      
      if (itemToRemove.amount === 1) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload),
          total: state.total - itemToRemove.price,
          amount: state.amount - 1
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, amount: item.amount - 1 }
            : item
        ),
        total: state.total - itemToRemove.price,
        amount: state.amount - 1
      };

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}; 
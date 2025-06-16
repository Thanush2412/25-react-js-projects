import React from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

function App() {
  return (
    <CartProvider>
      <main>
        <Navbar />
        <div className="container">
          <ProductList />
          <Cart />
        </div>
      </main>
    </CartProvider>
  );
}

export default App;

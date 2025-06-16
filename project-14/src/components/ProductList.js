import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import products from '../data/products';

const ProductList = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-list">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="price">${product.price.toFixed(2)}</p>
            <p className="description">{product.description}</p>
            <button 
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList; 
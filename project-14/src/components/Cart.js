import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { items, total, removeFromCart, clearCart } = useContext(CartContext);

  if (items.length === 0) {
    return (
      <div className="cart">
        <h2>Your Cart</h2>
        <p className="empty-cart">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div className="item-details">
              <h3>{item.title}</h3>
              <p className="price">${item.price.toFixed(2)}</p>
              <div className="quantity-controls">
                <span>Quantity: {item.amount}</span>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button 
          className="clear-cart-btn"
          onClick={clearCart}
        >
          Clear Cart
        </button>
        <button className="checkout-btn">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart; 
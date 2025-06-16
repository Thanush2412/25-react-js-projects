import React from 'react';
import { useFilterContext } from '../context/FilterContext';

const ProductList = () => {
  const { filtered_products } = useFilterContext();

  if (filtered_products.length === 0) {
    return (
      <div className="no-products">
        <h3>No products found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {filtered_products.map(product => (
        <div key={product.id} className="product-card">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
            {product.featured && <span className="badge featured">Featured</span>}
            {!product.inStock && <span className="badge out-of-stock">Out of Stock</span>}
          </div>
          <div className="product-info">
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <p className="category">{product.category}</p>
            <p className="brand">{product.brand}</p>
            <p className="description">{product.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList; 
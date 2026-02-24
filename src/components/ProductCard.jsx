import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="product-card-image" />
        <h3 className="product-card-title">{product.name}</h3>
      </Link>
      <p className="product-card-price">${product.price.toFixed(2)}</p>
      <Button onClick={handleAddToCart} variant="primary">
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
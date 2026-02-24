import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import QuantitySelector from '../components/QuantitySelector';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import Alert from '../components/Alert';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product ? product.image : '');
  const [alert, setAlert] = useState(null);

  if (!product) {
    return <div className="container" style={{ padding: 'var(--spacing-xl) 0' }}>
      <h2>Product Not Found</h2>
      <p>The product you are looking for does not exist.</p>
    </div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAlert({ type: 'success', message: `${quantity} x ${product.name} added to cart!` });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="container" style={{ padding: 'var(--spacing-xl) 0' }}>
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <div className="grid-2-col">
        <div className="product-detail-images">
          <img src={mainImage} alt={product.name} className="product-detail-main-image" />
          <div className="product-detail-thumbnails">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`product-detail-thumbnail ${mainImage === img ? 'active' : ''}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <p className="product-detail-description">{product.description}</p>

          <div className="form-group">
            <label>Quantity:</label>
            <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
          </div>

          <div className="add-to-cart-section">
            <Button onClick={handleAddToCart} variant="primary" size="large">
              Add to Cart
            </Button>
            <Button variant="secondary" size="large">
              Buy Now
            </Button>
          </div>

          <div style={{ marginTop: 'var(--spacing-xl)' }}>
            <h4>Product Specifications</h4>
            <ul>
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Rating:</strong> {product.rating} / 5</li>
              <li><strong>Availability:</strong> {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
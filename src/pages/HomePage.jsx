import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';

const HomePage = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="home-page">
      <section className="hero-section" style={{ background: 'linear-gradient(to right, #007bff, #6c757d)', color: 'white', textAlign: 'center', padding: '6rem 0', marginBottom: 'var(--spacing-xl)' }}>
        <div className="container">
          <h1>Discover Your Next Favorite Item</h1>
          <p style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-xl)' }}>
            Shop the latest trends and essential products for every need.
          </p>
          <Link to="/shop">
            <Button variant="secondary" size="large">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      <section className="container" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h2 className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>Featured Products</h2>
        <div className="grid-4-col">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center" style={{ marginTop: 'var(--spacing-xl)' }}>
          <Link to="/shop">
            <Button variant="primary">
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      <section className="container" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h2 className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>Why Shop With Us?</h2>
        <div className="grid-3-col">
          <div className="card text-center">
            <h3>Fast Shipping</h3>
            <p>Get your orders delivered quickly and reliably to your doorstep.</p>
          </div>
          <div className="card text-center">
            <h3>Secure Payments</h3>
            <p>Shop with confidence using our secure and encrypted payment gateways.</p>
          </div>
          <div className="card text-center">
            <h3>Quality Products</h3>
            <p>We source only the best products to ensure your satisfaction.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
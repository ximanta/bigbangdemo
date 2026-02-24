import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <div className="container" style={{ padding: 'var(--spacing-xl) 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--danger-color)' }}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-xl)' }}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/">
        <Button variant="primary" size="large">
          Go to Homepage
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
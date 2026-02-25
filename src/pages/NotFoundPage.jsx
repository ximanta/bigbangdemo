import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="main-content" style={{ textAlign: 'center', padding: '50px' }}>
      <div className="container">
        <h2 style={{ fontSize: '48px', color: '#e74c3c' }}>404</h2>
        <p style={{ fontSize: '24px', marginBottom: '20px' }}>Page Not Found</p>
        <p style={{ fontSize: '16px', color: '#555' }}>
          The page you are looking for does not exist.
        </p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '30px' }}>
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

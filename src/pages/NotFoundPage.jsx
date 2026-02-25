import React from 'react';
import { Link } from 'react-router-dom';
import { Frown } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div
      className="container text-center"
      style={{
        marginTop: '100px'
      }}
    >
      <Frown
        size={64}
        style={{
          color: '#7f8c8d'
        }}
      />
      <h1 style={{ fontSize: '3em', marginBottom: '10px' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.2em', marginBottom: '30px' }}>
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="button button-primary"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';

const NotFoundPage = () => {
  return (
    <div className="not-found-page section-padding">
      <div className="container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <CallToAction
          text="Go to Homepage"
          to="/"
          type="primary"
        />
      </div>
    </div>
  );
};

export default NotFoundPage;

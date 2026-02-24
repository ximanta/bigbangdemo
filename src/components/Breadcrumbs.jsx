import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <div className="breadcrumbs">
      <div className="container">
        <Link to="/">Home</Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const displayName = name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

          return isLast ? (
            <span key={routeTo}>
              <span> / </span>
              <strong>{displayName}</strong>
            </span>
          ) : (
            <span key={routeTo}>
              <span> / </span>
              <Link to={routeTo}>{displayName}</Link>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumbs;
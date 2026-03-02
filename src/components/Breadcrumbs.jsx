import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ol className="breadcrumbs-list">
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = name
              .replace(/-/g, ' ')
              .split(' ')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

            return isLast ? (
              <li key={name}>
                <span>
                  {displayName}
                </span>
              </li>
            ) : (
              <li key={name}>
                <Link to={routeTo}>
                  {displayName}
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Breadcrumbs;

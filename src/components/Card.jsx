import React from 'react';

const Card = ({ title, actions, children, className = '', ...props }) => {
  return (
    <div className={`card ${className}`.trim()} {...props}>
      {(title || actions) && (
        <div className="card-header">
          {title && <h3>{title}</h3>}
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Card;

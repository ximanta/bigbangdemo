import React from 'react';

const Button = ({ children, onClick, className = '', type = 'button', variant = 'primary', ...props }) => {
  const variantClass = `button-${variant}`;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

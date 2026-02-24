import React from 'react';

const Button = ({ children, onClick, variant = 'primary', size = 'medium', className = '', ...props }) => {
  const baseClass = 'button';
  const variantClass = `button-${variant}`;
  const sizeClass = `button-${size}`;

  return (
    <button
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`.trim()}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
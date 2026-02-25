import React from 'react';

const Button = ({ children, onClick, variant = 'primary', type = 'button', disabled = false }) => {
  const className = `btn btn-${variant}`;

  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

import React from 'react';

function Button({ children, onClick, variant = 'primary', type = 'button', disabled = false }) {
  const buttonClass = `button button-${variant}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClass}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;

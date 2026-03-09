import React from 'react';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  className = '',
  icon: IconComponent,
  ...props
}) => {
  const baseClass = 'button';
  const variantClass = `button-${variant}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${variantClass} ${className}`.trim()}
      {...props}
    >
      {IconComponent && <IconComponent size={20} />}
      {children}
    </button>
  );
};

export default Button;

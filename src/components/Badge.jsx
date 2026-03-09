import React from 'react';

const Badge = ({ children, variant = 'info', className = '', ...props }) => {
  const baseClass = 'badge';
  const variantClass = `badge-${variant}`;

  return (
    <span
      className={`${baseClass} ${variantClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;

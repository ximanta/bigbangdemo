import React from 'react';

const Alert = ({ message, type = 'info', onClose }) => {
  if (!message) return null;

  const alertClass = `alert alert-${type}`;

  return (
    <div className={alertClass} role="alert">
      {message}
      {onClose && (
        <button onClick={onClose} className="button button-link" style={{ float: 'right' }}>
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
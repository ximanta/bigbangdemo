import React, { useEffect } from 'react';

const AlertMessage = ({ message, type = 'success', show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) {
    return null;
  }

  return (
    <div className={`alert-message ${type} ${show ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default AlertMessage;

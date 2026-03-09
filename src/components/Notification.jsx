import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

function Notification({ message, type = 'info', onClose, duration = 5000 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  let IconComponent;
  switch (type) {
    case 'success':
      IconComponent = CheckCircle;
      break;
    case 'error':
      IconComponent = AlertCircle;
      break;
    case 'info':
    default:
      IconComponent = Info;
      break;
  }

  return (
    <div className={`notification-bar ${type}`}>
      <IconComponent size={20} />
      <span>{message}</span>
      <button onClick={handleClose} className="notification-close-button">
        <X size={18} />
      </button>
    </div>
  );
}

export default Notification;

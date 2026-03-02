import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const NotificationToast = ({ message, type, id, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the toast
    setIsVisible(true);

    // Automatically dismiss after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onDismiss(id), 500); // Allow fadeOut animation
    }, 4000);

    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  const toastClass = `notification-toast ${type} ${isVisible ? 'visible' : ''}`;

  return (
    <div className={toastClass}>
      <span className="icon">
        {type === 'success' && <CheckCircle />}
        {type === 'error' && <XCircle />}
      </span>
      <span className="message">{message}</span>
    </div>
  );
};

export default NotificationToast;

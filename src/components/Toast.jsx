import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

function Toast({ message, type = 'info', onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose();
      }
    }, 3000); // Toast disappears after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  const Icon = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  }[type];

  return (
    <div className={`toast ${type}`}>
      {Icon && <Icon size={20} />}
      <span>{message}</span>
    </div>
  );
}

// Toast container for managing multiple toasts
function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
}

export default ToastContainer;
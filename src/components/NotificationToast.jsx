import React,
{
  useEffect,
  useState
}
from 'react';
import {
  CheckCircle,
  XCircle,
  Info,
  X
}
from 'lucide-react';

export const NotificationToast = ({ message,
  type = 'info',
  onClose,
  duration = 3000 }) => {
  const [visible,
    setVisible]
  = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        setTimeout(onClose, 500); // Allow fadeOut animation to complete
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <XCircle size={20} />;
      case 'info':
      default:
        return <Info size={20} />;
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="toast-container">
      <div className={`toast ${type}`}>
        {getIcon()}
        <span>{message}</span>
        <button
          onClick={() => {
            setVisible(false);
            if (onClose) {
              setTimeout(onClose, 500);
            }
          }}
          className="button-link"
          style={{
            marginLeft: 'auto',
            color: 'white'
          }}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

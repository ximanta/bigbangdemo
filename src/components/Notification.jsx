import React from 'react';
import { Info, CheckCircle, XCircle, AlertTriangle, X } from 'lucide-react';

const Notification = ({ id, message, type, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle color="var(--success-color)" />;
      case 'error':
        return <XCircle color="var(--danger-color)" />;
      case 'warning':
        return <AlertTriangle color="var(--warning-color)" />;
      case 'info':
      default:
        return <Info color="var(--info-color)" />;
    }
  };

  return (
    <div className={`notification notification-${type}`}>
      <div className="notification-icon">{getIcon()}</div>
      <div className="notification-message">{message}</div>
      <button onClick={() => onClose(id)} className="notification-close">
        <X size={18} />
      </button>
    </div>
  );
};

export default Notification;

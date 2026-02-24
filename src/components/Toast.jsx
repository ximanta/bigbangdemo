import React,
{
  useEffect,
  useState
} from "react";
import {
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";

const Toast = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  },
    [message]
  );

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={20} />;
      case "error":
        return <XCircle size={20} />;
      case "warning":
        return <AlertTriangle size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className={`toast-container`}>
      {
        message && (
          <div className={`toast ${type} ${isVisible ? "show" : ""}`}>
            <span className="toast-icon">
              {getIcon()}
            </span>
            <span className="toast-message">
              {message}
            </span>
          </div>
        )
      }
    </div>
  );
};

export default Toast;

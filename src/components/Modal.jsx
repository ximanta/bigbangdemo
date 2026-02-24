import React,
{
  useEffect,
  useRef
} from "react";
import { X } from "lucide-react";

const Modal = (
  {
    isOpen,
    onClose,
    title,
    children,
    footerContent
  }
) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },
    [isOpen,
      onClose]
  );

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
      <div
        className="modal-content"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 id="modal-title">
            {title}
          </h2>
          <button
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        {
          footerContent && (
            <div className="modal-footer">
              {footerContent}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Modal;

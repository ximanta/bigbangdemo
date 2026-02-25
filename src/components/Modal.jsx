import React from 'react';
import { X } from 'lucide-react';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children, footerButtons }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        {footerButtons && footerButtons.length > 0 && (
          <div className="modal-footer">
            {footerButtons.map((buttonProps, index) => (
              <Button key={index} {...buttonProps} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

import React from 'react';

function EmptyState({ message, icon: IconComponent, actionButton }) {
  return (
    <div className="empty-state">
      {IconComponent && <IconComponent size={60} />}
      <p className="empty-state-message">{message}</p>
      {actionButton && (
        <div className="empty-state-action">
          {actionButton}
        </div>
      )}
    </div>
  );
}

export default EmptyState;
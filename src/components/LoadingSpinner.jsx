import React from 'react';

function LoadingSpinner() {
  return (
    <div className="loading-spinner-wrapper">
      <div className="loading-spinner" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <p>Loading content...</p>
    </div>
  );
}

export default LoadingSpinner;

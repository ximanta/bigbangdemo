import React from "react";

const LoadingSpinner = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="loading-spinner-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="spinner"></div>
  );
};

export default LoadingSpinner;

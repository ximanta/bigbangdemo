import React from 'react';

function ErrorMessage({ message }) {
  return (
    <div className="error-message" role="alert">
      <p>Error: {message}</p>
    </div>
  );
}

export default ErrorMessage;

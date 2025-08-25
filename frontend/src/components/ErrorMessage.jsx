import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-icon">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <h3>Oops! Something went wrong</h3>
        <p className="error-message">{message}</p>
        <div className="error-suggestions">
          <h4>Here are some things you can try:</h4>
          <ul>
            <li>Check your internet connection</li>
            <li>Make sure the topic is appropriate for primary school</li>
            <li>Try using a different topic or fewer questions</li>
            <li>Wait a moment and try again</li>
          </ul>
        </div>
        <button onClick={onRetry} className="retry-btn">
          <i className="fas fa-redo"></i>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
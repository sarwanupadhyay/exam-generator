import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-card">
        <div className="loading-icon">
          <i className="fas fa-brain"></i>
        </div>
        <h3>AI is Creating Your Exam</h3>
        <div className="loading-steps">
          <div className="step active">
            <i className="fas fa-file-alt"></i>
            <span>Questions</span>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <i className="fas fa-cog"></i>
            <span>Processing</span>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <i className="fas fa-check"></i>
            <span>Complete</span>
          </div>
        </div>
        <p className="loading-text">Creating grade-appropriate questions...</p>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
        <p className="loading-note">This usually takes 10-30 seconds...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
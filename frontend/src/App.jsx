import React, { useState } from 'react';
import './App.css';
import ExamGenerator from './components/ExamGenerator';
import ExamDisplay from './components/ExamDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [examData, setExamData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateExam = (data) => {
    setExamData(data);
    setError(null);
  };

  const handleLoadingChange = (loading) => {
    setIsLoading(loading);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setExamData(null);
  };

  const handleGenerateNew = () => {
    setExamData(null);
    setError(null);
  };

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <div className="header-content">
            
            <h1>AI Exam Generator</h1>
          </div>
        </header>

        <main className="main-content">
          {!examData && !isLoading && (
            <div className="generator-section">
              <ExamGenerator
                onGenerate={handleGenerateExam}
                onLoadingChange={handleLoadingChange}
                onError={handleError}
              />
            </div>
          )}

          {isLoading && (
            <div className="loading-section">
              <LoadingSpinner />
            </div>
          )}

          {error && (
            <div className="error-section">
              <ErrorMessage message={error} onRetry={handleGenerateNew} />
            </div>
          )}

          {examData && !isLoading && (
            <div className="exam-section">
              <ExamDisplay examData={examData} onGenerateNew={handleGenerateNew} />
            </div>
          )}
        </main>

        <footer className="app-footer no-print">
          <p>&copy; 2025 AI Exam Generator. Built for educators.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
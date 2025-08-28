import React, { useState } from 'react';
import axios from 'axios';
import './ExamGenerator.css';

const ExamGenerator = ({ onGenerate, onLoadingChange, onError }) => {
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [gradeLevel, setGradeLevel] = useState(1);
  const [difficulty, setDifficulty] = useState('easy');

  const Topics = [
    'Plant and Agriculture',
    'Human Biology',
    'Multiplication',
    'Division',
    'Fractions',
    'Chemical Reactions',
    'Word Problems',
    'Computer Science'
  ];

  const handleTopicSelect = (topicName) => {
    setSelectedTopic(topicName);
    setTopic(topicName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      onError('Please enter a  topic');
      return;
    }

    if (questionCount < 1 || questionCount > 30) {
      onError('Please enter a number between 1 and 30 questions');
      return;
    }


    onLoadingChange(true);
    onError(null);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || "";

      const response = await axios.post(`${API_BASE_URL}/generate-exam`, {

        topic: topic.trim(),
        questionCount: parseInt(questionCount),
        gradeLevel: gradeLevel,
        difficulty: difficulty
      });


      onGenerate(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.error ||
        'Failed to generate exam. Please try again.';
      onError(errorMessage);
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <div className="exam-generator">
      <div className="generator-card">
        <div className="card-header">
          <div className="logo">
            <i className="fas fa-brain"></i>
          </div>
          <h2>AI Exam Paper Generator</h2>
          <p>Create custom  exams for your school students</p>
        </div>

        <form onSubmit={handleSubmit} className="generator-form">
          <div className="form-group">
            <label htmlFor="topic">
              <i className="fas fa-book"></i>
              Topic
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Addition, Multiplication, Fractions"
              className="form-input"
            />

            <div className="topic-buttons">
              {Topics.map((topicName) => (
                <button
                  key={topicName}
                  type="button"
                  onClick={() => handleTopicSelect(topicName)}
                  className={`topic-btn ${selectedTopic === topicName ? 'active' : ''}`}
                >
                  {topicName}
                </button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="questions">
                <i className="fas fa-hashtag"></i>
                Questions
              </label>
              <select
                id="questions"
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
                className="form-select"
              >
                {[...Array(30)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} Question{i + 1 !== 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="grade">
                <i className="fas fa-graduation-cap"></i>
                Grade Level
              </label>
              <select
                id="grade"
                value={gradeLevel}
                onChange={(e) => setGradeLevel(parseInt(e.target.value))}
                className="form-select"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Grade {i + 1}
                  </option>
                ))}
              </select>
            </div>


            <div className="form-group">
              <label htmlFor="difficulty">
                <i className="fa fa-line-chart"></i>
                Difficulty
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="form-select"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

          </div>

          <button type="submit" className="generate-btn">
            <i className="fas fa-magic"></i>
            Generate Exam
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExamGenerator;
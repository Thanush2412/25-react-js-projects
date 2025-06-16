import React, { useState, useEffect } from 'react';
import { quizData } from '../data';
import './Quiz.css';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (!showScore && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleNextQuestion();
    }
  }, [timeLeft, showScore, isAnswered]);

  const handleAnswerClick = (selectedOption) => {
    if (isAnswered) return;

    setSelectedAnswer(selectedOption);
    setIsAnswered(true);

    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const getOptionClass = (option) => {
    if (!isAnswered) return 'option';
    if (option === quizData[currentQuestion].correctAnswer) return 'option correct';
    if (option === selectedAnswer && option !== quizData[currentQuestion].correctAnswer) {
      return 'option incorrect';
    }
    return 'option';
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          <h2>Quiz Completed!</h2>
          <p>You scored {score} out of {quizData.length}</p>
          <button onClick={handleRestart}>Restart Quiz</button>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{quizData.length}
            </div>
            <div className="timer">Time Left: {timeLeft}s</div>
            <div className="question-text">
              {quizData[currentQuestion].question}
            </div>
          </div>
          <div className="answer-section">
            {quizData[currentQuestion].options.map((option) => (
              <button
                key={option}
                className={getOptionClass(option)}
                onClick={() => handleAnswerClick(option)}
                disabled={isAnswered}
              >
                {option}
              </button>
            ))}
          </div>
          {isAnswered && (
            <div className="next-button">
              <button onClick={handleNextQuestion}>
                {currentQuestion + 1 === quizData.length ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz; 
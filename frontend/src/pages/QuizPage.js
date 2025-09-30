import React, { useContext, useEffect, useState, useCallback } from "react";
import { QuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { getQuiz, submitQuiz } from "../api";

export default function QuizPage() {
  const { questions, setQuestions, answers, updateAnswer, setScore,setDetails } = useContext(QuizContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);

  const navigate = useNavigate();
  

  useEffect(() => {
    async function loadQuestions() {
      try {
        const data = await getQuiz();
        setQuestions(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      }
    }
    loadQuestions();
  }, [setQuestions]);
  

  // Wrap handleSubmit in useCallback
const handleSubmit = useCallback(async () => {
  const payload = {
    answers: Object.entries(answers).map(([question_id, selected]) => ({
      question_id: parseInt(question_id),
      selected,
    })),
  };
  try {
    const result = await submitQuiz(payload);
    setScore(result.score);
    setDetails(result.details); // ✅ store details for ResultPage
    navigate("/result");
  } catch (err) {
    console.error("Failed to submit quiz:", err);
  }
}, [answers, setScore, setDetails, navigate]);


  // Timer countdown
  useEffect(() => {
    if (loading || questions.length === 0) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, loading, questions, handleSubmit]);

  if (loading) return <p className="container">Loading quiz...</p>;
  if (questions.length === 0) return <p className="container">No questions available.</p>;

  const currentQ = questions[currentIndex];

  const handleOptionChange = (optionIndex) => {
    updateAnswer(currentQ.id, optionIndex);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSubmit();
    }
  };
  

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
  <div className="container">
    <h2>Question {currentIndex + 1} of {questions.length}</h2>

    {/* Progress Bar */}
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progressPercent}%` }}></div>
    </div>

    {/* Question Text */}
    <p className="question-text">{currentQ.text}</p>

    {/* Options */}
    {currentQ.options.map((opt, i) => (
      <label key={i} className="option">
        <input
          type="radio"
          name={`q${currentQ.id}`}
          checked={answers[currentQ.id] === i}
          onChange={() => handleOptionChange(i)}
        />
        {opt}
      </label>
    ))}

    {/* Navigation Buttons */}
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
      <button disabled={currentIndex === 0} onClick={() => setCurrentIndex(currentIndex - 1)}>
        Previous
      </button>
      <button onClick={handleNext}>
        {currentIndex === questions.length - 1 ? "Submit" : "Next"}
      </button>
    </div>

    {/* Timer */}
    <p className="timer">Time left: {timeLeft}s</p>
  </div>
);

}

// src/pages/ResultPage.js
import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

export default function ResultPage() {
  const { score, details, resetQuiz } = useContext(QuizContext);
  const navigate = useNavigate();

  const handleRestart = () => {
    resetQuiz();
    navigate("/");
  };

  return (
    <div className="container">
    <h2>Your Score: {score}/{details.length}</h2>


      <h3>Review Questions</h3>
      <div className="review-section">
  {details?.map((item, i) => (
    <div key={i} className="result-item">
      <p><strong>Q{i + 1}:</strong> {item.question}</p>
      <p>
        {item.correct ? (
          <span className="correct">Correct</span>
        ) : (
          <span className="incorrect">Incorrect</span>
        )}
      </p>
    </div>
  ))}
</div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={handleRestart}>Restart Quiz</button>
      </div>
    </div>
  );
}


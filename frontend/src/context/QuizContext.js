// src/context/QuizContext.js
import React, { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [details, setDetails] = useState([]); // ✅ store result details

  const updateAnswer = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const resetQuiz = () => {
    setAnswers({});
    setScore(null);
    setQuestions([]);
    setDetails([]); // ✅ reset details too
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        setQuestions,
        answers,
        setAnswers,
        updateAnswer,
        score,
        setScore,
        details,       // ✅ expose details
        setDetails,    // ✅ expose setter
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

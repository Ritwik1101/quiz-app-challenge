// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // 👈 Make sure to import these
import { QuizProvider } from "./context/QuizContext";              
import StartPage from "./pages/StartPage";                          
import QuizPage from "./pages/QuizPage";                            
import ResultPage from "./pages/ResultPage";                       

function App() {
  return (
    <QuizProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  );
}

export default App; // 👈 Make sure to export default

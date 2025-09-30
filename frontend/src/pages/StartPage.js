import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Quiz 🎉</h1>
      <button onClick={() => navigate("/quiz")}>Start Quiz</button>
    </div>
  );
}

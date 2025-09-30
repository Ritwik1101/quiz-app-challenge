export async function getQuiz() {
  const res = await fetch("http://127.0.0.1:8000/quiz");
  return res.json();
}

export async function submitQuiz(data) {
  const res = await fetch("http://127.0.0.1:8000/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

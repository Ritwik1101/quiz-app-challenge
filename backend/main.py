from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal
from models import Question
from schemas import QuestionOut, SubmitRequest, Result, ResultDetail

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Enable CORS so frontend (localhost:3000) can access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Get all quiz questions (without answers)
@app.get("/quiz", response_model=list[QuestionOut])
def get_quiz(db: Session = Depends(get_db)):
    questions = db.query(Question).all()
    result = []
    for q in questions:
        result.append({
            "id": q.id,
            "text": q.text,
            "options": [opt.text for opt in q.options]
        })
    return result

# Submit answers and calculate score
@app.post("/submit", response_model=Result)
def submit_quiz(submission: SubmitRequest, db: Session = Depends(get_db)):
    score = 0
    details = []

    for ans in submission.answers:
        q = db.query(Question).filter(Question.id == ans.question_id).first()
        if not q:
            continue
        is_correct = (ans.selected == q.correct_option)
        if is_correct:
            score += 1
        details.append(ResultDetail(question=q.text, correct=is_correct))

    total_questions = db.query(Question).count()   # <-- total questions
    return Result(score=score, total=total_questions, details=details)


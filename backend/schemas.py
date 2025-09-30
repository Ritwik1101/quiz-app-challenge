from pydantic import BaseModel

class QuestionOut(BaseModel):
    id: int
    text: str
    options: list[str]

    class Config:
        orm_mode = True

class SubmitAnswer(BaseModel):
    question_id: int
    selected: int  # index of option chosen

class SubmitRequest(BaseModel):
    answers: list[SubmitAnswer]

class ResultDetail(BaseModel):
    question: str
    correct: bool

class Result(BaseModel):
    score: int
    total:int
    details: list[ResultDetail]

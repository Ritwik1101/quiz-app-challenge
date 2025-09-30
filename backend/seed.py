
from database import SessionLocal, engine, Base
from models import Question, Option

Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Clear old data
db.query(Option).delete()
db.query(Question).delete()


# 1️⃣ Python Basics
q1 = Question(text="What is the output of: print(2 ** 3)?", correct_option=0)
q1.options = [
    Option(text="8"),
    Option(text="6"),
    Option(text="9"),
    Option(text="Error")
]

# 2️⃣ Python Lists
q2 = Question(text="Which method adds an item to the end of a Python list?", correct_option=1)
q2.options = [
    Option(text="insert()"),
    Option(text="append()"),
    Option(text="add()"),
    Option(text="extend()")
]

# 3️⃣ JavaScript Basics
q3 = Question(text="What is the correct syntax to declare a variable in JavaScript?", correct_option=0)
q3.options = [
    Option(text="let x = 5;"),
    Option(text="int x = 5;"),
    Option(text="var x := 5;"),
    Option(text="x = 5")
]

# 4️⃣ JavaScript Array
q4 = Question(text="Which array method removes the last element from an array?", correct_option=2)
q4.options = [
    Option(text="shift()"),
    Option(text="pop(0)"),
    Option(text="pop()"),
    Option(text="remove()")
]

# 5️⃣ React Basics
q5 = Question(text="Which hook is used to manage state in a React functional component?", correct_option=1)
q5.options = [
    Option(text="useEffect"),
    Option(text="useState"),
    Option(text="useContext"),
    Option(text="useReducer")
]

# 6️⃣ CSS Question
q6 = Question(text="Which property is used to change text color in CSS?", correct_option=0)
q6.options = [
    Option(text="color"),
    Option(text="font-color"),
    Option(text="text-color"),
    Option(text="background-color")
]

db.add_all([q1, q2, q3, q4, q5, q6])
db.commit()
db.close()

print("✅ Programming database seeded!")

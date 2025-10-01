# quiz-app-challenge
Quiz App Project Description This is a web-based Quiz Application built with ReactJS for the frontend and FastAPI for the backend. It allows users to take programming-related quizzes, tracks answers, calculates scores, and provides a review of correct/incorrect answers. The backend uses PostgreSQL as the database.

### Setup Instructions Backend Ensure you have Python 3.10+ installed. Install dependencies:

#pip install -r requirements.txt

### Set up PostgreSQL and create a database named quizdb (or as per your .env):

#CREATE DATABASE quizdb;

### Seed the database with initial questions:

#python seed.py

### Start the backend server:

#uvicorn main:app --reload The backend will run at: http://localhost:8000

Frontend

### Navigate to the frontend folder:

#cd frontend

### Install dependencies:

#npm install

### Start the React app:

#npm start

The app will run at: http://localhost:3000

### Running Test Cases:
Currently, no automated test cases are included. 
To test functionality:
Open the frontend app in your browser.
Attempt the quiz, submit answers, and verify that the score and review page display correctly.

### Assumptions / Design Choices:
The quiz contains programming and one React-related question.
The backend returns score and total number of questions to display results as 5/6 format. 
Quiz questions are loaded dynamically from the database via FastAPI endpoints. 
React Context API is used for state management (questions, answers, score). 
Frontend styling uses CSS with off-white background and neatly aligned questions. 
Simple timer and progress bar are included for each quiz.

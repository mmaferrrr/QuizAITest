# LRNR Quiz Page

Welcome to **LRNR Quiz Page**, an interactive quiz application built using Node.js and React, designed to create customized quizzes based on user input. This application utilizes the Claude API to generate and evaluate quizzes, a unique and personalized learning experience.

![Quiz](./public/evaluation-exam-svgrepo-com.svg)

## Features

- **Customizable Quizzes**: Users can generate quizzes by selecting the topic, expertise level, number of questions, and question style.
- **Interactive Quiz Experience**: After the quiz loads, users are prompted to answer each question in a text area.
- **Real-time Feedback**: Upon submission, the AI evaluates the answer and informs the user whether their response was correct or incorrect.
- **Single Submission Per Question**: Users can only submit their answer once per question.
- **Score Tracking**: At the end of the quiz, users see how many questions they answered correctly out of the total.
- **Retry Option**: Users have the opportunity to retake the quiz after completing it.

## Installation

To run this project locally, follow these steps:

- **git clone**:https://github.com/SoSaLay/Claude-Quiz-AI

- **Locate Claude-Quiz-AI folder and open in code editor**

- **Install Dependencies**:Make sure you have Node.js and npm (Node Package Manager) installed. Then in terminal run: npm install

- **Install Chakra UI**:Chakra UI is a component library that provides the building blocks needed to build your React application. Install it by running:
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion

- **Set Up the Environment**:Configure your API keys and environment variables as needed. This might involve setting up a .env file to store your Claude API key.

- **Run the Application**:Start the development server by using 'npm run dev' instead of 'npm start' to run the server and React app concurrently. The application will be available at http://localhost:3000.

## Usage

#### Generate a Quiz:

Upon visiting the LRNR Quiz Page, select your desired options for topic, expertise level, number of questions, and question style.
Click the "Submit" button to generate the quiz.

#### Answer Questions:

Once the quiz is generated, you'll be presented with a question and a text area where you can type your answer.
After typing your answer, click "Submit" to get feedback on whether your answer was correct or incorrect.
You can only submit an answer once per question.

#### View Your Score:

After completing all the questions, you'll see your score, showing how many answers you got correct out of the total number of questions.
You'll also have the option to retake the quiz if you wish.


## Expanding or Rebuilding the Project
If you want to rebuild or expand on this application, you'll need to ensure you have the following installed:

Node.js: The JavaScript runtime for server-side development.
React: The JavaScript library for building user interfaces.
Chakra UI: The component library used to style and build the UI.
NPM (Node Package Manager): To manage dependencies.
Claude API or other AI APIs


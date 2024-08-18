import React, { useState } from 'react';
import './QuizGeneration.css';
import { Spinner, Center, VStack } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

import { Stack,  Box, Select, FormControl, FormLabel } from "@chakra-ui/react";



const  QuizGeneration = () => {
    
    //useState hooks keep track of information that can changes while app is running

    //EX: questionCount is a state variable that starts at 5
    //setQuestionCount is a function to change data if needed

    const [questionCount, setQuestionCount] = useState('5');
    const [topic, setTopic] = useState('Golang');
    const [difficulty, setDifficulty] = useState('novice');
    const [style, setStyle] = useState('normal');
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [evaluation, setEvaluation] = useState(null);
    const [quizStarted, setQuizStarted] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [answerSubmitted, setAnswerSubmitted] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    
    
    // sends request to server to generate quiz
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);


        //fetch to send a request to server, server expects data about quiz
        try {
            const response = await fetch('http://localhost:3001/generate-quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ numQuestions: questionCount, topic, difficulty, style }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate quiz');
            }

        //If all is good we store generated quiz questions in updated state to be displayed    
        //and mark that the quiz has started
        const data = await response.json();
            setQuiz(data.questions);
            setQuizStarted(true);
        } 
        catch (error) {
            console.error('Error:', error);
            alert(error.message);
        } finally {
          setIsLoading(false); //loading to false when request is complete
      }

    };


    //handles users answer submission to the server for evaluation
    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        if (answerSubmitted) return; // Prevent multiple submissions
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3001/evaluate-answer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // text of the current question & answer, coverted into JSON string
                body: JSON.stringify({ 
                    question: quiz[currentQuestionIndex].question, 
                    userAnswer,
                    style
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to evaluate answer');
            }

            //If all is good stores evaluation result in component's state
            const data = await response.json();
            setEvaluation(data.evaluation);
            
            //server indicates if user's answer was correct, updates count of correct answers
            if (data.isCorrect) {
                setCorrectAnswers(prev => prev + 1);
            }
        setAnswerSubmitted(true);
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }finally {
          setIsLoading(false); // Set loading to false when submission is complete
      }
    };


    const handleNextQuestion = () => {
        //compares next Qs index with the total number of Qs(should quiz continue?)
        if (currentQuestionIndex + 1 < quiz.length) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setUserAnswer('');//clears answer
            setEvaluation(null);//resets evaluation 
            setAnswerSubmitted(false); // reset for the next question
        } else {
            setQuizCompleted(true);
        }
    };

    //resets the quiz to its initial state
    const restartQuiz = () => {
        setQuizStarted(false);
        setQuiz(null);
        setCurrentQuestionIndex(0);
        setUserAnswer('');
        setEvaluation(null);
        setAnswerSubmitted(false);
        setCorrectAnswers(0);
        setQuizCompleted(false);
    };
    

    // displays quiz genreation to get started using conditional rendering
    //"onchange" function: selected value is stored in state, updated whenever a new option is picked
    
    if (!quizStarted) {
      return (
        <Box className="quiz-generator" width="80%" maxWidth="100%" px={4}>
          <VStack spacing={8} align="stretch" width="100%">
            <h2>Quiz Generation Options</h2>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <VStack spacing={6} align="stretch" width="100%">
                <FormControl width="100%">
                  <FormLabel htmlFor="topic">Topic</FormLabel>
                  <Select
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    variant="flushed"
                    placeholder="Select a topic"
                    borderColor="gray.300"
                    width="100%"
                    size="lg"
                    mb={4}
                  >
                    <option value="golang">golang</option>
                    <option value="aws">aws</option>
                    <option value="javascript">javascript</option>
                    <option value="cicd">CI/CD</option>
                    <option value="homegardens">home gardens</option>
                    <option value="coffee">coffee</option>
                    <option value="fingerfoods">finger foods</option>
                  </Select>
                </FormControl>
    
                <FormControl width="100%">
                  <FormLabel htmlFor="difficulty">Expertise</FormLabel>
                  <Select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    variant="flushed"
                    placeholder="Select expertise"
                    borderColor="gray.300"
                    width="100%"
                    size="lg"
                    mb={4}
                  >
                    <option value="novice">Novice</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </Select>
                </FormControl>
    
                <FormControl width="100%">
                  <FormLabel htmlFor="questionCount">Number of questions</FormLabel>
                  <Select
                    id="questionCount"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(e.target.value)}
                    variant="flushed"
                    borderColor="gray.300"
                    width="100%"
                    size="lg"
                    mb={4}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                  </Select>
                </FormControl>
    
                <FormControl width="100%">
                  <FormLabel htmlFor="style">Style of questions</FormLabel>
                  <Select
                    id="style"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    variant="flushed"
                    placeholder="Select style"
                    borderColor="gray.300"
                    width="100%"
                    size="lg"
                    mb={4}
                  >
                    <option value="normal">normal</option>
                    <option value="masteroogway">Master Oogway</option>
                    <option value="gangster">1940s Gangster</option>
                    <option value="childlike">Like I'm an 8 year old</option>
                    <option value="jedi">Jedi</option>
                    <option value="jacksparrow">Captain Jack Sparrow</option>
                    <option value="mcconaughey">Matthew McConaughey</option>
                  </Select>
                </FormControl>
    
              <Button 
              type="submit" 
              isLoading={isLoading} 
              width="auto"        // or use a specific value like "20%" or "100px"
              mt={8}
              colorScheme="green"
              size="sm"
              alignSelf="flex-start"   // aligns the button to the left in a flex container
              textAlign="left"         // ensures text alignment inside the button is left
            >
              Submit
            </Button>
              </VStack>
            </form>
          </VStack>
        </Box>
      );
    }
   

    if (isLoading) {
      return (
        <Center h="100vh">
          <VStack spacing={4}>
            <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500"  width="250px" height="250px" />
            <Text fontSize="50px">Loading...</Text>
          </VStack>
        </Center>
      );
    }

    if (!quiz || quiz.length === 0) {
        return <div>Loading quiz...</div>;
    }


    //if quiz has been completed display results, correct out of the total
    if (quizCompleted) {
        return (
            <div className="quiz-results">
                <h2>Quiz Completed!</h2>
                <p>Correct Answers: {correctAnswers} out of {quiz.length}</p>
                <button onClick={restartQuiz}>Try Another Quiz</button>
            </div>
        );
    }

    
    //renders question number and total number of questions 
    //Answer Submission &  Display Evaluation
    return (
        <div className="quiz-question">
            <h2>{currentQuestionIndex + 1} of {quiz.length}</h2>
            <h3>Question</h3>
            <p>{quiz[currentQuestionIndex].question}</p>
            <div className="answer-section">
                <h3>Your Answer</h3>
                <form onSubmit={handleAnswerSubmit}>
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Type your answer here"
                        disabled={answerSubmitted }
                    />
                        <Button 
                          type="submit" 
                          isLoading={isLoading}
                          disabled={answerSubmitted}
                      >
                          SUBMIT ANSWER
                      </Button>
                </form>
            </div>
            {evaluation && (
                <div className="evaluation">
                    <h3>Verner's Evaluation</h3>
                    <p>{evaluation}</p>
                    <button onClick={handleNextQuestion}>NEXT</button>
                </div>
            )}
        </div>
    );

};



export default QuizGeneration

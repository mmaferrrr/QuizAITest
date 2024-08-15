const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;


app.post('/generate-quiz', async (req, res) => {

//Extracts Data sent by the client(React app)
//Prompt string is created to instruct the AI to generate  quiz

const { numQuestions, topic, difficulty, style } = req.body;
const prompt = `
Generate a quiz with EXACTLY ${numQuestions} questions on the topic of ${topic} at a ${difficulty} level.
The questions and answers should be written in a ${style} style.
Format each question as follows:

Question 1: [The question text in ${style} style]
Answer: [The correct answer]

Question 2: [The question text in ${style} style]
Answer: [The correct answer]

... continue until you have EXACTLY ${numQuestions} questions and answers.

Do not include any additional text before or after the questions and answers.
`;


    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'API key is missing' });
    }

    try {
        //request to Anthropic API, headers ensures request is formatted, authenticated, and routed
        const response = await axios.post('https://api.anthropic.com/v1/messages', {
            model: "claude-3-opus-20240229",
            max_tokens: 1000,
            temperature: 0.7,
            messages: [
                { role: "user", content: prompt }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            }
        });

        if (!response.data || !response.data.content || !response.data.content[0] || !response.data.content[0].text) {
            throw new Error('Invalid response from Anthropic API');
        }

        //if api response is valid  extract and format the quiz questions 
        const questions = parseQuestions(response.data.content[0].text);

        if (questions.length !== parseInt(numQuestions)) {
            console.warn(`Expected ${numQuestions} questions, but parsed ${questions.length}`);
            // Trim or pad the questions array as needed
            const finalQuestions = questions.slice(0, parseInt(numQuestions));
            res.json({ questions: finalQuestions });
        } else {
            res.json({ questions });
        } 
    } 
    catch (error) {
        console.error('Error generating quiz:', error.response?.data || error.message);
        res.status(500).json({ error: 'Error generating quiz', details: error.message });
    }
});


app.post('/evaluate-answer', async (req, res) => {
    const { question, userAnswer, style } = req.body;
    
    const prompt = `
    Question: ${question}
    User's Answer: ${userAnswer}
    Style: ${style}

    Evaluate the user's answer. Start your response with either "Correct!" or "Incorrect." Then, provide feedback on the answer. Be sure to maintain the ${style} persona throughout your response. Remember, you're speaking directly to the user, not to developers.
    
    Take into account potential typos or minor spelling errors, and don't penalize the user for these if the core of their answer is correct.
    
    If the answer is incorrect, explain why and provide the correct answer.
    `;

    try {
        const response = await axios.post('https://api.anthropic.com/v1/messages', {
            model: "claude-3-opus-20240229",
            max_tokens: 1000,
            temperature: 0.7,
            messages: [
                { role: "user", content: prompt }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            }
        });

        if (!response.data || !response.data.content || !response.data.content[0] || !response.data.content[0].text) {
            throw new Error('Invalid response from Anthropic API');
        }

        const evaluationText = response.data.content[0].text;
        const isCorrect = evaluationText.trim().toLowerCase().startsWith('correct');

        res.json({ 
            evaluation: evaluationText,
            isCorrect: isCorrect
        });
    } catch (error) {
        console.error('Error evaluating answer:', error.response?.data || error.message);
        res.status(500).json({ error: 'Error evaluating answer', details: error.message });
    }
});


  //splits raw text at the word "Question:," creating an array 
    //to contain a question and its corresponding answer




    function parseQuestions(text) {
        // Remove any introductory text
        const cleanedText = text.replace(/^.*?(?=Question\s*\d+:|Question:)/s, '');
        
        // Split the text into individual questions
        const questionRegex = /(?:Question\s*\d+:|Question:)\s*(.*?)(?=(?:\n\s*(?:Question\s*\d+:|Question:)|$))/gs;
        const matches = [...cleanedText.matchAll(questionRegex)];
        
        return matches.map(match => {
            const fullQuestionText = match[1].trim();
            const [question, ...answerParts] = fullQuestionText.split(/\n\s*Answer:/i);
            const answer = answerParts.join('\n').trim();
    
            return {
                question: question.trim(),
                answer: answer || 'No answer provided'
            };
        }).filter(qa => qa.question && qa.answer !== 'No answer provided');
    }




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



// function parseQuestions(text) {
//     const questionAnswerPairs = text.split('Question:').filter(qa => qa.trim());
//     return questionAnswerPairs.map(qa => {
//         const [question, answer] = qa.split('Answer:');
//         return {
//             question: question.trim(),
//             answer: answer ? answer.trim() : 'No answer provided'
//         };
//     });
// }
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'; // imports functions from React Testing Library
import QuizGeneration from './pages/QuizGeneration';

describe('QuizGeneration Component', () => {
  test('renders quiz generation form initially', () => {

    //the quiz is remdered and extracted from the componets are text or labels
    const { getByText, getByLabelText } = render(<QuizGeneration />);

    // Check if the quiz options are rendered
    expect(getByText(/Quiz Generation Options/i)).toBeTruthy();

    // Check if Submit button is rendered
    expect(getByText(/Submit/i)).toBeTruthy();

   
    expect(getByLabelText(/Topic/i)).toBeTruthy();
    expect(getByLabelText(/Expertise/i)).toBeTruthy();
    expect(getByLabelText(/Number of questions/i)).toBeTruthy();
    expect(getByLabelText(/Style of questions/i)).toBeTruthy();
  });
});


describe('QuizGeneration Component - Form Submission', () => {
  test('shows alert if topic or difficulty is not selected on submit', () => {
    window.alert = jest.fn(); // allows the test to track when and what alert  message is called
    render(<QuizGeneration />);
    
    // Click Submit button without selecting topic or difficulty
    fireEvent.click(screen.getByText(/Submit/i));
    
    // is an alert is shown for missing topic?
    expect(window.alert).toHaveBeenCalledWith('Please select a topic');
    
    // Fill topic but leave difficulty empty
    fireEvent.change(screen.getByLabelText(/Topic/i), { target: { value: 'javascript' } });
    fireEvent.click(screen.getByText(/Submit/i));
  
    // is an alert is shown for missing difficulty?
    expect(window.alert).toHaveBeenCalledWith('Please select an expertise level.');
  });
});



describe('QuizGeneration Component', () => {

  test('renders the question and answer submission form when quiz starts', (done) => {
   
    const quizData = {
      questions: [
        { question: 'Sample question?' }
      ]
    };

    // simulates a successful API call that returns quiz questions
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(quizData),
      })
    );

   
    const { container, getByLabelText, getByText } = render(<QuizGeneration />);

    // filling out the form and submitting it
    fireEvent.change(getByLabelText('Topic'), { target: { value: 'javascript' } });
    fireEvent.change(getByLabelText('Expertise'), { target: { value: 'novice' } });
    fireEvent.click(getByText('Submit'));

    //simulate waiting for the quiz to be fetched and rendered
    setTimeout(() => {
    
      // question is rendered inside <p> tag and should match expected question
      const questionText = container.querySelector('p'); 
      expect(questionText.textContent).toMatch(/Sample question\?/i);

      //input field for the answer is rendered
      const answerInput = container.querySelector('input[type="text"]');
      expect(answerInput).not.toBeNull();
      expect(answerInput.placeholder).toMatch(/Type your answer here/i);

      done(); // Signal to Jest that the async test is complete
    }, 1000); 
  });
});
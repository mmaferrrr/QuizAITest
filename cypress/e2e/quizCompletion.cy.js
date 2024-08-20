describe('Quiz Completion', () => {
    it('should display the results after completing the quiz', () => {
      cy.visit('http://localhost:3000/quizgeneration');
      cy.get('select#topic').select('javascript');
      cy.get('select#difficulty').select('novice');
      cy.get('button[type="submit"]').click();
      cy.contains('Question', { timeout: 15000 }).should('be.visible');
      const numQuestions = 5;
      for (let i = 0; i < numQuestions; i++) {
        cy.get('input[placeholder="Type your answer here"]').type('test answer');
        cy.get('button').contains('SUBMIT ANSWER').click();
        cy.get('.evaluation', { timeout: 15000 }).should('be.visible').and('contain', 'Verner\'s Evaluation');
        if (i < numQuestions - 1) {
          cy.get('button').contains('NEXT').click();
          cy.contains('Question', { timeout: 15000 }).should('be.visible');
        } else {
          cy.get('button').contains('NEXT').click({ force: true });
          cy.contains('Quiz Completed!', { timeout: 15000 }).should('be.visible');
        }
      }
      cy.contains('Correct Answers').should('be.visible');
      cy.get('.quiz-results').should('contain', 'Correct Answers:');
    });
  });










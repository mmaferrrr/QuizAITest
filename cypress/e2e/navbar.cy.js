describe('Navbar Navigation', () => {
    it('should navigate to the Quiz Generation page when the link is clicked', () => {
      cy.visit('http://localhost:3000/');
      cy.contains('Quiz Generation').click();
      cy.url().should('include', '/quizgeneration');
      cy.contains('Quiz Generation Options');
    });
    
    it('should navigate to the Account page when the link is clicked', () => {
      cy.visit('http://localhost:3000/');
      cy.contains('Account').click();
      cy.url().should('include', '/account');
      cy.contains('You have a streak of 5 days!');
    });
  });
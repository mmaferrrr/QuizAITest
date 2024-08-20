describe('QuizGeneration Page Load and Form Interaction', () => {
 it('should load the QuizGeneration page and allow user to select options', () => { 
    cy.visit('http://localhost:3000/quizgeneration'); 
    cy.contains('Quiz Generation Options'); 
    cy.get('select#topic').should('be.visible'); 
    cy.get('select#difficulty').should('be.visible'); 
    cy.get('select#questionCount').should('be.visible'); 
    cy.get('select#style').should('be.visible'); 
    cy.get('select#topic').select('javascript'); 
    cy.get('select#difficulty').select('novice'); 
    cy.get('select#questionCount').select('5'); 
    cy.get('select#style').select('normal'); 
    cy.get('button[type="submit"]').click(); }); });
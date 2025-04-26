describe('answering', () => {
  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit('/');
  });

  it('should answer questions using the keyboard', () => {

    // Ensure the question is visible before proceeding
    cy.get("div[data-cy='question']").should('exist');

    // Simulate answering questions using the '1' key and 'space' bar
    cy.window().then((win) => {
      // Loop through to simulate answering multiple questions
      for (let i = 0; i < 11; i++) {
        // Simulate pressing '1' to answer the question
        cy.get("div[data-cy='question']").first().focus(); // Focus on the question element

        // Simulate pressing '1' key to answer the question
        cy.get("div[data-cy='question']").first().type('1');  // This simulates pressing '1'

        cy.wait(500); // Wait for the question to transition or update

        // Simulate pressing space to go to the next question
        cy.get("div[data-cy='question']").first().type(' ');  // This simulates pressing space

        cy.wait(500); // Wait for the next question to appear or for animation to finish
      }
    });

    // Optionally, ensure that the result screen appears after answering
    cy.get("div[data-cy='resultScreen']").should('exist');
  });
});

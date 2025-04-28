describe('tests', () => {
  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit('/');
  });

  it.skip('should answer questions using the keyboard', () => {
    // Ensure the question is visible before proceeding
    cy.get("div[data-cy='question']").should('exist');

    function answerTest(number: number) {
      for (let i = 0; i <= number; i++) {
        // Simulate pressing '1' to answer the question
        cy.get("div[data-cy='question']").first().focus(); // Focus on the question element

        // cy.get("div[data-cy='question']").first().type('1');

        cy.window().trigger('keydown', { key: '1' });

        cy.wait(300); // Wait for the question to transition or update

        // cy.get("div[data-cy='question']").first().type(' ');

        cy.window().trigger('keydown', { key: ' ' });

        cy.wait(300);
      }

      cy.get("div[data-cy='resultScreen']").should('exist');

      // cy.wait(1000)

      cy.get('[data-cy="refreshButtonResult"]')
        .find('.cursor-pointer')  // Finds the icon inside the div
        .click({ force: true });

    }

    // cy.window().then((win) => {
    //   // Loop through to simulate answering multiple questions
    //   for (let i = 0; i < 11; i++) {
    //     // Simulate pressing '1' to answer the question
    //     cy.get("div[data-cy='question']").first().focus(); // Focus on the question element

    //     // Simulate pressing '1' key to answer the question
    //     cy.get("div[data-cy='question']").first().type('1');  // This simulates pressing '1'

    //     cy.wait(500); // Wait for the question to transition or update

    //     // Simulate pressing space to go to the next question
    //     cy.get("div[data-cy='question']").first().type(' ');  // This simulates pressing space

    //     cy.wait(500); // Wait for the next question to appear or for animation to finish
    //   }
    // });

    cy.get("li[data-cy='settingsbarNumber5']").click();

    answerTest(5);

    cy.wait(1000)

    cy.get("li[data-cy='settingsbarNumber10']").click();

    answerTest(10);

    cy.wait(1000)

    cy.get("li[data-cy='settingsbarNumber15']").click();

    answerTest(15);

    cy.wait(1000)

    cy.get("li[data-cy='settingsbarNumber25']").click();

    answerTest(25);


    // Optionally, ensure that the result screen appears after answering
  });

  it.skip('leaderboard' , () => {
    cy.visit('/leaderboard');

    cy.get('.w-\[60\%\] > :nth-child(5)').should('exist');
  })

  it("login" , () => {
    cy.visit('/authentication');

    cy.get('[data-cy="loginUsername"]').type("omar");
    cy.get('[data-cy="loginPassword"]').type("omar")
    cy.get('[data-cy="loginButton"]').click();

    cy.wait(3000);

    cy.location('pathname').should('eq', '/');

  })



});

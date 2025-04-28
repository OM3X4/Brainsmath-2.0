// cypress/support/index.js

Cypress.on('uncaught:exception', (err, runnable) => {
    // Log the error if you want to inspect it
    console.error(err);

    // Returning false prevents Cypress from failing the test
    return false;
});

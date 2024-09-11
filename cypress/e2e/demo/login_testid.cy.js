describe("Login Page Tests", () => {
  const correctUsername = "admin";
  const correctPassword = "123456";
  const incorrectUsername = "wronguser";
  const incorrectPassword = "wrongpass";

  beforeEach(() => {
    // Visit the login page before each test
    cy.visit("http://localhost:3000/login");
  });

  it("should display an error message for incorrect credentials", () => {
    // Fill in the incorrect username and password
    cy.get('[data-testid="username-input"]').type(incorrectUsername);
    cy.get('[data-testid="password-input"]').type(incorrectPassword);

    // Submit the form
    cy.get('[data-testid="submit-button"]').click();

    // Verify that the error message is displayed
    cy.get('[data-testid="error-message"]')
      .should("be.visible")
      .and("contain", "Invalid username or password");

    // Verify that the user stays on the login page
    cy.url().should("eq", `${Cypress.config().baseUrl}/login`);
  });

  it("should require both username and password", () => {
    // Submit the form without entering any credentials
    cy.get('[data-testid="submit-button"]').click();

    // Verify that both fields are required
    cy.get('[data-testid="username-input"]:invalid').should("exist");
    cy.get('[data-testid="password-input"]:invalid').should("exist");
  });

  it("should successfully log in with correct credentials", () => {
    // Fill in the correct username and password
    cy.get('[data-testid="username-input"]').type(correctUsername);
    cy.get('[data-testid="password-input"]').type(correctPassword);

    // Submit the form
    cy.get('[data-testid="submit-button"]').click();

    // Verify that the user is redirected to the homepage
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});

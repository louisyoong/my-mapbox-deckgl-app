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
    cy.get('input[id="username"]').type(incorrectUsername);
    cy.get('input[id="password"]').type(incorrectPassword);

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify that the error message is displayed
    cy.get(".text-red-600")
      .should("be.visible")
      .and("contain", "Invalid username or password");

    // Verify that the user stays on the login page
    cy.url().should("eq", `${Cypress.config().baseUrl}/login`);
  });

  it("should require both username and password", () => {
    // Submit the form without entering any credentials
    cy.get('button[type="submit"]').click();

    // Verify that both fields are required
    cy.get('input[id="username"]:invalid').should("exist");
    cy.get('input[id="password"]:invalid').should("exist");
  });

  it("should successfully log in with correct credentials", () => {
    // Fill in the correct username and password
    cy.get('input[id="username"]').type(correctUsername);
    cy.get('input[id="password"]').type(correctPassword);

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify that the user is redirected to the homepage
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});

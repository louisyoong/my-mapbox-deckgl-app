describe("Posts Page Tests with JSONPlaceholder API", () => {
  beforeEach(() => {
    // Visit the Posts page before each test
    cy.visit("/posts");
  });

  it("should display posts from the JSONPlaceholder API by default", () => {
    // Wait for the posts to load and check that at least one post is displayed
    cy.get('[data-testid="post-item"]').should("have.length.at.least", 1);
  });

  it("should allow users to search for posts by title", () => {
    // Search for "sunt aut facere repellat provident occaecati excepturi optio reprehenderitunt"
    cy.get('[data-testid="query-input"]')
      .clear()
      .type(
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
      );

    // Wait for the results to update
    cy.get('[data-testid="post-item"]').should("have.length.at.least", 1);

    // Ensure that the results contain "sunt aut facere repellat provident occaecati excepturi optio reprehenderit" in the title
    cy.get('[data-testid="post-item"]').each(($el) => {
      cy.wrap($el).should(
        "contain.text",
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
      );
    });
  });

  it("should display a loading state while fetching posts", () => {
    // Reload the page to trigger loading
    cy.reload();

    // Verify the loading state appears
    cy.get("p").contains("Loading...").should("be.visible");

    // Wait for the results to load and check that at least one post is displayed
    cy.get('[data-testid="post-item"]').should("have.length.at.least", 1);
  });

  it("should display the same number of posts as returned by the API", () => {
    // Fetch the data directly from the API
    cy.request("https://jsonplaceholder.typicode.com/posts").then(
      (response) => {
        // Assert the response is OK
        expect(response.status).to.eq(200);

        // Check the number of posts returned by the API
        const postCount = response.body.length;

        // Now check that the number of displayed posts matches the API count
        cy.get('[data-testid="post-item"]').should("have.length", postCount);
      }
    );
  });
});

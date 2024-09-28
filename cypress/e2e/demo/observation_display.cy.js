import { getTooltip } from "../../../pages/helper/tooltopHelper";

const DATA_INDEX = {
  UNIQUE_ID: 0,
  SPECIES: 1,
  LONGITUDE: 5,
  LATITUDE: 6,
};

describe("ScenegraphMap Observations Test for Correct Data", () => {
  const expectedObservationData = [
    { id: 1, species: "turtle", longitude: -74.57, latitude: 17.1 },
    { id: 2, species: "turtle", longitude: -90.6, latitude: 25.11 },
    { id: 3, species: "turtle", longitude: -96.58, latitude: 24.09 },
    { id: 4, species: "dolphin", longitude: -92.59, latitude: 29.12 },
    { id: 5, species: "dolphin", longitude: -72.55, latitude: 22.1 },
    { id: 6, species: "dolphin", longitude: -82.01, latitude: 26.13 },
    { id: 7, species: "dolphin", longitude: -81.57, latitude: 24.14 },
    { id: 8, species: "dolphin", longitude: -90.58, latitude: 26.13 },
    { id: 9, species: "whale", longitude: -90.14, latitude: 23.15 },
    { id: 10, species: "whale", longitude: -74.53, latitude: 29.14 },
  ];

  const correctUsername = "admin";
  const correctPassword = "123456";

  it("should log in and validate that observation data is correct", () => {
    // Step 1: Navigate to the login page
    cy.visit("/login");

    // Step 2: Fill in the login form
    cy.get('[data-testid="username-input"]').type(correctUsername);
    cy.get('[data-testid="password-input"]').type(correctPassword);

    // Step 3: Submit the login form
    cy.get('button[type="submit"]').click();

    // Step 4: After successful login, verify that the user is redirected to the homepage
    cy.url().should("eq", "http://localhost:3000/");

    // Step 5: Wait for the Mapbox GL canvas to load
    cy.get(".mapboxgl-canvas", { timeout: 20000 }).should("be.visible");

    // Step 6: Loop through the correct observation data and validate tooltips
    expectedObservationData.forEach((data) => {
      cy.window().then((win) => {
        const deckInstance = win.deckgl;

        // Ensure deckInstance is initialized and ready
        expect(deckInstance).to.exist;

        // Simulate the tooltip content by calling getTooltip with the point
        const tooltipContent = getTooltip({
          object: {
            [DATA_INDEX.SPECIES]: data.species,
            [DATA_INDEX.LATITUDE]: data.latitude,
            [DATA_INDEX.LONGITUDE]: data.longitude,
          },
        });

        // Validate the tooltip content against the expected data
        expect(tooltipContent).to.contain(`Species: ${data.species}`);
        expect(tooltipContent).to.contain(`Latitude: ${data.latitude}`);
        expect(tooltipContent).to.contain(`Longitude: ${data.longitude}`);
      });
    });
  });
});

describe("ScenegraphMap Observations Test for Incorrect Data", () => {
  // Incorrect data that should be detected as wrong
  const incorrectObservationData = [
    { id: 1, species: "fish", longitude: -74.57, latitude: 17.1 }, // Wrong species (fish instead of turtle)
    { id: 2, species: "turtle", longitude: -90.6, latitude: 25.11 },
    { id: 3, species: "turtle", longitude: -96.58, latitude: 24.09 },
    { id: 4, species: "dolphin", longitude: -92.59, latitude: 29.12 },
    { id: 5, species: "dolphin", longitude: -72.55, latitude: 22.1 },
    { id: 6, species: "dolphin", longitude: -82.01, latitude: 26.13 },
    { id: 7, species: "dolphin", longitude: -81.57, latitude: 24.14 },
    { id: 8, species: "dolphin", longitude: -90.58, latitude: 26.13 },
    { id: 9, species: "whale", longitude: -90.14, latitude: 23.15 },
    { id: 10, species: "whale", longitude: -74.53, latitude: 29.14 },
  ];

  const correctObservationData = [
    { id: 1, species: "turtle", longitude: -74.57, latitude: 17.1 }, // Correct data for validation
  ];

  const correctUsername = "admin";
  const correctPassword = "123456";

  it("should log in and detect incorrect observation data", () => {
    cy.visit("/login");

    cy.get('[data-testid="username-input"]').type(correctUsername);
    cy.get('[data-testid="password-input"]').type(correctPassword);

    cy.get('button[type="submit"]').click();

    cy.url().should("eq", "http://localhost:3000/");

    cy.get(".mapboxgl-canvas", { timeout: 20000 }).should("be.visible");

    // Loop through the incorrect observation data and validate if the system detects the error
    incorrectObservationData.forEach((data) => {
      cy.window().then((win) => {
        const deckInstance = win.deckgl;

        expect(deckInstance).to.exist;

        const tooltipContent = getTooltip({
          object: {
            [DATA_INDEX.SPECIES]: data.species,
            [DATA_INDEX.LATITUDE]: data.latitude,
            [DATA_INDEX.LONGITUDE]: data.longitude,
          },
        });

        // Validate if the data is incorrect (species mismatch)
        const correctData = correctObservationData.find(
          (d) => d.id === data.id
        );

        if (data.species !== correctData.species) {
          cy.log(
            `Error: Mismatch found. Expected species "${correctData.species}" but got "${data.species}" for ID ${data.id}`
          );
          // Test should fail if species is incorrect
          expect(data.species).to.equal(correctData.species);
        } else {
          // Validate the tooltip content if the data is correct
          expect(tooltipContent).to.contain(`Species: ${correctData.species}`);
          expect(tooltipContent).to.contain(
            `Latitude: ${correctData.latitude}`
          );
          expect(tooltipContent).to.contain(
            `Longitude: ${correctData.longitude}`
          );
        }
      });
    });
  });
});

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Add your base URL here
    setupNodeEvents(on, config) {
      // You can implement node event listeners here
    },
  },
});

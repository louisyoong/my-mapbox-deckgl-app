const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "s1wnn8",

  e2e: {
    baseUrl: "http://localhost:3000", // Add your base URL here
    setupNodeEvents(on, config) {
      // You can implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});

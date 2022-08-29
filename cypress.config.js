const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    excludeSpecPattern: process.env.CI ? "cypress/e2e/all.cy.js" : [],
  },
});

describe("About page Checks", () => {
  it("visit the page locally on your machine, search user, find user -> clear users from the screen", () => {
    cy.visit("http://localhost:3000/about");
    cy.get('[data-cy="headerTitle"]').contains("Github Finder");
    cy.get('[data-cy="siteDescription"]').contains(
      "A React app to search GitHub profiles and see profile details."
    );
    cy.get('[data-cy="webVersion"]').contains("Version");
    cy.get('[data-cy="FooterSVG"]').should("exist");
  });
});

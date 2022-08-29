describe("About page Checks", () => {
  it("visit the page locally on your machine, search user, find user -> clear users from the screen", () => {
    cy.visit("http://localhost:3000/aaa");
    cy.get('[data-cy="errorMsg"]').contains("Oooops!");
    cy.get('[data-cy="errorMsg1"]').contains("404 - page not found!");
    cy.get('[data-cy="iconText"]').contains("Back to home");
    cy.get('[data-cy="icon"]').should("be.visible");
    cy.get('[data-cy="FooterSVG"]').should("exist");
  });
});

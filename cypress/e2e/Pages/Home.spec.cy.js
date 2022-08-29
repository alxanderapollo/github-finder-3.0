describe("Home page Checks", () => {
  const footerYear = new Date().getFullYear();

  it("visit the page locally on your machine, search user, find user -> clear users from the screen", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-cy="input-search"]').type("alxanderapollo");
    cy.get('[data-cy="SearchBtn"]').click();
    cy.get('[data-cy="clearUsersBtn"]').click();
    cy.get('[data-cy="FooterSVG"]').should("exist");
  });
});

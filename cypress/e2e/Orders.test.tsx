/// <reference types="cypress" />
// @ts-check
describe("HomePage spec", () => {
  beforeEach(() => {
    cy.viewport("macbook-13");
  });

  it("should find results related with the search", () => {
    cy.visit("/");
    cy.contains("Scan orders").click();
    cy.url().should("includes", "/orders");

    cy.contains("Order #1").should("be.visible");

    for (let i = 0; i < 7; i++) {
      cy.contains("Next order").click();
    }

    cy.contains("Order #8").should("be.visible");
    cy.contains("Next order").click();

    cy.contains(
      "You have finished all the orders. Click on the finish button."
    ).should("be.visible");
    cy.contains("Finish").should("be.visible");
    cy.contains("Next order").should("not.exist");
  });
});

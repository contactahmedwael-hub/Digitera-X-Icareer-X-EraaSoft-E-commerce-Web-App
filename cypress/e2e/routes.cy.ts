describe("application routes", () => {
  it("shows the product listing page", () => {
    cy.visit("/products");
    cy.contains("h1", "All Fragrances").should("be.visible");
  });

  it("opens a product details page", () => {
    cy.visit("/products/santal-parchment");
    cy.contains("h1", "Santal Parchment").should("be.visible");
    cy.contains("Select Volume").should("be.visible");
  });

  it("shows the cart page", () => {
    cy.visit("/cart");
    cy.contains("h1", "Your Bag").should("be.visible");
  });
});

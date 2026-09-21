describe("application routes", () => {
  it("shows the product listing page", () => {
    cy.visit("/products");
    cy.contains("Products").should("be.visible");
  });

  it("shows the cart page", () => {
    cy.visit("/cart");
    cy.contains("Cart").should("be.visible");
  });
});

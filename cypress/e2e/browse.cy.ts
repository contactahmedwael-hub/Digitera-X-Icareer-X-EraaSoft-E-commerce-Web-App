describe("browsing the catalogue", () => {
  beforeEach(() => {
    cy.visit("/products");
    cy.resetState();
  });

  it("lists the full catalogue across four pages", () => {
    cy.visit("/products");
    cy.contains(/24 fragrances available/i).should("be.visible");
    cy.contains("Page 1 of 4").should("be.visible");
    cy.get("article").should("have.length", 6);
  });

  it("moves to the next page", () => {
    cy.visit("/products");
    cy.get('[aria-label="Next page"]').click();
    cy.contains("Page 2 of 4").should("be.visible");
  });

  it("keeps a filter in the URL so the page can be shared", () => {
    cy.visit("/products");
    cy.contains("label", "Floral").click();
    cy.location("search").should("contain", "floral");
    cy.reload();
    cy.location("search").should("contain", "floral");
  });

  it("finds a fragrance by name", () => {
    cy.visit("/products?search=santal");
    cy.contains("article", "Santal Parchment").should("be.visible");
  });

  it("says so plainly when nothing matches", () => {
    cy.visit("/products?search=zzzzzz");
    cy.contains(/no fragrance|nothing/i).should("be.visible");
  });

  it("opens a product from the grid", () => {
    cy.visit("/products");
    cy.contains("a", "Atelier Oud").click();
    cy.location("pathname").should("eq", "/products/atelier-oud");
    cy.contains("Scent Anatomy").should("be.visible");
  });
});

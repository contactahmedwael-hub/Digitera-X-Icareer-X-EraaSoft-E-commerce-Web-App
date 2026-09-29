describe("the editorial pages", () => {
  it("opens every page the footer links to", () => {
    const slugs = [
      "shipping-returns",
      "care-guide",
      "consultation",
      "appointments",
      "philosophy",
      "sourcing",
      "sustainability",
      "journal",
      "terms",
      "privacy",
    ];

    for (const slug of slugs) {
      cy.visit(`/pages/${slug}`);
      cy.get("h1").should("be.visible").and("not.be.empty");
      cy.get("h2").should("have.length.greaterThan", 0);
    }
  });

  it("reaches the shipping page from the footer", () => {
    cy.visit("/");
    cy.contains("footer a", "Shipping & Returns").click();
    cy.location("pathname").should("eq", "/pages/shipping-returns");
  });

  it("links the terms from the registration checkbox", () => {
    cy.visit("/signup");
    cy.contains("a", "terms of sale").should(
      "have.attr",
      "href",
      "/pages/terms",
    );
    cy.contains("a", "privacy policy").should(
      "have.attr",
      "href",
      "/pages/privacy",
    );
  });

  it("shows the not-found page for an unknown slug", () => {
    // The status stays 200: the root layout reads cookies, so the response is
    // streamed and Next cannot revise the status after the headers are sent.
    // What matters to a visitor is that they get the not-found page.
    cy.visit("/pages/nope", { failOnStatusCode: false });
    cy.contains(/page not found/i).should("be.visible");
  });
});

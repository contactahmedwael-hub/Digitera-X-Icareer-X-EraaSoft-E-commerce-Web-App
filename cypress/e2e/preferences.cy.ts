describe("language and theme", () => {
  it("switches the whole page to Arabic and flips the direction", () => {
    cy.visit("/products");
    cy.get(
      'button[aria-label^="Language"], button[aria-label^="اللغة"]',
    ).click();
    cy.get("html").should("have.attr", "dir", "rtl");
    cy.get("html").should("have.attr", "lang", "ar");
    cy.contains("كل العطور").should("be.visible");
  });

  it("keeps the choice after a reload", () => {
    cy.visit("/");
    cy.get(
      'button[aria-label^="Language"], button[aria-label^="اللغة"]',
    ).click();
    cy.get("html").should("have.attr", "dir", "rtl");
    cy.reload();
    cy.get("html").should("have.attr", "dir", "rtl");
  });

  it("switches to the dark theme and remembers it", () => {
    cy.visit("/");
    cy.get('button[aria-label*="dark" i], button[aria-label*="داكن"]').click();
    cy.get("html").should("have.attr", "data-theme", "dark");
    cy.reload();
    cy.get("html").should("have.attr", "data-theme", "dark");
  });
});

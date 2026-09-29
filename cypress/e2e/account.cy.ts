describe("the account", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.resetState();
  });

  it("keeps the session across a reload", () => {
    cy.signIn();
    cy.reload();
    cy.contains(/your account/i).should("be.visible");
  });

  it("signs out and stays signed out", () => {
    cy.signIn();
    cy.contains("button", /sign out/i).click();
    cy.location("pathname").should("eq", "/");
    cy.visit("/account");
    cy.location("pathname").should("eq", "/");
  });

  it("sends a signed-in visitor away from the sign-in page", () => {
    cy.signIn();
    cy.visit("/login");
    cy.location("pathname").should("eq", "/account");
  });

  it("rejects a malformed email on registration", () => {
    cy.visit("/signup");
    cy.get('input[name="name"]').type("Mohamed Magdy");
    cy.get('input[name="email"]').type("not-an-email");
    cy.get('input[name="password"]').type("Odoratus2026!");
    cy.get('input[name="confirmPassword"]').type("Odoratus2026!");
    cy.contains("button", /create account/i).click();
    cy.contains(/valid email/i).should("be.visible");
    cy.location("pathname").should("eq", "/signup");
  });

  it("edits the stored details", () => {
    cy.signIn();
    cy.contains("button", /edit details/i).click();
    cy.get('input[name="name"]').clear().type("Mohamed Elkomy");
    cy.contains("button", /save changes/i).click();
    cy.contains("Mohamed Elkomy").should("be.visible");
  });
});

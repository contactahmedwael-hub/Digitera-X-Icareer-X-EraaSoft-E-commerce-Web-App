export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /** Signs in through the real form and lands on the account page. */
      signIn(email?: string, password?: string): Chainable<void>;
      /** Clears the bag, session and order history between specs. */
      resetState(): Chainable<void>;
    }
  }
}

Cypress.Commands.add(
  "signIn",
  (email = "mo@example.com", password = "Odoratus2026!") => {
    cy.visit("/login");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.contains("button", /sign in/i).click();
    cy.location("pathname").should("eq", "/account");
  },
);

Cypress.Commands.add("resetState", () => {
  cy.window().then((win) => {
    win.localStorage.removeItem("odoratus-cart");
    win.localStorage.removeItem("odoratus-session");
    win.localStorage.removeItem("odoratus-orders");
  });
});

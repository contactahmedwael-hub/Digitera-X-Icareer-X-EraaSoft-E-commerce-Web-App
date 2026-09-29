describe("placing an order", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.resetState();
  });

  it("sends a signed-out visitor to sign in first", () => {
    cy.visit("/checkout");
    cy.location("pathname").should("eq", "/login");
  });

  it("walks from a product to a confirmed order", () => {
    cy.signIn();

    cy.visit("/products/santal-parchment");
    cy.contains("label", "50 ml").click();
    cy.contains("button", /add to cart/i).click();

    cy.visit("/cart");
    cy.contains("Santal Parchment").should("be.visible");
    cy.contains("a", /place order/i).click();
    cy.location("pathname").should("eq", "/checkout");

    // The signed-in details are already filled in.
    cy.get('input[name="fullName"]').should("not.have.value", "");
    cy.get('input[name="email"]').should("have.value", "mo@example.com");

    cy.get('input[name="phone"]').type("+20 100 000 0000");
    cy.get('input[name="address"]').type("12 Nile Street, Maadi");
    cy.get('input[name="city"]').type("Cairo");
    cy.contains("label", "Bank transfer").click();
    cy.contains("button", /place order/i).click();

    cy.location("pathname", { timeout: 10000 }).should("match", /^\/orders\//);
    cy.contains(/order confirmed/i).should("be.visible");
    cy.contains(/ODR-/).should("be.visible");

    // The bag is emptied, and the order is on the account.
    cy.visit("/cart");
    cy.contains(/your bag is empty/i).should("be.visible");

    cy.visit("/account");
    cy.contains(/ODR-/).should("be.visible");
  });

  it("refuses an incomplete shipping form", () => {
    cy.signIn();
    cy.visit("/products/fleur-de-lune");
    cy.contains("button", /add to cart/i).click();

    cy.visit("/checkout");
    cy.contains("button", /place order/i).click();
    cy.location("pathname").should("eq", "/checkout");
    cy.contains(/this field is required/i).should("be.visible");
  });

  it("will not check out with an empty bag", () => {
    cy.signIn();
    cy.visit("/checkout");
    cy.contains(/your bag is empty/i).should("be.visible");
  });
});

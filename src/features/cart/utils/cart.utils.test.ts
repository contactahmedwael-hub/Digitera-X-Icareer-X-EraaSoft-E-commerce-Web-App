import type { CartLine } from "@/features/cart/types/cart.types";
import {
  getCartLineId,
  getCartQuantity,
  getCartTotal,
  getLineTotal,
} from "./cart.utils";

function line(overrides: Partial<CartLine> = {}): CartLine {
  return {
    id: "santal-parchment__100ml",
    productId: "santal-parchment",
    variantId: "100ml",
    name: "Santal Parchment",
    variantLabel: "100 ml",
    unitPrice: 220,
    giftWrapping: false,
    quantity: 1,
    ...overrides,
  };
}

describe("getCartLineId", () => {
  it("separates the same product by variant", () => {
    expect(getCartLineId("santal-parchment", "30ml", false)).not.toBe(
      getCartLineId("santal-parchment", "100ml", false),
    );
  });

  it("separates the same variant by gift wrapping", () => {
    expect(getCartLineId("santal-parchment", "100ml", true)).toBe(
      "santal-parchment__100ml__gift",
    );
  });
});

describe("cart totals", () => {
  it("uses the selected variant price", () => {
    expect(getLineTotal(line({ unitPrice: 220, quantity: 2 }))).toBe(440);
  });

  it("sums line totals and quantities", () => {
    const lines = [
      line({ id: "a", unitPrice: 220, quantity: 2 }),
      line({ id: "b", unitPrice: 110, quantity: 1 }),
    ];

    expect(getCartTotal(lines)).toBe(550);
    expect(getCartQuantity(lines)).toBe(3);
  });
});

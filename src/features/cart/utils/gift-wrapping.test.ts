import type { CartLine } from "@/features/cart/types/cart.types";
import {
  FREE_WRAPPING_THRESHOLD,
  WRAPPING_FEE_PER_ITEM,
  countWrappedItems,
  getWrappingFee,
} from "@/features/cart/utils/gift-wrapping";

function line(overrides: Partial<CartLine> & { id: string }): CartLine {
  return {
    productId: "x",
    variantId: "100ml",
    name: "X",
    variantLabel: "100 ml",
    unitPrice: 50,
    giftWrapping: false,
    quantity: 1,
    ...overrides,
  };
}

describe("countWrappedItems", () => {
  it("counts quantities, not lines", () => {
    expect(
      countWrappedItems([
        line({ id: "a", giftWrapping: true, quantity: 3 }),
        line({ id: "b", giftWrapping: true, quantity: 2 }),
        line({ id: "c", giftWrapping: false, quantity: 9 }),
      ]),
    ).toBe(5);
  });

  it("is nothing when no line is wrapped", () => {
    expect(countWrappedItems([line({ id: "a" })])).toBe(0);
  });
});

describe("getWrappingFee", () => {
  const wrapped = [line({ id: "a", giftWrapping: true, quantity: 2 })];

  it("charges per wrapped item below the threshold", () => {
    expect(getWrappingFee(wrapped, FREE_WRAPPING_THRESHOLD - 1)).toBe(
      2 * WRAPPING_FEE_PER_ITEM,
    );
  });

  it("is complimentary at the threshold", () => {
    expect(getWrappingFee(wrapped, FREE_WRAPPING_THRESHOLD)).toBe(0);
  });

  it("is complimentary above the threshold", () => {
    expect(getWrappingFee(wrapped, 500)).toBe(0);
  });

  it("costs nothing when nothing is wrapped, however small the order", () => {
    expect(getWrappingFee([line({ id: "a" })], 10)).toBe(0);
  });
});

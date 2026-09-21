import { getCartLineId, getCartQuantity, getCartTotal } from "./cart.utils";

describe("cart utils", () => {
  it("builds a stable line id from product options", () => {
    expect(getCartLineId("mug", { color: "Sand", size: "Large" })).toBe(
      "mug__color:Sand|size:Large",
    );
  });

  it("sums line totals and quantities", () => {
    const lines = [
      {
        id: "a",
        productId: "a",
        name: "A",
        price: 10,
        quantity: 2,
        selectedOptions: {},
      },
      {
        id: "b",
        productId: "b",
        name: "B",
        price: 5,
        quantity: 1,
        selectedOptions: {},
      },
    ];

    expect(getCartTotal(lines)).toBe(25);
    expect(getCartQuantity(lines)).toBe(3);
  });
});

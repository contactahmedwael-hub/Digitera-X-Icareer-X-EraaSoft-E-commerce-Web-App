import { formatPrice, parseProductListQuery } from "./product.utils";

describe("formatPrice", () => {
  it("formats a USD amount", () => {
    expect(formatPrice(12.5)).toBe("$12.50");
  });
});

describe("parseProductListQuery", () => {
  it("reads list query values from search params", () => {
    expect(
      parseProductListQuery({
        search: "mug",
        category: "home",
        sort: "price-asc",
        page: "2",
        pageSize: "4",
      }),
    ).toEqual({
      search: "mug",
      category: "home",
      sort: "price-asc",
      page: 2,
      pageSize: 4,
    });
  });
});

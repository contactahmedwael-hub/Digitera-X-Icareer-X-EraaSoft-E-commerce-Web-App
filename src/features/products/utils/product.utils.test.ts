import {
  formatPrice,
  getRelatedProducts,
  parseProductListQuery,
} from "./product.utils";
import { mockProducts } from "@/features/products/services/products.mock-data";

describe("formatPrice", () => {
  it("formats a USD amount", () => {
    expect(formatPrice(12.5)).toBe("$12.50");
  });
});

describe("getRelatedProducts", () => {
  it("excludes the current product and limits the list", () => {
    const related = getRelatedProducts(mockProducts, "santal-parchment", 4);

    expect(related).toHaveLength(4);
    expect(related.map((product) => product.id)).not.toContain(
      "santal-parchment",
    );
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

import type { Product } from "@/features/products/types/product.types";
import {
  filterProducts,
  paginate,
  parseProductListQuery,
  sortProducts,
} from "./product.query";

/**
 * A fixed fixture rather than the live catalogue: these tests are about the
 * filter and sort logic, and should not start failing when a product is added.
 */
function product(overrides: Partial<Product> & { id: string }): Product {
  return {
    sku: "ODORATUS-TEST",
    name: overrides.id,
    description: "",
    notes: "",
    scentNotes: { top: [], heart: [], base: [] },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 100, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 200, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: [],
    category: "pure-extractions",
    scentFamily: "woody",
    occasion: "personal-use",
    availability: "in-stock",
    ...overrides,
  };
}

const catalogue: Product[] = [
  product({
    id: "saffron-one",
    name: "Saffron One",
    scentFamily: "woody",
    variants: [
      { id: "100ml", volume: 100, label: "100 ml", price: 300, inStock: true },
    ],
  }),
  product({
    id: "rose-two",
    name: "Rose Two",
    scentFamily: "floral",
    scentNotes: { top: ["Saffron"], heart: [], base: [] },
    variants: [
      { id: "100ml", volume: 100, label: "100 ml", price: 150, inStock: true },
    ],
  }),
  product({
    id: "fresh-three",
    name: "Aqua Three",
    scentFamily: "fresh",
    variants: [
      { id: "100ml", volume: 100, label: "100 ml", price: 120, inStock: true },
    ],
  }),
];

describe("parseProductListQuery", () => {
  it("reads repeated and comma-separated filters as lists", () => {
    expect(
      parseProductListQuery({
        search: " oud ",
        category: ["pure-extractions", "atelier-oils"],
        scentFamily: "woody,floral",
        page: "2",
      }),
    ).toEqual({
      search: "oud",
      category: ["pure-extractions", "atelier-oils"],
      scentFamily: ["woody", "floral"],
      occasion: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      sort: undefined,
      page: 2,
      pageSize: 6,
    });
  });

  it("ignores an unknown sort value", () => {
    expect(parseProductListQuery({ sort: "random" }).sort).toBeUndefined();
  });
});

describe("filterProducts", () => {
  it("searches the name and the scent notes", () => {
    const found = filterProducts(catalogue, { search: "saffron" });
    expect(found.map((p) => p.id).sort()).toEqual(["rose-two", "saffron-one"]);
  });

  it("filters by scent family", () => {
    const found = filterProducts(catalogue, { scentFamily: ["floral"] });
    expect(found.map((p) => p.id)).toEqual(["rose-two"]);
  });

  it("keeps products whose range overlaps the price filter", () => {
    const found = filterProducts(catalogue, { minPrice: 260 });
    expect(found.map((p) => p.id)).toEqual(["saffron-one"]);
  });
});

describe("sortProducts", () => {
  it("sorts by the signature size price", () => {
    const sorted = sortProducts(catalogue, "price-asc");
    expect(sorted[0].id).toBe("fresh-three");
    expect(sorted.at(-1)?.id).toBe("saffron-one");
  });

  it("sorts by name", () => {
    expect(sortProducts(catalogue, "name-asc")[0].name).toBe("Aqua Three");
  });
});

describe("paginate", () => {
  it("returns the requested slice", () => {
    expect(paginate([1, 2, 3, 4, 5], 2, 2)).toEqual([3, 4]);
  });
});

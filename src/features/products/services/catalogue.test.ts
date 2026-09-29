import { mockProducts } from "@/features/products/services/products.mock-data";
import { PRICE_BOUNDS } from "@/features/products/components/ProductFilters/filter-options";
import {
  DEFAULT_PAGE_SIZE,
  sortProducts,
} from "@/features/products/utils/product.query";
import { getProductDisplayPrice } from "@/features/products/utils/product.utils";

/** Guards the shape of the catalogue the Figma listing is drawn against. */
describe("catalogue", () => {
  it("holds the 24 fragrances the design shows", () => {
    expect(mockProducts).toHaveLength(24);
  });

  it("fills exactly four listing pages", () => {
    expect(mockProducts.length / DEFAULT_PAGE_SIZE).toBe(4);
  });

  it("keeps the six products the brief pins down", () => {
    const pinned = [
      "fleur-de-lune",
      "santal-parchment",
      "noir-cocoon",
      "sol-dor",
      "atelier-oud",
      "rose-absolute",
    ];
    expect(mockProducts.slice(0, 6).map((p) => p.id)).toEqual(pinned);
  });

  it("gives every product a unique id and sku", () => {
    expect(new Set(mockProducts.map((p) => p.id)).size).toBe(24);
    expect(new Set(mockProducts.map((p) => p.sku)).size).toBe(24);
  });

  it("prices every product inside the slider's range", () => {
    for (const product of mockProducts) {
      const price = getProductDisplayPrice(product);
      expect(price).toBeGreaterThanOrEqual(PRICE_BOUNDS.min);
      expect(price).toBeLessThanOrEqual(PRICE_BOUNDS.max);
    }
  });

  it("gives every product three sizes priced monotonically", () => {
    for (const product of mockProducts) {
      const prices = product.variants.map((v) => v.price);
      expect(prices).toHaveLength(3);
      expect([...prices].sort((a, b) => a - b)).toEqual(prices);
    }
  });

  it("points every image at a file that exists in the pool", () => {
    const pool = new Set([
      "fleur-de-lune",
      "santal-parchment",
      "santal-parchment-2",
      "santal-parchment-3",
      "santal-parchment-4",
      "noir-cocoon",
      "sol-dor",
      "atelier-oud",
      "rose-absolute",
    ]);
    for (const product of mockProducts) {
      for (const image of product.images) {
        const name = image
          .replace("/images/products/", "")
          .replace(".webp", "");
        expect(pool.has(name)).toBe(true);
      }
    }
  });

  it("never repeats a photograph inside one page of the listing", () => {
    // The listing opens sorted by price, high to low — that, not the order of
    // the source files, is what decides which products share a page.
    const shown = sortProducts(mockProducts, "price-desc");

    for (let page = 0; page < 4; page += 1) {
      const slice = shown.slice(
        page * DEFAULT_PAGE_SIZE,
        (page + 1) * DEFAULT_PAGE_SIZE,
      );
      const photographs = slice.map((product) => product.images[0]);
      expect(new Set(photographs).size).toBe(photographs.length);
    }
  });
});

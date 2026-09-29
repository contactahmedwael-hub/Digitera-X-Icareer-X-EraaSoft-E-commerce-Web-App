import { mockProducts } from "@/features/products/services/products.mock-data";
import {
  findVariant,
  formatPrice,
  getAvailabilityLabel,
  getDefaultVariant,
  getProductMinPrice,
  getVariantSku,
} from "./product.utils";

const santal = mockProducts.find((p) => p.id === "santal-parchment")!;

describe("formatPrice", () => {
  it("formats a USD amount", () => {
    expect(formatPrice(12.5)).toBe("$12.50");
  });
});

describe("variants", () => {
  it("preselects the signature (largest) size", () => {
    expect(getDefaultVariant(santal)?.id).toBe("100ml");
  });

  it("falls back to the default when the id is unknown", () => {
    expect(findVariant(santal, "999ml")?.id).toBe("100ml");
  });

  it("returns the requested variant when it exists", () => {
    expect(findVariant(santal, "30ml")?.price).toBe(140);
  });

  it("reports the lowest variant price", () => {
    expect(getProductMinPrice(santal)).toBe(140);
  });

  it("builds a per-variant sku", () => {
    expect(getVariantSku(santal, findVariant(santal, "30ml"))).toBe(
      "ODORATUS-SP-0030",
    );
  });
});

describe("availability", () => {
  it("maps each state to copy from the design", () => {
    expect(getAvailabilityLabel("in-stock")).toBe("Available in Atelier");
    expect(getAvailabilityLabel("made-to-order")).toBe("Made to Order");
  });
});

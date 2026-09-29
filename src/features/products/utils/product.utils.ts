import type {
  Product,
  ProductAvailability,
  ProductVariant,
} from "@/features/products/types/product.types";

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

/** Whole-dollar price used across cards and detail headings. */
export function formatWholePrice(amount: number): string {
  return `$${amount}`;
}

/**
 * The signature size (the largest bottle) is what the design shows on cards
 * and preselects on the detail page.
 */
export function getDefaultVariant(
  product: Product,
): ProductVariant | undefined {
  if (product.variants.length === 0) {
    return undefined;
  }

  return product.variants.reduce((largest, variant) =>
    variant.volume > largest.volume ? variant : largest,
  );
}

export function findVariant(
  product: Product,
  variantId: string | undefined,
): ProductVariant | undefined {
  if (!variantId) {
    return getDefaultVariant(product);
  }

  return (
    product.variants.find((variant) => variant.id === variantId) ??
    getDefaultVariant(product)
  );
}

export function getProductMinPrice(product: Product): number {
  if (product.variants.length === 0) {
    return 0;
  }

  return Math.min(...product.variants.map((variant) => variant.price));
}

export function getProductMaxPrice(product: Product): number {
  if (product.variants.length === 0) {
    return 0;
  }

  return Math.max(...product.variants.map((variant) => variant.price));
}

/** Price shown on listing cards: the signature size. */
export function getProductDisplayPrice(product: Product): number {
  return getDefaultVariant(product)?.price ?? 0;
}

const availabilityLabels: Record<ProductAvailability, string> = {
  "in-stock": "Available in Atelier",
  "made-to-order": "Made to Order",
  "out-of-stock": "Currently Unavailable",
};

export function getAvailabilityLabel(
  availability: ProductAvailability,
): string {
  return availabilityLabels[availability];
}

export function isPurchasable(product: Product, variant?: ProductVariant) {
  if (product.availability === "out-of-stock") {
    return false;
  }

  return variant ? variant.inStock : product.variants.some((v) => v.inStock);
}

/** "ODORATUS-SP-0100" for the signature size, "ODORATUS-SP-0030" for 30 ml. */
export function getVariantSku(product: Product, variant?: ProductVariant) {
  if (!variant) {
    return product.sku;
  }

  return `${product.sku}-${String(variant.volume).padStart(4, "0")}`;
}

/** "pure-extractions" -> "Pure Extractions". Used for badge copy. */
export function toTitleCase(value: string): string {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

import type { CartLine } from "@/features/cart/types/cart.types";

/**
 * Same product in a different size, or with gift wrapping, is a separate
 * cart line — so the id carries both.
 */
export function getCartLineId(
  productId: string,
  variantId: string,
  giftWrapping: boolean,
): string {
  return `${productId}__${variantId}${giftWrapping ? "__gift" : ""}`;
}

export function getLineTotal(line: CartLine): number {
  return line.unitPrice * line.quantity;
}

export function getCartTotal(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + getLineTotal(line), 0);
}

export function getCartQuantity(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.quantity, 0);
}

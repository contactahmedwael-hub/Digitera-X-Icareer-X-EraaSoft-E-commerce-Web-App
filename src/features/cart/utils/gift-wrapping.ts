import type { CartLine } from "@/features/cart/types/cart.types";

/**
 * The announcement bar promises complimentary wrapping above $150, so below
 * that it has to cost something — otherwise the promise means nothing.
 */
export const FREE_WRAPPING_THRESHOLD = 150;
export const WRAPPING_FEE_PER_ITEM = 8;

export function countWrappedItems(lines: CartLine[]): number {
  return lines
    .filter((line) => line.giftWrapping)
    .reduce((total, line) => total + line.quantity, 0);
}

/** Nothing to charge when no line is wrapped, or the order clears the bar. */
export function getWrappingFee(lines: CartLine[], subtotal: number): number {
  const wrapped = countWrappedItems(lines);
  if (wrapped === 0 || subtotal >= FREE_WRAPPING_THRESHOLD) return 0;
  return wrapped * WRAPPING_FEE_PER_ITEM;
}

import type { CartLine } from "@/features/cart";
import type { Order } from "@/features/checkout/types/checkout.types";

/** Orders over this subtotal ship free — the same threshold the banner quotes. */
export const FREE_SHIPPING_THRESHOLD = 150;
export const SHIPPING_FEE = 12;

export function getShippingFee(subtotal: number): number {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}

export function getOrderTotal(subtotal: number): number {
  return subtotal + getShippingFee(subtotal);
}

/**
 * A human-readable reference: ODR-<base36 of the timestamp>-<4 random chars>.
 * The timestamp keeps ids roughly ordered; the suffix keeps two orders placed
 * in the same millisecond apart.
 */
export function createOrderId(now: number = Date.now()): string {
  const stamp = now.toString(36).toUpperCase();
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ODR-${stamp}-${suffix}`;
}

export function getOrderQuantity(order: Order): number {
  return order.lines.reduce((total, line) => total + line.quantity, 0);
}

/** Copies the lines so later edits to the cart cannot rewrite a placed order. */
export function freezeLines(lines: CartLine[]): CartLine[] {
  return lines.map((line) => ({ ...line }));
}

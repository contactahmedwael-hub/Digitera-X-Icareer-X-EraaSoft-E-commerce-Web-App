import type { CartLine } from "@/features/cart/types/cart.types";

export function getCartLineId(
  productId: string,
  selectedOptions: Record<string, string>,
): string {
  const optionsKey = Object.entries(selectedOptions)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}:${value}`)
    .join("|");

  return optionsKey ? `${productId}__${optionsKey}` : productId;
}

export function getCartTotal(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.price * line.quantity, 0);
}

export function getCartQuantity(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.quantity, 0);
}

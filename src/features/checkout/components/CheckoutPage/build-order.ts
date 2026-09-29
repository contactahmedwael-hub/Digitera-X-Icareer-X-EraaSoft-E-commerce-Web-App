import type { CartLine } from "@/features/cart";
import { getWrappingFee } from "@/features/cart/utils/gift-wrapping";
import type {
  CheckoutValues,
  Order,
} from "@/features/checkout/types/checkout.types";
import {
  createOrderId,
  freezeLines,
  getShippingFee,
} from "@/features/checkout/utils/order";

type BuildOrderInput = {
  lines: CartLine[];
  subtotal: number;
  values: CheckoutValues;
  ownerEmail: string;
};

/**
 * Freezes a bag and a filled form into an order. Prices are captured here, so
 * a later change to the catalogue cannot rewrite what someone already bought.
 */
export function buildOrder({
  lines,
  subtotal,
  values,
  ownerEmail,
}: BuildOrderInput): Order {
  const shipping = getShippingFee(subtotal);
  const giftWrapping = getWrappingFee(lines, subtotal);

  return {
    id: createOrderId(),
    ownerEmail,
    placedAt: new Date().toISOString(),
    lines: freezeLines(lines),
    subtotal,
    shipping,
    giftWrapping,
    total: subtotal + shipping + giftWrapping,
    paymentMethod: values.paymentMethod,
    shippingAddress: {
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      address: values.address.trim(),
      city: values.city.trim(),
      postalCode: values.postalCode.trim(),
      notes: values.notes.trim(),
    },
  };
}

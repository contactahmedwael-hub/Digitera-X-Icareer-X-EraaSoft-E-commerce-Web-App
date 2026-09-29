import type { CartLine } from "@/features/cart";

/** How the visitor intends to pay. No card details are ever collected. */
export type PaymentMethod = "cash-on-delivery" | "bank-transfer";

export type ShippingField =
  "fullName" | "email" | "phone" | "address" | "city" | "postalCode" | "notes";

export type CheckoutValues = Record<ShippingField, string> & {
  paymentMethod: PaymentMethod;
};

export type CheckoutErrorKey =
  | "required"
  | "emailInvalid"
  | "phoneInvalid"
  | "addressTooShort"
  | "postalCodeInvalid";

export type CheckoutErrors = Partial<Record<ShippingField, CheckoutErrorKey>>;

/** A placed order, as stored. Prices are frozen at the moment of purchase. */
export type Order = {
  id: string;
  /** The account that placed it, so one browser can hold two people's orders. */
  ownerEmail: string;
  /** ISO timestamp — formatted per locale at render time, never at write time. */
  placedAt: string;
  lines: CartLine[];
  subtotal: number;
  shipping: number;
  giftWrapping: number;
  total: number;
  paymentMethod: PaymentMethod;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    notes: string;
  };
};

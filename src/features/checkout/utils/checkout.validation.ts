import type {
  CheckoutErrors,
  CheckoutValues,
} from "@/features/checkout/types/checkout.types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/;

/** 7–15 digits, optionally with a leading +, spaces, dashes or brackets. */
const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/;

export const MIN_ADDRESS_LENGTH = 8;

export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!PHONE_PATTERN.test(trimmed)) return false;

  const digits = trimmed.replace(/\D/g, "").length;
  return digits >= 7 && digits <= 15;
}

/** Optional. Empty passes; anything given must be 3–10 letters or digits. */
export function isValidPostalCode(value: string): boolean {
  const trimmed = value.trim();
  return trimmed === "" || /^[A-Za-z\d\s-]{3,10}$/.test(trimmed);
}

export function validateCheckout(values: CheckoutValues): CheckoutErrors {
  const errors: CheckoutErrors = {};

  if (!values.fullName.trim()) errors.fullName = "required";

  const email = values.email.trim();
  if (!email) errors.email = "required";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "emailInvalid";

  const phone = values.phone.trim();
  if (!phone) errors.phone = "required";
  else if (!isValidPhone(phone)) errors.phone = "phoneInvalid";

  const address = values.address.trim();
  if (!address) errors.address = "required";
  else if (address.length < MIN_ADDRESS_LENGTH)
    errors.address = "addressTooShort";

  if (!values.city.trim()) errors.city = "required";

  if (!isValidPostalCode(values.postalCode))
    errors.postalCode = "postalCodeInvalid";

  // `notes` is optional and free-form, so it is never rejected.
  return errors;
}

export function hasCheckoutErrors(errors: CheckoutErrors): boolean {
  return Object.keys(errors).length > 0;
}

import type { Locale } from "@/lib/i18n/locale";
import type { PaymentMethod } from "@/features/checkout/types/checkout.types";

/**
 * Orders store an ISO timestamp; the readable date is produced here, at render
 * time, so it follows whichever language is active rather than the one that
 * happened to be on when the order was placed.
 */
export function formatOrderDate(isoDate: string, locale: Locale): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";

  // `-u-nu-latn` keeps Western digits in Arabic, so the date matches the
  // price sitting next to it in the same row.
  return new Intl.DateTimeFormat(
    locale === "ar" ? "ar-EG-u-nu-latn" : "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  ).format(date);
}

export function getPaymentLabel(
  method: PaymentMethod,
  labels: { cashOnDelivery: string; bankTransfer: string },
): string {
  return method === "bank-transfer"
    ? labels.bankTransfer
    : labels.cashOnDelivery;
}

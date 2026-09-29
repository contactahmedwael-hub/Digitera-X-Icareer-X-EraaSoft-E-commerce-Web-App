"use client";

import { useCallback } from "react";
import type { CheckoutErrorKey } from "@/features/checkout/types/checkout.types";
import { useI18n } from "@/lib/i18n/I18nProvider";

/** Renders a stored error key in whichever language is active right now. */
export function useCheckoutMessages() {
  const { dict } = useI18n();

  return useCallback(
    (key: CheckoutErrorKey): string => {
      const messages: Record<CheckoutErrorKey, string> = {
        required: dict.checkout.errorRequired,
        emailInvalid: dict.checkout.errorEmailInvalid,
        phoneInvalid: dict.checkout.errorPhoneInvalid,
        addressTooShort: dict.checkout.errorAddressTooShort,
        postalCodeInvalid: dict.checkout.errorPostalCodeInvalid,
      };

      return messages[key];
    },
    [dict],
  );
}

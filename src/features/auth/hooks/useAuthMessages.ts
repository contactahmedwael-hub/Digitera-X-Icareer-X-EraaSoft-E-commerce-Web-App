"use client";

import { useCallback } from "react";
import type { ValidationKey } from "@/features/auth/types/auth.types";
import { useI18n } from "@/lib/i18n/I18nProvider";

/**
 * Turns a stored `ValidationKey` into a sentence in the active language.
 * Keeping the key in state (rather than the sentence) means an error written
 * in English stays correct after the visitor switches to Arabic.
 */
export function useAuthMessages() {
  const { dict } = useI18n();

  return useCallback(
    (key: ValidationKey): string => {
      const messages: Record<ValidationKey, string> = {
        required: dict.auth.errorRequired,
        emailInvalid: dict.auth.errorEmailInvalid,
        nameTooShort: dict.auth.errorNameTooShort,
        passwordTooShort: dict.auth.errorPasswordTooShort,
        passwordWeak: dict.auth.errorPasswordWeak,
        passwordMismatch: dict.auth.errorPasswordMismatch,
        termsRequired: dict.auth.errorTermsRequired,
      };

      return messages[key];
    },
    [dict],
  );
}

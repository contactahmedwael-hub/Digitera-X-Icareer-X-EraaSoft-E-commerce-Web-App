"use client";

import Link from "next/link";
import { contentPaths } from "@/features/content";
import { useI18n } from "@/lib/i18n/I18nProvider";

const linkClassName =
  "font-semibold text-gold underline-offset-4 transition-colors duration-300 hover:text-ink hover:underline";

/**
 * The consent label, with the two documents it refers to actually linked —
 * a checkbox pointing at pages nobody can open is not consent to anything.
 */
export function AcceptTermsLabel() {
  const { dict } = useI18n();

  return (
    <>
      {dict.auth.acceptTermsBefore}{" "}
      <Link
        href={contentPaths.page("terms")}
        target="_blank"
        className={linkClassName}
      >
        {dict.auth.termsOfSale}
      </Link>{" "}
      {dict.auth.acceptTermsBetween}{" "}
      <Link
        href={contentPaths.page("privacy")}
        target="_blank"
        className={linkClassName}
      >
        {dict.auth.privacyPolicy}
      </Link>
      .
    </>
  );
}

"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";

export function SkipLink() {
  const { dict } = useI18n();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-inverse focus:px-4 focus:py-2 focus:text-[12px] focus:font-semibold focus:text-on-inverse focus:uppercase"
    >
      {dict.common.skipToContent}
    </a>
  );
}

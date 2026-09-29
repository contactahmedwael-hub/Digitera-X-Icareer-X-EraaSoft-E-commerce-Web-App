"use client";

import { TranslateIcon } from "@/components/icons";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { localeNames } from "@/lib/i18n/locale";

export function LocaleToggle({ className }: { className?: string }) {
  const { locale, setLocale, dict } = useI18n();
  const next = locale === "ar" ? "en" : "ar";

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      aria-label={`${dict.nav.language}: ${localeNames[next]}`}
      title={localeNames[next]}
      className={className}
    >
      <TranslateIcon size={18} />
    </button>
  );
}

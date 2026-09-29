"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";
import { getDirection, LOCALE_COOKIE, type Locale } from "@/lib/i18n/locale";

type Vars = Record<string, string | number>;

type I18nContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  dict: Dictionary;
  setLocale: (next: Locale) => void;
  /** Replaces {placeholders} in a translated string. */
  fill: (template: string, vars?: Vars) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const ONE_YEAR = 60 * 60 * 24 * 365;

export function fillTemplate(template: string, vars?: Vars): string {
  if (!vars) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const setLocale = useCallback(
    (next: Locale) => {
      document.documentElement.lang = next;
      document.documentElement.dir = getDirection(next);
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
      router.refresh();
    },
    [router],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dir: getDirection(locale),
      dict: getDictionary(locale),
      setLocale,
      fill: fillTemplate,
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside <I18nProvider>");
  }

  return context;
}

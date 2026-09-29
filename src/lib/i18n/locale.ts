export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_COOKIE = "odoratus-locale";
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

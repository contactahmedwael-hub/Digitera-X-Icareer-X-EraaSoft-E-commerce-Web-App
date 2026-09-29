import { cookies } from "next/headers";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n/locale";
import { DEFAULT_THEME, isTheme, THEME_COOKIE } from "@/lib/theme/theme";
import { LOCALE_COOKIE } from "@/lib/i18n/locale";
import type { Theme } from "@/lib/theme/theme";

/** Reads the visitor's locale and theme so the server renders what they chose. */
export async function readPreferences(): Promise<{
  locale: Locale;
  theme: Theme;
}> {
  const store = await cookies();
  const locale = store.get(LOCALE_COOKIE)?.value;
  const theme = store.get(THEME_COOKIE)?.value;

  return {
    locale: isLocale(locale) ? locale : DEFAULT_LOCALE,
    theme: isTheme(theme) ? theme : DEFAULT_THEME,
  };
}

export const THEMES = ["light", "dark"] as const;
export type Theme = (typeof THEMES)[number];

export const THEME_COOKIE = "odoratus-theme";
export const DEFAULT_THEME: Theme = "light";

export function isTheme(value: string | undefined): value is Theme {
  return THEMES.includes(value as Theme);
}

import { auth } from "@/lib/i18n/dictionaries/ar/auth";
import { catalogue } from "@/lib/i18n/dictionaries/ar/catalogue";
import { checkout } from "@/lib/i18n/dictionaries/ar/checkout";
import { shell } from "@/lib/i18n/dictionaries/ar/shell";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

/** Arabic copy. The house name stays in Latin letters, as brands normally do. */
export const ar: Dictionary = {
  ...shell,
  ...catalogue,
  ...checkout,
  ...auth,
};

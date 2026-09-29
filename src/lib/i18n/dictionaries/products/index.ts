import type { Locale } from "@/lib/i18n/locale";
import { copyCore } from "@/lib/i18n/dictionaries/products/copy-core";
import { copyPureExtractions } from "@/lib/i18n/dictionaries/products/copy-pure-extractions";
import { copyPrivateReserve } from "@/lib/i18n/dictionaries/products/copy-private-reserve";
import { copyAtelierOils } from "@/lib/i18n/dictionaries/products/copy-atelier-oils";
import { copyDiscoveryVault } from "@/lib/i18n/dictionaries/products/copy-discovery-vault";
import type { ProductCopy } from "@/lib/i18n/dictionaries/products/copy.types";

export type {
  ProductCopy,
  TaxonomyCopy,
} from "@/lib/i18n/dictionaries/products/copy.types";
export {
  taxonomyCopy,
  archetypeCopy,
  occasionBlurbs,
} from "@/lib/i18n/dictionaries/products/taxonomy";

/** English falls back to the product record itself, so only Arabic is listed. */
export const productCopy: Record<Locale, Record<string, ProductCopy>> = {
  en: {},
  ar: {
    ...copyCore,
    ...copyPureExtractions,
    ...copyPrivateReserve,
    ...copyAtelierOils,
    ...copyDiscoveryVault,
  },
};

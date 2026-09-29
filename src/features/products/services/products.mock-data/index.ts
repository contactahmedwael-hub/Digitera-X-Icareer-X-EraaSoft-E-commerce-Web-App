import type { Product } from "@/features/products/types/product.types";
import { coreSix } from "@/features/products/services/products.mock-data/core-six";
import { pureExtractions } from "@/features/products/services/products.mock-data/pure-extractions";
import { privateReserve } from "@/features/products/services/products.mock-data/private-reserve";
import { atelierOils } from "@/features/products/services/products.mock-data/atelier-oils";
import { discoveryVault } from "@/features/products/services/products.mock-data/discovery-vault";

/**
 * In-memory catalogue of 24 fragrances — the count and the four listing pages
 * the Figma file shows. Grouped by the store's own categories so no file
 * outgrows the project's size rule; `coreSix` is the set the task brief pins
 * down and must not be edited.
 */
export const mockProducts: Product[] = [
  ...coreSix,
  ...pureExtractions,
  ...privateReserve,
  ...atelierOils,
  ...discoveryVault,
];

export type ProductId = string;

/** A purchasable bottle size. Price is per variant. */
export type ProductVariant = {
  id: string; // e.g. "100ml"
  volume: number; // in millilitres, e.g. 100
  label: string; // display label, e.g. "100 ml"
  price: number; // price for this volume
  inStock: boolean;
};

/** Fragrance pyramid shown in the "Scent Anatomy" section. */
export type ScentNotes = {
  top: string[];
  heart: string[];
  base: string[];
};

export type ProductAvailability = "in-stock" | "made-to-order" | "out-of-stock";

export type Product = {
  id: ProductId;
  sku: string;
  name: string;
  description: string;
  /** Short line used on cards and listings. */
  notes: string;
  /** Structured notes for the Scent Anatomy section. */
  scentNotes: ScentNotes;
  variants: ProductVariant[];
  /** Whether complimentary gift wrapping can be added. */
  giftWrappingAvailable: boolean;
  images: string[];
  category: string;
  scentFamily: string;
  occasion: string;
  availability: ProductAvailability;
};

export type ProductSort = "name-asc" | "name-desc" | "price-asc" | "price-desc";

export type ProductListQuery = {
  search?: string;
  /** Selected category ids. */
  category?: string[];
  /** Selected scent family ids. */
  scentFamily?: string[];
  /** Selected occasion ids. */
  occasion?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
};

export type ProductListResult = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
};

export type ProductSearchParams = Record<string, string | string[] | undefined>;

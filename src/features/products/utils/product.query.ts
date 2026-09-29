import type {
  Product,
  ProductListQuery,
  ProductSearchParams,
  ProductSort,
} from "@/features/products/types/product.types";
import {
  getProductDisplayPrice,
  getProductMaxPrice,
  getProductMinPrice,
} from "@/features/products/utils/product.utils";

const SORT_VALUES: ProductSort[] = [
  "name-asc",
  "name-desc",
  "price-asc",
  "price-desc",
];

export const DEFAULT_PAGE_SIZE = 6;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** A repeated or comma-separated param becomes a list of ids. */
function listValue(value: string | string[] | undefined): string[] | undefined {
  const raw = Array.isArray(value) ? value : value ? [value] : [];
  const items = raw
    .flatMap((entry) => entry.split(","))
    .map((entry) => entry.trim())
    .filter(Boolean);

  return items.length > 0 ? items : undefined;
}

function numberValue(value: string | string[] | undefined) {
  const parsed = Number(firstValue(value));
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function parseProductListQuery(
  searchParams: ProductSearchParams,
): ProductListQuery {
  const search = firstValue(searchParams.search)?.trim();
  const sortValue = firstValue(searchParams.sort);
  const page = numberValue(searchParams.page);
  const pageSize = numberValue(searchParams.pageSize);

  return {
    search: search || undefined,
    category: listValue(searchParams.category),
    scentFamily: listValue(searchParams.scentFamily),
    occasion: listValue(searchParams.occasion),
    minPrice: numberValue(searchParams.minPrice),
    maxPrice: numberValue(searchParams.maxPrice),
    sort: SORT_VALUES.includes(sortValue as ProductSort)
      ? (sortValue as ProductSort)
      : undefined,
    page: page && page > 0 ? page : 1,
    pageSize: pageSize && pageSize > 0 ? pageSize : DEFAULT_PAGE_SIZE,
  };
}

function matchesSearch(product: Product, search?: string) {
  if (!search) {
    return true;
  }

  const haystack = [
    product.name,
    product.notes,
    product.description,
    ...product.scentNotes.top,
    ...product.scentNotes.heart,
    ...product.scentNotes.base,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(search.toLowerCase());
}

function matchesList(value: string, selected?: string[]) {
  return !selected || selected.length === 0 || selected.includes(value);
}

function matchesPrice(product: Product, min?: number, max?: number) {
  const lowest = getProductMinPrice(product);
  const highest = getProductMaxPrice(product);

  if (min !== undefined && highest < min) {
    return false;
  }

  return !(max !== undefined && lowest > max);
}

export function filterProducts(
  products: Product[],
  query: ProductListQuery,
): Product[] {
  return products.filter(
    (product) =>
      matchesSearch(product, query.search) &&
      matchesList(product.category, query.category) &&
      matchesList(product.scentFamily, query.scentFamily) &&
      matchesList(product.occasion, query.occasion) &&
      matchesPrice(product, query.minPrice, query.maxPrice),
  );
}

export function sortProducts(
  products: Product[],
  sort: ProductSort = "price-desc",
): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "price-asc":
      return sorted.sort(
        (a, b) => getProductDisplayPrice(a) - getProductDisplayPrice(b),
      );
    default:
      return sorted.sort(
        (a, b) => getProductDisplayPrice(b) - getProductDisplayPrice(a),
      );
  }
}

export function paginate<T>(
  items: T[],
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
) {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

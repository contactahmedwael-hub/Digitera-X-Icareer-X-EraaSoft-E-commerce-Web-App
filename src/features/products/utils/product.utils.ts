import type {
  ProductListQuery,
  ProductSearchParams,
  ProductSort,
} from "@/features/products/types/product.types";

const SORT_VALUES: ProductSort[] = [
  "name-asc",
  "name-desc",
  "price-asc",
  "price-desc",
];

function firstValue(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatWholePrice(amount: number): string {
  return `$${amount}`;
}

export function parseProductListQuery(
  searchParams: ProductSearchParams,
): ProductListQuery {
  const search = firstValue(searchParams.search)?.trim();
  const category = firstValue(searchParams.category)?.trim();
  const sortValue = firstValue(searchParams.sort);
  const pageValue = Number(firstValue(searchParams.page));
  const pageSizeValue = Number(firstValue(searchParams.pageSize));

  return {
    search: search || undefined,
    category: category || undefined,
    sort: SORT_VALUES.includes(sortValue as ProductSort)
      ? (sortValue as ProductSort)
      : undefined,
    page: Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1,
    pageSize:
      Number.isFinite(pageSizeValue) && pageSizeValue > 0
        ? pageSizeValue
        : 6,
  };
}

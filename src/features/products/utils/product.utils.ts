import type {
  Product,
  ProductListQuery,
  ProductSearchParams,
  ProductSort,
  ProductVolume,
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

const SCENT_FAMILY_LABELS: Record<string, string> = {
  floral: "Floral",
  woody: "Woody",
  oriental: "Oriental",
  fresh: "Fresh",
};

const OCCASION_LABELS: Record<string, string> = {
  "personal-use": "Personal Use",
  wedding: "Wedding",
  "gift-sets": "Gift Sets",
  birthday: "Birthday",
  evening: "Evening",
};

export function getScentFamilyLabel(scentFamily: string): string {
  return SCENT_FAMILY_LABELS[scentFamily] ?? scentFamily;
}

export function getOccasionLabel(occasion: string): string {
  return OCCASION_LABELS[occasion] ?? occasion;
}

export function getDefaultVolume(product: Product): ProductVolume {
  return (
    product.volumes.find((volume) => volume.price === product.price) ??
    product.volumes.at(-1) ??
    product.volumes[0] ?? { label: "100 ml", price: product.price }
  );
}

export function getRelatedProducts(
  products: Product[],
  productId: string,
  limit = 4,
): Product[] {
  return products.filter((product) => product.id !== productId).slice(0, limit);
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

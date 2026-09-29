import type {
  ProductId,
  ProductListQuery,
} from "@/features/products/types/product.types";

export const productQueryKeys = {
  all: ["products"] as const,
  list: (query: ProductListQuery) => ["products", "list", query] as const,
  detail: (id: ProductId) => ["products", "detail", id] as const,
  related: (id: ProductId, limit: number) =>
    ["products", "related", id, limit] as const,
};

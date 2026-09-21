import { apiGet } from "@/lib/api/client";
import type {
  Product,
  ProductListQuery,
  ProductListResult,
} from "@/features/products/types/product.types";
import type { ProductsService } from "@/features/products/services/products.service";

function toQueryString(query: ProductListQuery): string {
  const params = new URLSearchParams();

  if (query.search) params.set("search", query.search);
  if (query.category) params.set("category", query.category);
  if (query.sort) params.set("sort", query.sort);
  if (query.page) params.set("page", String(query.page));
  if (query.pageSize) params.set("pageSize", String(query.pageSize));

  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

/**
 * HTTP catalog client. Not used while NEXT_PUBLIC_USE_MOCK_API is true.
 */
export const httpProductsService: ProductsService = {
  async list(query) {
    return apiGet<ProductListResult>(`/products${toQueryString(query)}`);
  },

  async getById(id) {
    return apiGet<Product>(`/products/${id}`);
  },
};

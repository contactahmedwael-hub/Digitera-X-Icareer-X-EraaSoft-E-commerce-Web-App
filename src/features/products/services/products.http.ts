import { apiGet } from "@/lib/api/client";
import type {
  Product,
  ProductListQuery,
  ProductListResult,
} from "@/features/products/types/product.types";
import type { ProductsService } from "@/features/products/services/products.service";

function appendList(
  params: URLSearchParams,
  key: string,
  values?: string[],
): void {
  values?.forEach((value) => params.append(key, value));
}

function toQueryString(query: ProductListQuery): string {
  const params = new URLSearchParams();

  if (query.search) params.set("search", query.search);
  appendList(params, "category", query.category);
  appendList(params, "scentFamily", query.scentFamily);
  appendList(params, "occasion", query.occasion);
  if (query.minPrice !== undefined) {
    params.set("minPrice", String(query.minPrice));
  }
  if (query.maxPrice !== undefined) {
    params.set("maxPrice", String(query.maxPrice));
  }
  if (query.sort) params.set("sort", query.sort);
  if (query.page) params.set("page", String(query.page));
  if (query.pageSize) params.set("pageSize", String(query.pageSize));

  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

/** HTTP catalog client. Not used while NEXT_PUBLIC_USE_MOCK_API is true. */
export const httpProductsService: ProductsService = {
  async list(query) {
    return apiGet<ProductListResult>(`/products${toQueryString(query)}`);
  },

  async getById(id) {
    return apiGet<Product>(`/products/${id}`);
  },

  async listRelated(id, limit = 4) {
    return apiGet<Product[]>(`/products/${id}/related?limit=${limit}`);
  },
};

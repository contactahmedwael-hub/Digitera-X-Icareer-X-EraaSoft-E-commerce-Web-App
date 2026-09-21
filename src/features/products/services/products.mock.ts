import { mockProducts } from "@/features/products/services/products.mock-data";
import type { ProductsService } from "@/features/products/services/products.service";

/**
 * In-memory catalog used while no backend exists.
 * Search, filter, sort, and pagination are intentionally left for user stories.
 */
export const mockProductsService: ProductsService = {
  async list(query) {
    // TODO(US-01, US-02, US-03): apply search, filters, sort, and pagination.
    return {
      items: mockProducts,
      total: mockProducts.length,
      page: query.page ?? 1,
      pageSize: query.pageSize ?? 8,
    };
  },

  async getById(id) {
    return mockProducts.find((product) => product.id === id) ?? null;
  },
};

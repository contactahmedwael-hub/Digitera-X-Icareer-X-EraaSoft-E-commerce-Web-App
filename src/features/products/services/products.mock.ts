import { mockProducts } from "@/features/products/services/products.mock-data";
import type { ProductsService } from "@/features/products/services/products.service";
import {
  DEFAULT_PAGE_SIZE,
  filterProducts,
  paginate,
  sortProducts,
} from "@/features/products/utils/product.query";

/** In-memory catalog used while no backend exists. */
export const mockProductsService: ProductsService = {
  async list(query) {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? DEFAULT_PAGE_SIZE;

    const filtered = filterProducts(mockProducts, query);
    const sorted = sortProducts(filtered, query.sort);

    return {
      items: paginate(sorted, page, pageSize),
      total: filtered.length,
      page,
      pageSize,
    };
  },

  async getById(id) {
    return mockProducts.find((product) => product.id === id) ?? null;
  },

  async listRelated(id, limit = 4) {
    const product = mockProducts.find((entry) => entry.id === id);

    if (!product) {
      return [];
    }

    const byScentFamily = mockProducts.filter(
      (entry) =>
        entry.id !== product.id && entry.scentFamily === product.scentFamily,
    );
    const others = mockProducts.filter(
      (entry) =>
        entry.id !== product.id && entry.scentFamily !== product.scentFamily,
    );

    return [...byScentFamily, ...others].slice(0, limit);
  },
};

import { env } from "@/config/env";
import { httpProductsService } from "@/features/products/services/products.http";
import { mockProductsService } from "@/features/products/services/products.mock";
import type {
  Product,
  ProductId,
  ProductListQuery,
  ProductListResult,
} from "@/features/products/types/product.types";

export type ProductsService = {
  list(query: ProductListQuery): Promise<ProductListResult>;
  getById(id: ProductId): Promise<Product | null>;
};

export function createProductsService(): ProductsService {
  return env.useMockApi ? mockProductsService : httpProductsService;
}

export const productsService = createProductsService();

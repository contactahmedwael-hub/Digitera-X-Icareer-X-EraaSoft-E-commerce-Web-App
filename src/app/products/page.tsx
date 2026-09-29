import { ProductsPage } from "@/features/products";
import type { ProductSearchParams } from "@/features/products";

export default async function ProductsRoute({
  searchParams,
}: {
  searchParams: Promise<ProductSearchParams>;
}) {
  const params = await searchParams;
  return <ProductsPage searchParams={params} />;
}

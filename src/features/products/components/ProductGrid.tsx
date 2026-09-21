import { ProductCard } from "@/features/products/components/ProductCard";
import type { Product } from "@/features/products/types/product.types";

type ProductGridProps = {
  products: Product[];
  isLoading?: boolean;
};

export function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  if (isLoading) {
    return <p className="text-sm text-[#605a54]">Loading products...</p>;
  }

  if (products.length === 0) {
    return <p className="text-sm text-[#605a54]">No products found.</p>;
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

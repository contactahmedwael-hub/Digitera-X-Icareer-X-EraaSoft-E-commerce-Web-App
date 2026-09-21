import type { Product } from "@/features/products/types/product.types";
import { formatPrice } from "@/features/products/utils/product.utils";

type ProductDetailsProps = {
  product: Product;
};

/** US-04: product information. */
export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div>
      <p className="text-sm uppercase tracking-wide text-zinc-500">
        {product.category}
      </p>
      <h1 className="mt-1 text-3xl font-semibold">{product.name}</h1>
      <p className="mt-2 text-xl">{formatPrice(product.price)}</p>
      <p className="mt-4 text-zinc-700">{product.description}</p>
    </div>
  );
}

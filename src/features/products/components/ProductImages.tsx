import Image from "next/image";
import type { Product } from "@/features/products/types/product.types";

type ProductImagesProps = {
  product: Product;
};

/** US-04: product image gallery. */
export function ProductImages({ product }: ProductImagesProps) {
  const image = product.images[0];

  if (!image) {
    return (
      <div className="flex h-80 items-center justify-center rounded-lg bg-[#ebe6de] text-[#605a54]">
        No product images yet
      </div>
    );
  }

  return (
    <div className="relative h-80 overflow-hidden rounded-lg">
      <Image
        src={image}
        alt={product.name}
        fill
        className="object-cover"
        sizes="50vw"
      />
    </div>
  );
}

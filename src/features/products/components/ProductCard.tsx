"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/features/cart";
import { productPaths } from "@/features/products/paths";
import type { Product } from "@/features/products/types/product.types";
import { formatWholePrice } from "@/features/products/utils/product.utils";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const image = product.images[0];

  return (
    <article className="flex min-w-0 flex-1 flex-col items-start gap-4 self-stretch rounded-lg bg-white p-4">
      <Link
        href={productPaths.detail(product.id)}
        className="relative h-[240px] w-full shrink-0 overflow-hidden rounded sm:h-[280px] lg:h-[320px]"
      >
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="rounded object-cover"
            sizes="(min-width: 1280px) 28vw, (min-width: 640px) 45vw, 100vw"
          />
        ) : (
          <div className="flex size-full items-center justify-center rounded bg-[#faf8f5] text-sm text-[#605a54]">
            No image
          </div>
        )}
      </Link>
      <div className="flex w-full flex-col items-start gap-3">
        <div className="flex w-full items-start justify-between">
          <Link
            href={productPaths.detail(product.id)}
            className="flex min-w-0 flex-col items-start gap-1"
          >
            <h2 className="w-full font-[family-name:var(--font-instrument-serif)] text-[20px] text-[#1a1a1a] sm:truncate sm:text-[22px]">
              {product.name}
            </h2>
            <p className="w-full text-[11px] font-normal uppercase text-[#c5a880] sm:truncate">
              {product.notes}
            </p>
          </Link>
          <p className="shrink-0 text-[15px] font-semibold text-[#1a1a1a]">
            {formatWholePrice(product.price)}
          </p>
        </div>
        <button
          type="button"
          className="flex w-full items-center justify-center rounded border border-solid border-[#ebe6de] py-3 text-[11px] font-semibold uppercase whitespace-nowrap text-[#1a1a1a]"
          onClick={() =>
            addItem({
              productId: product.id,
              name: product.name,
              price: product.price,
              image,
              selectedOptions: {},
            })
          }
        >
          Add to Cart +
        </button>
      </div>
    </article>
  );
}

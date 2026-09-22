"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/features/products/types/product.types";

type ProductImagesProps = {
  product: Product;
};

/** US-04: product image gallery. */
export function ProductImages({ product }: ProductImagesProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const images = product.images;
  const selected = images[selectedIndex] ?? images[0];

  if (!selected) {
    return (
      <div className="flex h-[320px] items-center justify-center rounded-lg bg-[#ebe6de] text-[#605a54] lg:h-[600px]">
        No product images yet
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <div className="relative h-[360px] overflow-hidden rounded-lg sm:h-[480px] lg:h-[600px]">
        <Image
          src={selected}
          alt={product.name}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      {images.length > 1 ? (
        <div className="flex gap-3 sm:gap-4">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`View image ${index + 1}`}
              aria-pressed={index === selectedIndex}
              className={cn(
                "relative h-[72px] min-w-0 flex-1 overflow-hidden rounded sm:h-[100px] lg:h-[120px]",
                index === selectedIndex
                  ? "outline-2 outline-[#c5a880] outline-offset-0"
                  : "outline-none",
              )}
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
                sizes="20vw"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

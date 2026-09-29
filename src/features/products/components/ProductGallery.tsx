"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/features/products/types/product.types";
import { useProductCopy } from "@/features/products/hooks/useProductCopy";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

type ProductGalleryProps = {
  product: Product;
};

/** US-04: product image gallery with a keyboard-operable thumbnail strip. */
export function ProductGallery({ product }: ProductGalleryProps) {
  const { dict, fill } = useI18n();
  const copy = useProductCopy(product);
  const [activeIndex, setActiveIndex] = useState(0);
  const images = product.images;
  const activeImage = images[activeIndex] ?? images[0];

  if (!activeImage) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-lg bg-shell text-[12px] text-muted">
        {dict.product.noImages}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="group relative aspect-[656/600] overflow-hidden rounded-lg bg-shell">
        <Image
          key={activeImage}
          src={activeImage}
          alt={fill(dict.product.bottleAlt, { name: copy.name })}
          fill
          priority
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="animate-[fade-in_0.4s_ease-out] object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </div>

      {images.length > 1 ? (
        <ul
          className="flex gap-4"
          aria-label={fill(dict.product.galleryLabel, { name: copy.name })}
        >
          {images.map((image, index) => (
            <li key={image} className="flex-1">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={fill(dict.product.imageOf, {
                  index: index + 1,
                  total: images.length,
                })}
                aria-current={index === activeIndex ? "true" : undefined}
                className={cn(
                  "relative h-[120px] w-full overflow-hidden rounded transition-all duration-300",
                  index === activeIndex
                    ? "border-2 border-gold"
                    : "border border-line hover:border-muted",
                )}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

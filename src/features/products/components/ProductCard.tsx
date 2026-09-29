"use client";

import Image from "next/image";
import Link from "next/link";
import { showToast } from "@/components/ui/toast";
import { useCart } from "@/features/cart";
import { useProductCopy } from "@/features/products/hooks/useProductCopy";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { productPaths } from "@/features/products/paths";
import { openQuickView } from "@/features/products/stores/quick-view.store";
import type { Product } from "@/features/products/types/product.types";
import {
  formatWholePrice,
  getDefaultVariant,
  isPurchasable,
} from "@/features/products/utils/product.utils";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { dict, fill } = useI18n();
  const copy = useProductCopy(product);
  const image = product.images[0];
  const variant = getDefaultVariant(product);
  const available = isPurchasable(product, variant);

  return (
    <article className="group relative flex min-w-0 flex-1 flex-col items-start gap-3 self-stretch rounded-xl border border-line/60 bg-surface p-3 sm:gap-4 sm:p-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_20px_40px_-20px_rgba(197,168,128,0.25)]">
      <Link
        href={productPaths.detail(product.id)}
        className="relative h-[200px] w-full shrink-0 overflow-hidden rounded-lg sm:h-[280px] lg:h-[320px]"
      >
        {image ? (
          <Image
            src={image}
            alt={fill(dict.product.bottleAlt, { name: copy.name })}
            fill
            loading="lazy"
            className="rounded object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            sizes="(min-width: 1280px) 28vw, (min-width: 640px) 45vw, 100vw"
          />
        ) : (
          <div className="flex size-full items-center justify-center rounded bg-shell text-[12px] text-muted">
            {dict.product.noImages}
          </div>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openQuickView(product);
          }}
          className="absolute right-3 bottom-3 left-3 flex items-center justify-center rounded-lg bg-surface/90 py-2 text-[11px] font-semibold text-ink uppercase opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:bg-gold hover:text-night"
        >
          {dict.product.quickView}
        </button>
      </Link>

      <div className="flex w-full flex-col items-start gap-3">
        <div className="flex w-full items-start justify-between gap-3">
          <Link
            href={productPaths.detail(product.id)}
            className="flex min-w-0 flex-col items-start gap-1"
          >
            <h3 className="w-full font-serif text-[18px] leading-tight text-ink transition-colors duration-300 group-hover:text-gold sm:truncate sm:text-[22px]">
              {copy.name}
            </h3>
            <p className="line-clamp-2 w-full text-[10px] text-gold uppercase sm:truncate sm:text-[11px]">
              {copy.notes}
            </p>
          </Link>
          <p className="shrink-0 text-[14px] font-semibold text-ink tabular-nums sm:text-[15px]">
            {formatWholePrice(variant?.price ?? 0)}
          </p>
        </div>

        <button
          type="button"
          disabled={!available || !variant}
          aria-label={`${dict.product.addToCart} — ${copy.name} ${variant?.label ?? ""}`}
          className="flex w-full items-center justify-center rounded border border-line py-2.5 text-[10px] font-semibold text-ink uppercase sm:py-3 sm:text-[11px] transition-colors duration-300 hover:border-ink hover:bg-inverse hover:text-on-inverse disabled:cursor-not-allowed disabled:border-line disabled:bg-surface disabled:text-[#b8b2aa]"
          onClick={() => {
            if (!variant) return;
            addItem({
              productId: product.id,
              variantId: variant.id,
              name: product.name,
              variantLabel: variant.label,
              unitPrice: variant.price,
              giftWrapping: false,
              image,
            });
            showToast({
              title: dict.product.added,
              message: `${copy.name} (${variant.label})`,
              image,
              type: "success",
              action: {
                label: dict.nav.cart,
                href: "/cart",
              },
            });
          }}
        >
          {available ? dict.product.addToCartShort : dict.product.soldOut}
        </button>
      </div>
    </article>
  );
}

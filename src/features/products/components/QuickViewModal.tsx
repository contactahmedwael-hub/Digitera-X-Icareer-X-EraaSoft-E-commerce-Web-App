"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CloseIcon } from "@/components/icons";
import { showToast } from "@/components/ui/toast";
import { useCart } from "@/features/cart";
import { useProductCopy } from "@/features/products/hooks/useProductCopy";
import { productPaths } from "@/features/products/paths";
import { useQuickViewStore } from "@/features/products/stores/quick-view.store";
import { formatWholePrice, isPurchasable } from "@/features/products/utils/product.utils";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function QuickViewModal() {
  const { product, isOpen, close } = useQuickViewStore();
  const { addItem } = useCart();
  const { dict } = useI18n();
  const copy = useProductCopy(product ?? ({} as never));
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (!isOpen) return;
    window.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  useEffect(() => {
    setSelectedVariantId(null);
  }, [product?.id]);

  if (!isOpen || !product) return null;

  const currentVariant =
    (selectedVariantId ? product.variants.find((v) => v.id === selectedVariantId) : null) ??
    product.variants[0];
  const available = isPurchasable(product, currentVariant);
  const image = product.images[0];

  function handleAddToCart() {
    if (!currentVariant) return;
    addItem({
      productId: product!.id,
      variantId: currentVariant.id,
      name: product!.name,
      variantLabel: currentVariant.label,
      unitPrice: currentVariant.price,
      giftWrapping: false,
      image,
    });
    showToast({
      title: dict.product.added,
      message: `${copy.name} (${currentVariant.label})`,
      image,
      type: "success",
      action: { label: dict.nav.cart, href: "/cart" },
    });
    close();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <div
        className="fixed inset-0 bg-night/60 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]"
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={copy.name}
        className="relative z-10 flex max-h-[92dvh] w-full max-w-[720px] flex-col overflow-hidden rounded-t-2xl border border-line bg-surface shadow-2xl animate-[scale-in_0.25s_cubic-bezier(0.22,1,0.36,1)] sm:max-h-[85vh] sm:rounded-2xl"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close modal"
          className="absolute top-3 end-3 z-20 flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-sm transition-colors hover:bg-gold hover:text-night"
        >
          <CloseIcon size={16} />
        </button>

        <div className="min-h-0 overflow-y-auto overscroll-contain">
          <div className="grid items-start gap-4 p-4 pt-14 sm:gap-6 sm:p-8 sm:pt-8 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-shell sm:aspect-square">
              {image && (
                <Image
                  src={image}
                  alt={copy.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 360px, 100vw"
                />
              )}
            </div>

            <div className="flex flex-col gap-3 text-start sm:gap-4">
              <div>
                <p className="text-[11px] font-semibold tracking-widest text-gold uppercase">
                  {product.category}
                </p>
                <h2 className="mt-1 font-serif text-[22px] text-ink sm:text-[26px]">
                  {copy.name}
                </h2>
                <p className="mt-1 text-[12px] text-gold">{copy.notes}</p>
              </div>

              <p className="text-[13px] leading-relaxed text-muted line-clamp-3">
                {copy.description}
              </p>

              <div className="flex items-baseline gap-2">
                <span className="text-[20px] font-semibold text-ink">
                  {formatWholePrice(currentVariant?.price ?? 0)}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`min-h-10 rounded-lg border px-3 py-1.5 text-[11px] font-medium transition-all ${
                      v.id === currentVariant?.id
                        ? "border-gold bg-gold/10 text-gold shadow-xs"
                        : "border-line text-muted hover:border-ink hover:text-ink"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>

              <div className="mt-1 flex flex-col gap-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:mt-2 sm:flex-row">
                <button
                  type="button"
                  disabled={!available}
                  onClick={handleAddToCart}
                  className="flex-1 rounded-xl bg-inverse py-3 text-center text-[12px] font-bold text-on-inverse uppercase transition-all hover:opacity-90 active:scale-[0.98] disabled:bg-[#b8b2aa]"
                >
                  {available ? dict.product.addToCart : dict.product.soldOut}
                </button>
                <Link
                  href={productPaths.detail(product.id)}
                  onClick={close}
                  className="flex items-center justify-center rounded-xl border border-line px-4 py-3 text-center text-[12px] font-semibold text-ink uppercase hover:border-gold hover:text-gold"
                >
                  {dict.common.browseAll}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
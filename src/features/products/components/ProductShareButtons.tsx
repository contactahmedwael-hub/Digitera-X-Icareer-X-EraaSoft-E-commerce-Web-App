"use client";

import { WhatsAppIcon } from "@/components/icons";
import { showToast } from "@/components/ui/toast";
import type { Product } from "@/features/products/types/product.types";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function ProductShareButtons({ product }: { product: Product }) {
  const { dict } = useI18n();

  const shareText = `Discover ${product.name} on Odoratus — ${product.notes}`;

  function handleCopy() {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      showToast({
        title: dict.product.linkCopied,
        message: window.location.href,
        type: "info",
      });
    }
  }

  function handleNativeShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: product.name,
        text: shareText,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  }

  const whatsAppShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `${shareText}\n${typeof window !== "undefined" ? window.location.href : ""}`
  )}`;

  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
        {dict.product.share}:
      </span>
      <a
        href={whatsAppShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={dict.product.shareOnWhatsApp}
        className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-[11px] font-medium text-ink transition-all hover:border-emerald-500 hover:text-emerald-600"
      >
        <WhatsAppIcon size={14} />
        <span>WhatsApp</span>
      </a>

      <button
        type="button"
        onClick={handleNativeShare}
        className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-[11px] font-medium text-ink transition-all hover:border-gold hover:text-gold cursor-pointer"
      >
        <span>🔗</span>
        <span>{dict.product.linkCopied}</span>
      </button>
    </div>
  );
}

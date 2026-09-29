"use client";

import Link from "next/link";
import { BagIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { productPaths } from "@/features/products";
import { useI18n } from "@/lib/i18n/I18nProvider";

/** Shown when someone reaches checkout with nothing in their bag. */
export function EmptyCheckout() {
  const { dict } = useI18n();

  return (
    <section className="flex flex-col items-center gap-4 px-4 py-20 text-center">
      <BagIcon size={28} className="text-gold" />
      <h1 className="font-serif text-[26px] text-ink">
        {dict.checkout.emptyTitle}
      </h1>
      <p className="max-w-sm text-[13px] leading-relaxed text-muted">
        {dict.checkout.emptyBody}
      </p>
      <Link href={productPaths.list}>
        <Button>{dict.common.browseAll}</Button>
      </Link>
    </section>
  );
}

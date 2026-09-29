"use client";

import Link from "next/link";
import { OdoratusMark } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { productPaths } from "@/features/products/paths";
import { useI18n } from "@/lib/i18n/I18nProvider";

type ProductNotFoundProps = {
  isError?: boolean;
  onRetry?: () => void;
};

/** Covers both "this fragrance does not exist" and "the request failed". */
export function ProductNotFound({
  isError = false,
  onRetry,
}: ProductNotFoundProps) {
  const { dict } = useI18n();

  return (
    <section className="mx-auto flex max-w-lg flex-col items-center gap-5 px-4 py-24 text-center">
      <OdoratusMark size={40} className="text-gold" />

      <h1 className="font-serif text-[30px] text-ink">
        {isError ? dict.product.errorTitle : dict.product.notFound}
      </h1>

      <p className="text-[13px] leading-relaxed text-muted">
        {isError ? dict.product.errorBody : dict.product.notFoundBody}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {isError && onRetry ? (
          <Button onClick={onRetry}>{dict.common.retry}</Button>
        ) : null}
        <Link href={productPaths.list}>
          <Button variant="secondary">{dict.common.browseAll}</Button>
        </Link>
      </div>
    </section>
  );
}

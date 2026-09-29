"use client";

import Link from "next/link";
import { OdoratusMark } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { productPaths } from "@/features/products";
import { useI18n } from "@/lib/i18n/I18nProvider";

export default function NotFound() {
  const { dict } = useI18n();

  return (
    <section className="mx-auto flex max-w-lg flex-col items-center gap-5 px-4 py-24 text-center">
      <OdoratusMark size={40} className="text-gold" />
      <h1 className="font-serif text-[32px] text-ink">
        {dict.errors.pageNotFound}
      </h1>
      <p className="text-[13px] leading-relaxed text-muted">
        {dict.errors.pageNotFoundBody}
      </p>
      <Link href={productPaths.list}>
        <Button>{dict.common.browseAll}</Button>
      </Link>
    </section>
  );
}

"use client";

import Link from "next/link";
import { CheckIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { productPaths } from "@/features/products";
import { useI18n } from "@/lib/i18n/I18nProvider";

type AuthSuccessProps = {
  title: string;
  message: string;
  onReset: () => void;
  resetLabel: string;
};

/** Replaces the form once the simulated request resolves. */
export function AuthSuccess({
  title,
  message,
  onReset,
  resetLabel,
}: AuthSuccessProps) {
  const { dict } = useI18n();

  return (
    <div
      role="status"
      className="animate-[scale-in_0.4s_cubic-bezier(0.22,1,0.36,1)_both] rounded border border-line bg-surface p-7 text-center"
    >
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-success/12 text-success">
        <CheckIcon size={24} />
      </span>

      <h2 className="mt-4 font-serif text-[22px] text-ink">{title}</h2>
      <p className="mt-2 text-[13px] leading-relaxed text-muted">{message}</p>

      <div className="mt-6 flex flex-col gap-2.5">
        <Link href={productPaths.list} className="block">
          <Button variant="primary" size="lg" className="w-full">
            {dict.common.browseAll}
          </Button>
        </Link>
        <Button variant="ghost" size="md" onClick={onReset}>
          {resetLabel}
        </Button>
      </div>
    </div>
  );
}

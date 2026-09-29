"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/I18nProvider";

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RouteError({ error, reset }: ErrorBoundaryProps) {
  const { dict } = useI18n();

  useEffect(() => {
    console.error("[odoratus] route error", error);
  }, [error]);

  return (
    <section className="mx-auto flex max-w-lg flex-col items-center gap-5 px-4 py-24 text-center">
      <h1 className="font-serif text-[32px] text-ink">{dict.errors.generic}</h1>
      <p className="text-[13px] leading-relaxed text-muted">
        {dict.errors.genericBody}
      </p>
      <Button onClick={reset}>{dict.common.retry}</Button>
    </section>
  );
}

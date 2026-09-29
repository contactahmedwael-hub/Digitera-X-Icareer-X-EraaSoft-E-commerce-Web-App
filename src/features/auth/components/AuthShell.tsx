"use client";

import Link from "next/link";
import { OdoratusMark } from "@/components/icons";
import { useI18n } from "@/lib/i18n/I18nProvider";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

/**
 * The frame both auth screens share: a quiet editorial panel on the left at
 * desktop widths, the form on the right. Below `lg` the panel is dropped
 * rather than stacked — on a phone it would only push the form off-screen.
 */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: AuthShellProps) {
  const { dict } = useI18n();

  return (
    <div className="grid min-h-[calc(100vh-64px)] lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-shell p-12 lg:flex xl:p-16">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -end-24 -top-24 size-[420px] rounded-full bg-gold/10 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -start-20 size-[360px] rounded-full bg-gold/10 blur-3xl"
        />

        <Link
          href="/"
          className="relative flex items-center gap-3 text-ink transition-opacity duration-300 hover:opacity-70"
        >
          <OdoratusMark size={34} className="text-gold" />
          <span className="font-serif text-[20px]">{dict.common.brand}</span>
        </Link>

        <div className="relative max-w-[420px] animate-[fade-up_0.7s_cubic-bezier(0.22,1,0.36,1)_both]">
          <p className="font-serif text-[30px] leading-[1.35] text-ink xl:text-[36px]">
            {dict.auth.asideQuote}
          </p>
          <p className="mt-6 text-[11px] tracking-[0.2em] text-muted uppercase">
            {dict.auth.asideCaption}
          </p>
        </div>

        <Link
          href="/"
          className="relative text-[11px] font-semibold tracking-wide text-muted uppercase transition-colors duration-300 hover:text-gold"
        >
          {dict.auth.backToShop}
        </Link>
      </aside>

      <section className="flex items-center justify-center px-4 py-12 sm:px-8 lg:px-12 xl:px-20">
        <div className="w-full max-w-[420px] animate-[fade-up_0.5s_cubic-bezier(0.22,1,0.36,1)_both]">
          <h1 className="font-serif text-[30px] leading-tight text-ink sm:text-[36px]">
            {title}
          </h1>
          <p className="mt-2.5 text-[13px] leading-relaxed text-muted">
            {subtitle}
          </p>

          <div className="mt-8">{children}</div>

          <div className="mt-8 border-t border-line pt-6">{footer}</div>
        </div>
      </section>
    </div>
  );
}

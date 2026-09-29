"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { getContentPage } from "@/features/content/data";
import { productPaths } from "@/features/products";
import { useI18n } from "@/lib/i18n/I18nProvider";

type ContentPageViewProps = {
  slug: string;
};

/**
 * One editorial page. The copy is picked at render time from the active
 * locale, so switching language rewrites the page rather than reloading it.
 */
export function ContentPageView({ slug }: ContentPageViewProps) {
  const { dict, locale } = useI18n();
  const page = getContentPage(slug, locale);

  if (!page) return null;

  return (
    <article className="px-4 py-10 sm:px-6 md:px-10 lg:px-20 lg:py-16">
      <div className="mx-auto w-full max-w-[720px] animate-[fade-up_0.5s_cubic-bezier(0.22,1,0.36,1)_both]">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">
          {page.eyebrow}
        </p>
        <h1 className="mt-3 font-serif text-[32px] leading-tight text-ink sm:text-[44px]">
          {page.title}
        </h1>
        <p className="mt-4 text-[15px] leading-[1.7] text-muted">
          {page.intro}
        </p>

        <div className="mt-10 flex flex-col gap-9">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-[22px] text-ink">
                {section.heading}
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-[14px] leading-[1.75] text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <Link
          href={productPaths.list}
          className="mt-12 inline-flex items-center gap-2 border-t border-line pt-6 text-[12px] font-semibold tracking-wide text-gold uppercase transition-colors duration-300 hover:text-ink"
        >
          {dict.common.browseAll}
          <ArrowRightIcon size={14} className="rtl:-scale-x-100" />
        </Link>
      </div>
    </article>
  );
}

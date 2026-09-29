"use client";

import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";
import { productPaths } from "@/features/products/paths";
import { useI18n } from "@/lib/i18n/I18nProvider";

type ProductBreadcrumbsProps = {
  /** Omit on the listing page, where "All Fragrances" is the current page. */
  productName?: string;
};

export function ProductBreadcrumbs({ productName }: ProductBreadcrumbsProps) {
  const { dict, dir } = useI18n();

  const trail = [
    { label: dict.product.breadcrumbHome, href: "/" },
    { label: dict.product.breadcrumbShop, href: productPaths.list },
  ];

  if (productName) {
    trail.push({
      label: dict.product.breadcrumbFragrances,
      href: productPaths.list,
    });
  }

  const current = productName ?? dict.listing.title;

  return (
    <nav
      aria-label="Breadcrumb"
      className="px-4 py-4 sm:px-6 sm:py-6 md:px-10 lg:px-20"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map((crumb) => (
          <li key={crumb.label} className="flex items-center gap-2">
            <Link
              href={crumb.href}
              className="text-[12px] text-muted transition-colors duration-200 hover:text-ink"
            >
              {crumb.label}
            </Link>
            <ChevronRightIcon
              aria-hidden="true"
              className={dir === "rtl" ? "rotate-180 text-muted" : "text-muted"}
            />
          </li>
        ))}
        <li>
          <span
            aria-current="page"
            className="text-[12px] font-semibold text-ink"
          >
            {current}
          </span>
        </li>
      </ol>
    </nav>
  );
}

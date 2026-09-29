"use client";

import { cartPaths } from "@/features/cart";
import { contentPaths } from "@/features/content";
import { productPaths } from "@/features/products";
import { useI18n } from "@/lib/i18n/I18nProvider";

export type NavLink = {
  key: string;
  label: string;
  href: string;
};

export function usePrimaryNav(): NavLink[] {
  const { dict } = useI18n();

  return [
    { key: "home", label: dict.nav.home, href: "/" },
    { key: "shop", label: dict.nav.shop, href: productPaths.list },
    {
      key: "categories",
      label: dict.nav.categories,
      href: `${productPaths.list}?category=pure-extractions`,
    },
    {
      key: "atelier",
      label: dict.nav.atelier,
      href: `${productPaths.list}?category=atelier-oils`,
    },
  ];
}

export function useFooterNav(): { title: string; links: NavLink[] }[] {
  const { dict } = useI18n();

  return [
    {
      title: dict.footer.collections,
      links: [
        {
          key: "la-maison",
          label: dict.footer.laMaison,
          href: `${productPaths.list}?category=pure-extractions`,
        },
        {
          key: "private-reserve",
          label: dict.footer.privateReserve,
          href: `${productPaths.list}?category=private-reserve`,
        },
        {
          key: "candles",
          label: dict.footer.scentedCandles,
          href: `${productPaths.list}?category=atelier-oils`,
        },
        {
          key: "discovery",
          label: dict.footer.discoverySets,
          href: `${productPaths.list}?category=discovery-vault`,
        },
      ],
    },
    {
      title: dict.footer.customerCare,
      links: [
        {
          key: "contact",
          label: dict.footer.contactUs,
          href: "/contact",
        },
        {
          key: "consultation",
          label: dict.footer.consultation,
          href: contentPaths.page("consultation"),
        },
        {
          key: "shipping",
          label: dict.footer.shipping,
          href: contentPaths.page("shipping-returns"),
        },
        {
          key: "appointments",
          label: dict.footer.appointments,
          href: contentPaths.page("appointments"),
        },
        {
          key: "care",
          label: dict.footer.careGuide,
          href: contentPaths.page("care-guide"),
        },
      ],
    },
    {
      title: dict.footer.aboutUs,
      links: [
        {
          key: "philosophy",
          label: dict.footer.philosophy,
          href: contentPaths.page("philosophy"),
        },
        {
          key: "sourcing",
          label: dict.footer.sourcing,
          href: contentPaths.page("sourcing"),
        },
        {
          key: "sustainability",
          label: dict.footer.sustainability,
          href: contentPaths.page("sustainability"),
        },
        {
          key: "journal",
          label: dict.footer.journal,
          href: contentPaths.page("journal"),
        },
      ],
    },
  ];
}

export const utilityNav = { cart: cartPaths.cart } as const;

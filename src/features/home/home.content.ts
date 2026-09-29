import { productPaths } from "@/features/products";

/**
 * Home page imagery and links. All copy lives in the i18n dictionaries.
 * Artwork is exported from the Figma design file, see docs/ASSETS.md.
 */

export const heroImage = "/images/home/hero.webp";
export const heroCtaHref = productPaths.list;

export type ArchetypeTile = { id: string; image: string; href: string };

export const archetypes: ArchetypeTile[] = [
  {
    id: "floral",
    image: "/images/home/archetype-floral.webp",
    href: `${productPaths.list}?scentFamily=floral`,
  },
  {
    id: "woody",
    image: "/images/home/archetype-woody.webp",
    href: `${productPaths.list}?scentFamily=woody`,
  },
  {
    id: "oriental",
    image: "/images/home/archetype-oriental.webp",
    href: `${productPaths.list}?scentFamily=oriental`,
  },
  {
    id: "fresh",
    image: "/images/home/archetype-fresh.webp",
    href: `${productPaths.list}?scentFamily=fresh`,
  },
];

export type OccasionCard = { id: string; image: string; href: string };

export const occasions: OccasionCard[] = [
  {
    id: "personal-use",
    image: "/images/home/occasion-personal-use.webp",
    href: `${productPaths.list}?occasion=personal-use`,
  },
  {
    id: "wedding",
    image: "/images/home/occasion-wedding.webp",
    href: `${productPaths.list}?occasion=wedding`,
  },
  {
    id: "gift-sets",
    image: "/images/home/occasion-gift-sets.webp",
    href: `${productPaths.list}?occasion=gift-sets`,
  },
  {
    id: "birthday",
    image: "/images/home/occasion-birthday.webp",
    href: `${productPaths.list}?occasion=birthday`,
  },
];

export const promoImage = "/images/home/promo-solstice.webp";
export const promoCtaHref = productPaths.detail("atelier-oud");

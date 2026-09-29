import type { Product } from "@/features/products/types/product.types";

/**
 * The six products the task brief fixes in place: their ids, names,
 * categories, scent families, occasions and image paths must not change.
 */
export const coreSix: Product[] = [
  {
    id: "fleur-de-lune",
    sku: "ODORATUS-FDL",
    name: "Fleur de Lune",
    description:
      "Fleur de Lune settles on the skin like moonlight on linen. It opens with luminous citrus, unfolds into a jasmine heart and dries down into soft white musk.",
    notes: "Floral / Jasmine & White Musk",
    scentNotes: {
      top: ["Calabrian Neroli", "Green Mandarin"],
      heart: ["Jasmine Sambac", "Orange Blossom"],
      base: ["White Musk", "Blonde Cedarwood"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 125, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 160, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 195, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/fleur-de-lune.webp"],
    category: "pure-extractions",
    scentFamily: "floral",
    occasion: "personal-use",
    availability: "in-stock",
  },
  {
    id: "santal-parchment",
    sku: "ODORATUS-SP",
    name: "Santal Parchment",
    description:
      "Santal Parchment wraps around the skin like vintage vellum paper. It opens with bright top notes, shifting to clean papyrus and warm, rich sandalwood that dry down into dry cardamom and amber.",
    notes: "Woody / Sandalwood & Cardamom",
    scentNotes: {
      top: ["Sicilian Bergamot", "Pink Pepper"],
      heart: ["Egyptian Jasmine Sambac", "Papyrus"],
      base: ["West Indian Sandalwood", "Cardamom", "Amber"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 140, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 180, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 220, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: [
      "/images/products/santal-parchment.webp",
      "/images/products/santal-parchment-2.webp",
      "/images/products/santal-parchment-3.webp",
      "/images/products/santal-parchment-4.webp",
    ],
    category: "pure-extractions",
    scentFamily: "woody",
    occasion: "personal-use",
    availability: "in-stock",
  },
  {
    id: "noir-cocoon",
    sku: "ODORATUS-NC",
    name: "Noir Cocoon",
    description:
      "Noir Cocoon draws the evening close. Smoked tobacco leaf gives way to a cacao heart before resting in a long, resinous amber trail.",
    notes: "Oriental / Tobacco & Amber",
    scentNotes: {
      top: ["Tobacco Leaf", "Spiced Ginger"],
      heart: ["Cacao Absolute", "Tonka Bean"],
      base: ["Grey Amber", "Dry Woods"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 155, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 195, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 240, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/noir-cocoon.webp"],
    category: "private-reserve",
    scentFamily: "oriental",
    occasion: "wedding",
    availability: "in-stock",
  },
  {
    id: "sol-dor",
    sku: "ODORATUS-SD",
    name: "Sol d'Or",
    description:
      "Sol d'Or holds the last hour of daylight on the coast. Salted bergamot opens onto mineral driftwood before a sunlit amber finish.",
    notes: "Fresh / Bergamot & Sea Salt",
    scentNotes: {
      top: ["Calabrian Bergamot", "Sea Salt"],
      heart: ["Mineral Driftwood", "Orange Blossom"],
      base: ["White Musk", "Sunlit Amber"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 120, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 150, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 185, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/sol-dor.webp"],
    category: "pure-extractions",
    scentFamily: "fresh",
    occasion: "personal-use",
    availability: "made-to-order",
  },
  {
    id: "atelier-oud",
    sku: "ODORATUS-AO",
    name: "Atelier Oud",
    description:
      "Atelier Oud is the house at its most concentrated. Saffron and damask rose open onto rich oud, closing on smoked leather and birch.",
    notes: "Woody / Rich Oud & Saffron",
    scentNotes: {
      top: ["Saffron", "Damask Rose"],
      heart: ["Laotian Oud", "Frankincense"],
      base: ["Smoked Leather", "Birch Tar"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 195, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 255, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 310, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/atelier-oud.webp"],
    category: "atelier-oils",
    scentFamily: "woody",
    occasion: "gift-sets",
    availability: "in-stock",
  },
  {
    id: "rose-absolute",
    sku: "ODORATUS-RA",
    name: "Rose Absolute",
    description:
      "Rose Absolute is a rose without sweetness. Dewy greens lift a damask heart that settles onto cedar and earthy patchouli.",
    notes: "Floral / Damask Rose & Cedar",
    scentNotes: {
      top: ["Pink Pepper", "Dewy Greens"],
      heart: ["Damask Rose", "Geranium"],
      base: ["Virginia Cedarwood", "Patchouli"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 130, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 170, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 205, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/rose-absolute.webp"],
    category: "private-reserve",
    scentFamily: "floral",
    occasion: "birthday",
    availability: "in-stock",
  },
];

import type { Product } from "@/features/products/types/product.types";

/** Private Reserve — the limited, higher-priced line. */
export const privateReserve: Product[] = [
  {
    id: "velours-noir",
    sku: "ODORATUS-VN",
    name: "Velours Noir",
    description:
      "Velours Noir falls like a curtain at the end of an evening. Cool incense opens onto brushed suede before a long labdanum close.",
    notes: "Oriental / Incense & Leather",
    scentNotes: {
      top: ["Black Pepper", "Elemi"],
      heart: ["Frankincense", "Suede"],
      base: ["Labdanum", "Patchouli"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 170, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 215, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 265, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/rose-absolute.webp"],
    category: "private-reserve",
    scentFamily: "oriental",
    occasion: "personal-use",
    availability: "in-stock",
  },
  {
    id: "bois-de-minuit",
    sku: "ODORATUS-BDM",
    name: "Bois de Minuit",
    description:
      "Bois de Minuit is a forest after dark. Green cardamom lifts Haitian vetiver before birch smoke draws the night in.",
    notes: "Woody / Vetiver & Smoke",
    scentNotes: {
      top: ["Green Cardamom", "Grapefruit Peel"],
      heart: ["Haitian Vetiver", "Cypress"],
      base: ["Birch Smoke", "Dry Amber"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 180, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 235, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 285, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/noir-cocoon.webp"],
    category: "private-reserve",
    scentFamily: "woody",
    occasion: "wedding",
    availability: "in-stock",
  },
  {
    id: "nuit-persane",
    sku: "ODORATUS-NP",
    name: "Nuit Persane",
    description:
      "Nuit Persane is a rose at its most opulent. Saffron and plum wrap a damask heart before an oud and benzoin close.",
    notes: "Oriental / Saffron & Rose",
    scentNotes: {
      top: ["Saffron", "Candied Plum"],
      heart: ["Damask Rose", "Turkish Rose Oil"],
      base: ["Oud Accord", "Benzoin"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 220, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 280, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 340, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/santal-parchment.webp"],
    category: "private-reserve",
    scentFamily: "oriental",
    occasion: "wedding",
    availability: "in-stock",
  },
  {
    id: "oud-royal",
    sku: "ODORATUS-OR",
    name: "Oud Royal",
    description:
      "Oud Royal is the house at full volume. Saffron and nutmeg open onto Cambodian oud and smoked leather.",
    notes: "Woody / Cambodian Oud & Leather",
    scentNotes: {
      top: ["Saffron", "Nutmeg"],
      heart: ["Cambodian Oud", "Smoked Leather"],
      base: ["Agarwood", "Grey Amber"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 255, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 325, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 395, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/fleur-de-lune.webp"],
    category: "private-reserve",
    scentFamily: "woody",
    occasion: "gift-sets",
    availability: "made-to-order",
  },
  {
    id: "rose-poudree",
    sku: "ODORATUS-RP",
    name: "Rose Poudrée",
    description:
      "Rose Poudrée is a rose seen through powder. May rose and violet rest on orris butter and clean musk.",
    notes: "Floral / Powdered Rose & Violet",
    scentNotes: {
      top: ["Raspberry Leaf", "Pink Pepper"],
      heart: ["May Rose", "Violet"],
      base: ["Orris Butter", "White Musk"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 165, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 210, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 255, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/fleur-de-lune.webp"],
    category: "private-reserve",
    scentFamily: "floral",
    occasion: "birthday",
    availability: "in-stock",
  },
];

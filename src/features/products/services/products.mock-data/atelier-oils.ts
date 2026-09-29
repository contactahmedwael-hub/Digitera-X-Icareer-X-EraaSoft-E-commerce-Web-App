import type { Product } from "@/features/products/types/product.types";

/** Atelier Oils — concentrated oils poured in the studio. */
export const atelierOils: Product[] = [
  {
    id: "ambre-solaire",
    sku: "ODORATUS-AS",
    name: "Ambre Solaire",
    description:
      "Ambre Solaire keeps the last heat of the day. Blood orange melts into benzoin and a slow, golden amber trail.",
    notes: "Oriental / Amber & Benzoin",
    scentNotes: {
      top: ["Blood Orange", "Pink Pepper"],
      heart: ["Siam Benzoin", "Immortelle"],
      base: ["Golden Amber", "Vanilla Absolute"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 145, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 190, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 230, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/atelier-oud.webp"],
    category: "atelier-oils",
    scentFamily: "oriental",
    occasion: "gift-sets",
    availability: "in-stock",
  },
  {
    id: "papier-vetiver",
    sku: "ODORATUS-PV",
    name: "Papier Vétiver",
    description:
      "Papier Vétiver smells of an old library. Bergamot lifts Java vetiver over papyrus and a quiet vanilla base.",
    notes: "Woody / Vetiver & Paper",
    scentNotes: {
      top: ["Bergamot", "Pink Peppercorn"],
      heart: ["Java Vetiver", "Papyrus"],
      base: ["Cedarwood", "Vanilla Bourbon"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 135, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 170, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 210, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/rose-absolute.webp"],
    category: "atelier-oils",
    scentFamily: "woody",
    occasion: "personal-use",
    availability: "in-stock",
  },
  {
    id: "miel-fume",
    sku: "ODORATUS-MF",
    name: "Miel Fumé",
    description:
      "Miel Fumé is warmth without sweetness. Honey and tobacco leaf settle onto tonka and a dry amber base.",
    notes: "Oriental / Honey & Tobacco",
    scentNotes: {
      top: ["Bitter Orange", "Cinnamon Bark"],
      heart: ["Honey Absolute", "Tobacco Leaf"],
      base: ["Tonka Bean", "Dry Amber"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 155, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 200, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 245, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/sol-dor.webp"],
    category: "atelier-oils",
    scentFamily: "oriental",
    occasion: "personal-use",
    availability: "in-stock",
  },
  {
    id: "encens-blanc",
    sku: "ODORATUS-EB",
    name: "Encens Blanc",
    description:
      "Encens Blanc is incense without smoke. Omani frankincense and myrrh over a pale amber and sandalwood base.",
    notes: "Oriental / Frankincense & Myrrh",
    scentNotes: {
      top: ["Elemi", "Pink Pepper"],
      heart: ["Omani Frankincense", "Myrrh"],
      base: ["White Amber", "Sandalwood"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 175, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 225, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 275, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/sol-dor.webp"],
    category: "atelier-oils",
    scentFamily: "oriental",
    occasion: "wedding",
    availability: "made-to-order",
  },
];

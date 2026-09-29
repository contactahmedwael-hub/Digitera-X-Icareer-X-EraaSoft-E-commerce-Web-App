import type { Product } from "@/features/products/types/product.types";

/** Pure Extractions — the open house line. */
export const pureExtractions: Product[] = [
  {
    id: "iris-cendre",
    sku: "ODORATUS-IC",
    name: "Iris Cendré",
    description:
      "Iris Cendré holds the quiet after a fire. Powdered iris sits over violet leaf and settles into cool cashmere wood.",
    notes: "Floral / Iris & Ash",
    scentNotes: {
      top: ["Bergamot", "Carrot Seed"],
      heart: ["Florentine Iris", "Violet Leaf"],
      base: ["Cashmere Wood", "Grey Musk"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 110, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 145, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 175, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/fleur-de-lune.webp"],
    category: "pure-extractions",
    scentFamily: "floral",
    occasion: "personal-use",
    availability: "in-stock",
  },
  {
    id: "fleur-de-sel",
    sku: "ODORATUS-FDS",
    name: "Fleur de Sel",
    description:
      "Fleur de Sel is a coastline in late summer. Salt and bitter orange open onto fig leaf and sun-dried driftwood.",
    notes: "Fresh / Sea Salt & Fig",
    scentNotes: {
      top: ["Sea Salt", "Bitter Orange"],
      heart: ["Fig Leaf", "Mastic"],
      base: ["Driftwood", "White Musk"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 100, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 130, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 160, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/noir-cocoon.webp"],
    category: "pure-extractions",
    scentFamily: "fresh",
    occasion: "birthday",
    availability: "in-stock",
  },
  {
    id: "cedre-blanc",
    sku: "ODORATUS-CB",
    name: "Cèdre Blanc",
    description:
      "Cèdre Blanc is linen dried in the open. Lemon and juniper give way to Atlas cedar over a soft orris base.",
    notes: "Woody / White Cedar & Iris",
    scentNotes: {
      top: ["Sicilian Lemon", "Juniper"],
      heart: ["Atlas Cedar", "Orris Root"],
      base: ["Blonde Woods", "Ambrette"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 120, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 155, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 190, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/noir-cocoon.webp"],
    category: "pure-extractions",
    scentFamily: "woody",
    occasion: "personal-use",
    availability: "in-stock",
  },
  {
    id: "jardin-clos",
    sku: "ODORATUS-JC",
    name: "Jardin Clos",
    description:
      "Jardin Clos is a walled garden after rain. Green galbanum opens onto tuberose and closes on warm sandalwood.",
    notes: "Floral / Tuberose & Green Leaves",
    scentNotes: {
      top: ["Galbanum", "Green Mandarin"],
      heart: ["Tuberose Absolute", "Jasmine"],
      base: ["Sandalwood", "Tonka Bean"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 130, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 165, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 200, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/santal-parchment.webp"],
    category: "pure-extractions",
    scentFamily: "floral",
    occasion: "gift-sets",
    availability: "in-stock",
  },
  {
    id: "muguet-d-hiver",
    sku: "ODORATUS-MDH",
    name: "Muguet d'Hiver",
    description:
      "Muguet d'Hiver is a bouquet carried indoors. Cyclamen and lily of the valley rest on soft musk and pale cedar.",
    notes: "Floral / Lily of the Valley & Musk",
    scentNotes: {
      top: ["Green Mandarin", "Cyclamen"],
      heart: ["Lily of the Valley", "White Peony"],
      base: ["Soft Musk", "Blonde Cedar"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 110, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 140, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 170, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/santal-parchment.webp"],
    category: "pure-extractions",
    scentFamily: "floral",
    occasion: "wedding",
    availability: "in-stock",
  },
  {
    id: "neroli-dore",
    sku: "ODORATUS-ND",
    name: "Néroli Doré",
    description:
      "Néroli Doré is orange blossom at midday. Tunisian neroli and petitgrain warm into honeyed amber.",
    notes: "Floral / Neroli & Honeyed Amber",
    scentNotes: {
      top: ["Tunisian Neroli", "Petitgrain"],
      heart: ["Orange Blossom", "Honeysuckle"],
      base: ["Honeyed Amber", "Soft Musk"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 120, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 150, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 185, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/atelier-oud.webp"],
    category: "pure-extractions",
    scentFamily: "floral",
    occasion: "gift-sets",
    availability: "in-stock",
  },
];

import type { Product } from "@/features/products/types/product.types";

/** Discovery Vault — lighter, entry-priced compositions. */
export const discoveryVault: Product[] = [
  {
    id: "eau-de-brume",
    sku: "ODORATUS-EDB",
    name: "Eau de Brume",
    description:
      "Eau de Brume is morning air off the water. Yuzu and dew give way to green tea and a clean, almost weightless finish.",
    notes: "Fresh / Mist & Green Tea",
    scentNotes: {
      top: ["Yuzu", "Dew Accord"],
      heart: ["Green Tea", "White Freesia"],
      base: ["Blonde Woods", "Clean Musk"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 75, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 95, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 115, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/rose-absolute.webp"],
    category: "discovery-vault",
    scentFamily: "fresh",
    occasion: "personal-use",
    availability: "in-stock",
  },
  {
    id: "baie-rose",
    sku: "ODORATUS-BR",
    name: "Baie Rose",
    description:
      "Baie Rose is the first bright minute of a morning. Pink pepper and grapefruit over rhubarb and clean musk.",
    notes: "Fresh / Pink Pepper & Citrus",
    scentNotes: {
      top: ["Pink Pepper", "Blood Grapefruit"],
      heart: ["Rhubarb", "Neroli"],
      base: ["White Musk", "Light Cedar"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 80, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 100, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 125, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/atelier-oud.webp"],
    category: "discovery-vault",
    scentFamily: "fresh",
    occasion: "birthday",
    availability: "in-stock",
  },
  {
    id: "brise-marine",
    sku: "ODORATUS-BM",
    name: "Brise Marine",
    description:
      "Brise Marine is wind off open water. Sea spray and bergamot over a mineral base of driftwood and musk.",
    notes: "Fresh / Marine Accord & Driftwood",
    scentNotes: {
      top: ["Sea Spray", "Calabrian Bergamot"],
      heart: ["Marine Accord", "Rosemary"],
      base: ["Driftwood", "Mineral Musk"],
    },
    variants: [
      { id: "30ml", volume: 30, label: "30 ml", price: 85, inStock: true },
      { id: "50ml", volume: 50, label: "50 ml", price: 105, inStock: true },
      { id: "100ml", volume: 100, label: "100 ml", price: 130, inStock: true },
    ],
    giftWrappingAvailable: true,
    images: ["/images/products/sol-dor.webp"],
    category: "discovery-vault",
    scentFamily: "fresh",
    occasion: "personal-use",
    availability: "in-stock",
  },
];

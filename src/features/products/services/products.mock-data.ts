import type {
  Product,
  ProductVolume,
  ScentAnatomy,
} from "@/features/products/types/product.types";

function volumesFor(price: number): ProductVolume[] {
  return [
    { label: "30 ml", price: Math.round((price * 140) / 220) },
    { label: "50 ml", price: Math.round((price * 180) / 220) },
    { label: "100 ml", price },
  ];
}

const SANTAL_ANATOMY: ScentAnatomy = {
  description:
    "Santal Parchment wraps around the skin like vintage vellum paper. It opens with bright top notes, shifting to clean papyrus and warm, rich sandalwood that dry down into dry cardamom and amber.",
  layers: [
    { name: "Top Notes", notes: "Sicilian Bergamot, Pink Pepper" },
    { name: "Heart Notes", notes: "Egyptian Jasmine Sambac, Papyrus" },
    {
      name: "Base Notes",
      notes: "West Indian Sandalwood, Cardamom, Amber",
    },
  ],
};

export const mockProducts: Product[] = [
  {
    id: "fleur-de-lune",
    name: "Fleur de Lune",
    description: "A luminous floral composition of jasmine and white musk.",
    notes: "Floral / Jasmine & White Musk",
    price: 195,
    images: ["/images/products/fleur-de-lune.png"],
    category: "pure-extractions",
    scentFamily: "floral",
    occasion: "personal-use",
    options: [],
    volumes: volumesFor(195),
    scentAnatomy: {
      description:
        "Fleur de Lune opens like moonlight on white petals. Jasmine sambac rises first, then a clean white musk settles close to the skin.",
      layers: [
        { name: "Top Notes", notes: "Neroli, Pear Blossom" },
        { name: "Heart Notes", notes: "Jasmine Sambac, Orange Flower" },
        { name: "Base Notes", notes: "White Musk, Blonde Woods" },
      ],
    },
    availableInAtelier: true,
  },
  {
    id: "santal-parchment",
    name: "Santal Parchment",
    description: "Warm sandalwood layered with cardamom.",
    notes: "Woody / Sandalwood & Cardamom",
    price: 220,
    images: [
      "/images/products/santal-parchment.png",
      "/images/products/santal-parchment-2.png",
      "/images/products/santal-parchment-3.png",
    ],
    category: "pure-extractions",
    scentFamily: "woody",
    occasion: "evening",
    options: [],
    volumes: [
      { label: "30 ml", price: 140 },
      { label: "50 ml", price: 180 },
      { label: "100 ml", price: 220 },
    ],
    scentAnatomy: SANTAL_ANATOMY,
    availableInAtelier: true,
  },
  {
    id: "noir-cocoon",
    name: "Noir Cocoon",
    description: "An oriental blend of tobacco and amber.",
    notes: "Oriental / Tobacco & Amber",
    price: 240,
    images: ["/images/products/noir-cocoon.png"],
    category: "private-reserve",
    scentFamily: "oriental",
    occasion: "wedding",
    options: [],
    volumes: volumesFor(240),
    scentAnatomy: {
      description:
        "Noir Cocoon is a warm enclosure of tobacco leaf and resin. Smoke and spice give way to a deep amber dry-down.",
      layers: [
        { name: "Top Notes", notes: "Black Pepper, Bergamot" },
        { name: "Heart Notes", notes: "Tobacco Leaf, Labdanum" },
        { name: "Base Notes", notes: "Amber, Tonka Bean" },
      ],
    },
    availableInAtelier: true,
  },
  {
    id: "sol-dor",
    name: "Sol d'Or",
    description: "A fresh coastal blend of bergamot and sea salt.",
    notes: "Fresh / Bergamot & Sea Salt",
    price: 185,
    images: ["/images/products/sol-dor.png"],
    category: "pure-extractions",
    scentFamily: "fresh",
    occasion: "personal-use",
    options: [],
    volumes: volumesFor(185),
    scentAnatomy: {
      description:
        "Sol d'Or is sunlight on salt water. Bright citrus lifts first, then a mineral sea-salt heart dries into warm woods.",
      layers: [
        { name: "Top Notes", notes: "Bergamot, Lemon Zest" },
        { name: "Heart Notes", notes: "Sea Salt, Neroli" },
        { name: "Base Notes", notes: "Driftwood, White Musk" },
      ],
    },
    availableInAtelier: true,
  },
  {
    id: "atelier-oud",
    name: "Atelier Oud",
    description: "Rich oud deepened with saffron.",
    notes: "Woody / Rich Oud & Saffron",
    price: 310,
    images: ["/images/products/atelier-oud.png"],
    category: "atelier-oils",
    scentFamily: "woody",
    occasion: "gift-sets",
    options: [],
    volumes: volumesFor(310),
    scentAnatomy: {
      description:
        "Atelier Oud is a concentrated wood oil: saffron heat over smoky oud, settling into leathered resin.",
      layers: [
        { name: "Top Notes", notes: "Saffron, Pink Pepper" },
        { name: "Heart Notes", notes: "Oud, Rose Absolute" },
        { name: "Base Notes", notes: "Leather, Patchouli" },
      ],
    },
    availableInAtelier: true,
  },
  {
    id: "rose-absolute",
    name: "Rose Absolute",
    description: "Damask rose balanced with cedar.",
    notes: "Floral / Damask Rose & Cedar",
    price: 205,
    images: ["/images/products/rose-absolute.png"],
    category: "private-reserve",
    scentFamily: "floral",
    occasion: "birthday",
    options: [],
    volumes: volumesFor(205),
    scentAnatomy: {
      description:
        "Rose Absolute is a true damask rose, lifted by a green stem and grounded in dry cedar.",
      layers: [
        { name: "Top Notes", notes: "Rosewater, Green Leaves" },
        { name: "Heart Notes", notes: "Damask Rose, Peony" },
        { name: "Base Notes", notes: "Cedar, Soft Musk" },
      ],
    },
    availableInAtelier: true,
  },
];

import type { ContentPage } from "@/features/content/types/content.types";

/** Pages about the house itself: how it works and what it stands behind. */
export const housePages: ContentPage[] = [
  {
    slug: "philosophy",
    eyebrow: "About Us",
    title: "Our Philosophy",
    intro:
      "We make fewer things, more slowly, and we would rather a composition be quiet than loud.",
    sections: [
      {
        heading: "Restraint",
        body: [
          "A fragrance does not need forty materials to say something. Most of ours use between twelve and twenty, and every one of them has a reason to be there.",
          "Where a note would only add volume, we leave it out. That is why our compositions sit close to the skin rather than filling a room.",
        ],
      },
      {
        heading: "Time",
        body: [
          "Each formula rests for at least eight weeks between trials. Maceration changes a composition more than most reformulations do.",
          "Nothing is released to meet a season. A fragrance leaves the studio when it is finished, which is sometimes two years after it was started.",
        ],
      },
    ],
  },
  {
    slug: "sourcing",
    eyebrow: "About Us",
    title: "Sourcing Standards",
    intro:
      "Where a material comes from changes how it smells, and who was paid for it changes whether we buy it.",
    sections: [
      {
        heading: "Origin",
        body: [
          "We buy rose from Isparta and Grasse, sandalwood from certified Australian plantations, and vetiver from Haiti through a cooperative we have worked with since the first year.",
          "Batch numbers stay with a material through the studio, so any bottle can be traced back to the harvest it came from.",
        ],
      },
      {
        heading: "What we will not use",
        body: [
          "No wild-harvested agarwood, no natural musk, and no material whose supply chain we cannot see to the farm.",
          "Where a natural cannot be sourced responsibly, we use a synthetic and say so. A good synthetic is not a compromise.",
        ],
      },
    ],
  },
  {
    slug: "sustainability",
    eyebrow: "About Us",
    title: "Sustainability Commitments",
    intro:
      "Perfume is a small industry with a large footprint. These are the parts of ours we can measure.",
    sections: [
      {
        heading: "Packaging",
        body: [
          "Bottles are glass with an aluminium collar, both recyclable once separated. The outer box is uncoated board printed with vegetable inks.",
          "We stopped using cellophane in the second year and have not found a case where it was needed since.",
        ],
      },
      {
        heading: "Refills",
        body: [
          "Every 100 ml bottle can be refilled at the studio for sixty percent of the original price. Roughly a third of our customers now do.",
        ],
      },
    ],
  },
  {
    slug: "journal",
    eyebrow: "About Us",
    title: "Journal",
    intro:
      "Notes from the studio: what we are working on, what failed, and the occasional argument about a material.",
    sections: [
      {
        heading: "On reformulating Santal Parchment",
        body: [
          "The first version used a sandalwood that we could no longer trace to a certified plantation. Replacing it took nine months and three failed trials.",
          "The composition that shipped is drier than the original. We think it is better; the two people who preferred the first one have told us at length that it is not.",
        ],
      },
      {
        heading: "On the smell of paper",
        body: [
          "Papyrus, vellum and newsprint smell nothing alike, and only one of them is pleasant. Most of what people call the smell of an old book is lignin breaking down.",
        ],
      },
    ],
  },
];

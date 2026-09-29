import type { ContentPage } from "@/features/content/types/content.types";

/** Customer-care pages: what happens after, and before, an order. */
export const carePages: ContentPage[] = [
  {
    slug: "shipping-returns",
    eyebrow: "Customer Care",
    title: "Shipping & Returns",
    intro:
      "Every bottle is packed by hand in the studio, which is why an order takes a day or two to leave us.",
    sections: [
      {
        heading: "Dispatch",
        body: [
          "Orders placed before 14:00 are packed the same working day. Anything after that, or over a weekend, goes out on the next one.",
          "Made-to-order compositions are poured in small batches and need five to seven days before they ship.",
        ],
      },
      {
        heading: "Delivery",
        body: [
          "Domestic orders arrive within two to four working days. International delivery takes seven to fourteen, depending on customs.",
          "Shipping is complimentary on orders above $150. Below that a flat $12 is added at checkout.",
        ],
      },
      {
        heading: "Returns",
        body: [
          "Unopened bottles can be returned within thirty days of delivery for a full refund. Keep the seal intact — fragrance cannot be resold once broken.",
          "Discovery sets and personalised engravings are final sale. Write to us before returning anything so we can arrange the collection.",
        ],
      },
    ],
  },
  {
    slug: "care-guide",
    eyebrow: "Customer Care",
    title: "Care Guide",
    intro:
      "Fragrance is perishable. Treated well, a bottle holds its character for years; left on a sunlit sill, it turns in months.",
    sections: [
      {
        heading: "Storing",
        body: [
          "Keep bottles upright, away from direct light, and at a steady temperature. A drawer is better than a bathroom shelf.",
          "Leave the original box on. It was designed to block light, not only to look well on a shelf.",
        ],
      },
      {
        heading: "Wearing",
        body: [
          "Apply to skin rather than clothing — warmth is what lifts the composition, and alcohol stains silk.",
          "Do not rub the wrists together. It crushes the top notes and shortens the life of the whole structure.",
        ],
      },
    ],
  },
  {
    slug: "consultation",
    eyebrow: "Customer Care",
    title: "Olfactory Consultation",
    intro:
      "If you are not sure where to begin, we would rather talk to you than sell you the wrong bottle.",
    sections: [
      {
        heading: "How it works",
        body: [
          "A consultation runs about forty minutes. We ask what you have worn, what you disliked, and what you want the fragrance to do for you.",
          "You leave with three samples chosen for you, and the cost is deducted from any bottle you buy afterwards.",
        ],
      },
      {
        heading: "Booking",
        body: [
          "Consultations happen in the Paris studio, or over video if you are elsewhere. Write to us with two or three times that suit you.",
        ],
      },
    ],
  },
  {
    slug: "appointments",
    eyebrow: "Customer Care",
    title: "Atelier Appointments",
    intro:
      "The studio is a working laboratory, not a shop floor. We see a small number of visitors each week, by arrangement.",
    sections: [
      {
        heading: "What to expect",
        body: [
          "You will smell raw materials rather than finished bottles: the absolutes, the resins, the woods that the compositions are built from.",
          "Appointments last an hour and are limited to four people, so the room stays quiet enough to smell in.",
        ],
      },
      {
        heading: "Before you come",
        body: [
          "Wear no fragrance that day, and skip strongly scented soap. The nose tires quickly and you will want yours fresh.",
        ],
      },
    ],
  },
];

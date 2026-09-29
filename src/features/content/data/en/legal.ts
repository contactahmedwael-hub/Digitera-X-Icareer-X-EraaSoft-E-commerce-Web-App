import type { ContentPage } from "@/features/content/types/content.types";

/**
 * The two pages the registration checkbox refers to. This is a portfolio
 * build, and the copy says so rather than pretending to be enforceable.
 */
export const legalPages: ContentPage[] = [
  {
    slug: "terms",
    eyebrow: "Legal",
    title: "Terms of Sale",
    intro:
      "This storefront is a front-end demonstration built for a bootcamp. No goods are sold and no money changes hands.",
    sections: [
      {
        heading: "What this site is",
        body: [
          "Odoratus is a fictional house. The products, prices and descriptions were written for this project and do not correspond to anything you can buy.",
          "Placing an order here creates a record in your own browser and nothing more. No order is transmitted, fulfilled or charged for.",
        ],
      },
      {
        heading: "Accounts",
        body: [
          "Signing in does not verify anything. Any email and password are accepted, and the session is stored in your browser until you sign out.",
          "Because of that, never enter a password you use anywhere else.",
        ],
      },
      {
        heading: "If this were a real store",
        body: [
          "Orders would be confirmed by email, prices would include applicable tax, and the returns window described in Shipping & Returns would apply from the day of delivery.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    eyebrow: "Legal",
    title: "Privacy Policy",
    intro:
      "The short version: this site has no backend, so there is nowhere for your data to be sent.",
    sections: [
      {
        heading: "What is stored",
        body: [
          "Your bag, your session and any orders you place are kept in this browser's local storage. Your language and theme preference are kept in a cookie so the page renders correctly on the server.",
          "That is the entire list. There is no database, no analytics, no advertising and no third-party script collecting anything.",
        ],
      },
      {
        heading: "Who can see it",
        body: [
          "Only you, and anyone with access to this browser profile. Nothing is readable by us, because there is no us — no server ever receives it.",
        ],
      },
      {
        heading: "Removing it",
        body: [
          "Signing out clears the session. Clearing site data for this domain in your browser settings removes everything else, including the bag and the order history.",
        ],
      },
    ],
  },
];

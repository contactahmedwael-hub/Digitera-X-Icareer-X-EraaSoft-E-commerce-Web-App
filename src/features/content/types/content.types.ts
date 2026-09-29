/** A static editorial page reached from the footer or the legal links. */
export type ContentSlug =
  | "shipping-returns"
  | "care-guide"
  | "consultation"
  | "appointments"
  | "philosophy"
  | "sourcing"
  | "sustainability"
  | "journal"
  | "terms"
  | "privacy";

export type ContentSection = {
  heading: string;
  body: string[];
};

export type ContentPage = {
  slug: ContentSlug;
  /** Small label above the title, e.g. "Customer Care". */
  eyebrow: string;
  title: string;
  intro: string;
  sections: ContentSection[];
};

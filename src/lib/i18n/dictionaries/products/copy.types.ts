/**
 * Per-product copy. Product ids, categories, scent families and occasions
 * stay as they are — only what a customer reads is translated.
 */
export type ProductCopy = {
  name: string;
  notes: string;
  description: string;
  scentNotes: { top: string[]; heart: string[]; base: string[] };
};

export type TaxonomyCopy = {
  category: Record<string, string>;
  scentFamily: Record<string, string>;
  occasion: Record<string, string>;
};

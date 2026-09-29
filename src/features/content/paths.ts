import type { ContentSlug } from "@/features/content/types/content.types";

export const contentPaths = {
  page: (slug: ContentSlug) => `/pages/${slug}`,
} as const;

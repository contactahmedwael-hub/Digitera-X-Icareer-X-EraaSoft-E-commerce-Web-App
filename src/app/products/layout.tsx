import type { ReactNode } from "react";

/**
 * Typography and the page shell live in the root layout, so this segment
 * only scopes the products background.
 */
export default function ProductsLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-full bg-page text-ink">{children}</div>;
}

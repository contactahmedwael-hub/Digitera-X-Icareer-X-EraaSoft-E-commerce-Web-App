import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ContentPageView,
  contentSlugs,
  getContentPage,
} from "@/features/content";
import { readPreferences } from "@/lib/i18n/server";

type PageProps = { params: Promise<{ slug: string }> };

/** Only the slugs below are routes; anything else is a real 404, not an empty shell. */
export const dynamicParams = false;

export function generateStaticParams() {
  return contentSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await readPreferences();
  const page = getContentPage(slug, locale);

  return page
    ? { title: `${page.title} | Odoratus`, description: page.intro }
    : {};
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { locale } = await readPreferences();

  // Unknown slugs get the real 404 rather than an empty shell.
  if (!getContentPage(slug, locale)) notFound();

  return <ContentPageView slug={slug} />;
}

import type { Metadata } from "next";
import { ContactHubView } from "@/features/content/components/ContactHubView";
import { readPreferences } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await readPreferences();

  return {
    title:
      locale === "ar"
        ? "تواصل معنا والاستفسارات المباشرة | Odoratus"
        : "Contact & Concierge | Odoratus",
    description:
      locale === "ar"
        ? "تواصل مباشر مع دار Odoratus والكونسيرج العطري عبر الواتساب والبريد المباشر."
        : "Direct contact with Odoratus olfactory concierge via WhatsApp and official direct lines.",
  };
}

export default function ContactPage() {
  return <ContactHubView />;
}

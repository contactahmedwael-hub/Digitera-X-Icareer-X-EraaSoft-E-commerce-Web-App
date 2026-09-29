import { HeroSection } from "@/features/home/components/HeroSection";
import { NewsletterSection } from "@/features/home/components/NewsletterSection";
import { OccasionsSection } from "@/features/home/components/OccasionsSection";
import { PromoSection } from "@/features/home/components/PromoSection";
import { ScentArchetypes } from "@/features/home/components/ScentArchetypes";
import { TrendingSection } from "@/features/home/components/TrendingSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TrendingSection />
      <ScentArchetypes />
      <OccasionsSection />
      <PromoSection />
      <NewsletterSection />
    </>
  );
}

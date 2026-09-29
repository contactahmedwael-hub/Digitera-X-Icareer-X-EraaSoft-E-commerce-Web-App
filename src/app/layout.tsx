import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";

import { FloatingActions } from "@/components/shared/FloatingActions";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { QuickViewModal } from "@/features/products/components/QuickViewModal";
import { SkipLink } from "@/components/shared/SkipLink";
import { Toaster } from "@/components/ui/toast";
import { Providers } from "@/app/providers";
import { getDirection } from "@/lib/i18n/locale";
import { readPreferences } from "@/lib/i18n/server";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Odoratus — Independent Olfactory House",
    template: "%s | Odoratus",
  },
  description:
    "Slow-luxury fragrances hand-poured in small batches from sustainably sourced botanicals.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read once on the server so the first paint already matches the visitor's
  // language and theme — no flash, no hydration mismatch.
  const { locale, theme } = await readPreferences();

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      data-theme={theme}
      className={`${manrope.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      {/*
        Browser extensions (ColorZilla, Grammarly, password managers) inject
        attributes onto <body> before React hydrates, which React reports as a
        hydration mismatch. Nothing we render differs between server and
        client, so the warning is suppressed for this element only.
      */}
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col bg-page font-sans text-ink"
      >
        <Providers locale={locale} theme={theme}>
          <SkipLink />
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingActions />
          <QuickViewModal />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

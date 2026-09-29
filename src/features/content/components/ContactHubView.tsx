"use client";

import Link from "next/link";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { showToast } from "@/components/ui/toast";
import { productPaths } from "@/features/products";
import { useI18n } from "@/lib/i18n/I18nProvider";
import {
  CONTACT_NAME,
  EMAIL,
  GITHUB_PROFILE_HREF,
  PHONE_NUMBER,
  RAW_PHONE,
  socialLinks,
} from "./contact-profiles";
import { SocialLinksGrid } from "./SocialLinksGrid";

export function ContactHubView() {
  const { dict } = useI18n();

  const whatsAppHref = `https://wa.me/${RAW_PHONE}?text=${encodeURIComponent(
    dict.footer.whatsAppGreeting,
  )}`;

  return (
    <div className="relative overflow-hidden px-4 py-12 sm:px-6 md:px-10 lg:px-20 lg:py-20">
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute top-10 left-1/2 -z-10 h-[380px] w-[600px] -translate-x-1/2 rounded-full bg-gold/5 blur-[120px]" />

      <div className="mx-auto w-full max-w-[960px] animate-[fade-up_0.5s_cubic-bezier(0.22,1,0.36,1)_both]">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <p className="text-[11px] font-semibold tracking-[0.25em] text-gold uppercase">
            {dict.footer.contactPageEyebrow}
          </p>
          <h1 className="mt-3 font-serif text-[34px] leading-tight text-ink sm:text-[50px]">
            {dict.footer.contactPageTitle}
          </h1>
          <p className="mt-4 max-w-[620px] text-[15px] leading-[1.75] text-muted">
            {dict.footer.contactPageIntro}
          </p>
        </div>

        {/* Primary Action Cards (Direct WhatsApp, Direct Call, Direct Email) */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* Card 1: WhatsApp */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl text-start">
            <div className="flex flex-col gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 transition-transform duration-300 group-hover:scale-110">
                <WhatsAppIcon size={24} />
              </div>
              <div className="text-start">
                <h2 className="font-serif text-[20px] text-ink text-start">
                  {dict.footer.instantWhatsApp}
                </h2>
                <p className="mt-2 text-[13px] leading-[1.6] text-muted text-start">
                  {dict.footer.instantWhatsAppDesc}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-line/60">
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-night px-4 py-3 text-[12px] font-semibold tracking-wider text-on-night uppercase transition-all duration-300 hover:bg-gold hover:text-night"
              >
                <WhatsAppIcon size={16} />
                {dict.footer.startConversation}
              </a>
            </div>
          </div>

          {/* Card 2: Email */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl text-start">
            <div className="flex flex-col gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-110">
                <MailIcon size={22} />
              </div>
              <div className="text-start">
                <h2 className="font-serif text-[20px] text-ink text-start">
                  {dict.footer.officialEmail}
                </h2>
                <p className="mt-2 text-[13px] leading-[1.6] text-muted text-start">
                  {dict.footer.officialEmailDesc}
                </p>
                <p
                  dir="ltr"
                  onClick={() => {
                    navigator.clipboard.writeText(EMAIL);
                    showToast({
                      title: dict.footer.copiedEmailToast,
                      message: EMAIL,
                      type: "info",
                    });
                  }}
                  title="Click to copy"
                  className="mt-2 inline-block cursor-pointer font-mono text-[12px] text-ink/80 hover:text-gold transition-colors select-all text-start"
                >
                  {EMAIL} 📋
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-line/60">
              <a
                href={`mailto:${EMAIL}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-transparent px-4 py-3 text-[12px] font-semibold tracking-wider text-ink uppercase transition-all duration-300 hover:border-gold hover:bg-gold hover:text-night"
              >
                <MailIcon size={16} />
                {dict.footer.sendAnEmail}
              </a>
            </div>
          </div>

          {/* Card 3: Phone Direct */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl text-start">
            <div className="flex flex-col gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 transition-transform duration-300 group-hover:scale-110">
                <PhoneIcon size={22} />
              </div>
              <div className="text-start">
                <h2 className="font-serif text-[20px] text-ink text-start">
                  {dict.footer.telephoneDirect}
                </h2>
                <p className="mt-2 text-[13px] leading-[1.6] text-muted text-start">
                  {dict.footer.workingHoursDetails}
                </p>
                <p
                  dir="ltr"
                  onClick={() => {
                    navigator.clipboard.writeText(PHONE_NUMBER);
                    showToast({
                      title: dict.footer.copiedPhoneToast,
                      message: PHONE_NUMBER,
                      type: "info",
                    });
                  }}
                  title="Click to copy"
                  className="mt-2 inline-block cursor-pointer font-mono text-[14px] font-semibold text-ink hover:text-gold transition-colors select-all text-start"
                >
                  {PHONE_NUMBER} 📋
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-line/60">
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s+/g, "")}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-transparent px-4 py-3 text-[12px] font-semibold tracking-wider text-ink uppercase transition-all duration-300 hover:border-gold hover:bg-gold hover:text-night"
              >
                <PhoneIcon size={15} />
                {dict.footer.callNow}
              </a>
            </div>
          </div>
        </div>

        {/* Portfolios and Social Network Presence */}
        <div className="mt-16 rounded-3xl border border-line bg-surface/50 p-6 sm:p-10 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line pb-6">
            <div>
              <p className="text-[11px] font-semibold tracking-widest text-gold uppercase">
                {dict.footer.socialAndPortfolios}
              </p>
              <h2 className="mt-1 font-serif text-[24px] text-ink">
                {CONTACT_NAME} — Official Profiles
              </h2>
            </div>
            <a
              href={GITHUB_PROFILE_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2 text-[12px] font-semibold text-gold transition-all duration-300 hover:bg-gold hover:text-night"
            >
              Explore Portfolio
            </a>
          </div>

          <SocialLinksGrid links={socialLinks} />
        </div>

        {/* Back to Catalogue Link */}
        <div className="mt-12 flex justify-center">
          <Link
            href={productPaths.list}
            className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-wider text-gold uppercase transition-colors hover:text-ink"
          >
            {dict.common.browseAll} →
          </Link>
        </div>
      </div>
    </div>
  );
}

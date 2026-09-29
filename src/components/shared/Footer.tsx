"use client";

import Link from "next/link";
import { MailIcon } from "@/components/icons";
import { AudioToggle } from "@/components/shared/AudioToggle";
import { ContactOnWhatsApp } from "@/components/shared/ContactOnWhatsApp";
import { useFooterNav } from "@/components/shared/navigation";
import {
  CONTACT_NAME,
  EMAIL,
  GITHUB_PROFILE_HREF,
  socialLinks,
} from "@/features/content/components/contact-profiles";
import { useI18n } from "@/lib/i18n/I18nProvider";

const socials = [
  ...socialLinks.map(({ name, href, Icon }) => ({
    label: name,
    href,
    Icon,
  })),
  {
    label: "Email",
    href: `mailto:${EMAIL}`,
    Icon: MailIcon,
  },
];

const paymentMethods = ["visa", "mastercard", "amex"];

export function Footer() {
  const { dict, fill } = useI18n();
  const columns = useFooterNav();

  return (
    <footer className="mt-16 bg-night text-on-night">
      <div className="flex flex-col gap-12 px-4 pt-14 pb-10 sm:px-6 md:px-10 lg:gap-16 lg:px-20 lg:pt-20">
        <div className="flex flex-col items-start justify-between gap-12 lg:flex-row">
          <div className="flex w-full max-w-[400px] flex-col items-start gap-6">
            <p className="font-serif text-[32px] text-on-night lg:text-[40px]">
              {dict.common.brand}
            </p>
            <p className="text-[14px] leading-[1.6] text-on-night opacity-80">
              {dict.footer.description}
            </p>
            <div className="flex flex-col gap-4">
              <ul className="flex flex-wrap items-center gap-2.5">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-on-night/10 text-on-night opacity-75 transition-all duration-300 hover:scale-110 hover:bg-gold/20 hover:text-gold hover:opacity-100"
                    >
                      <Icon size={16} />
                    </a>
                  </li>
                ))}
              </ul>

              <div>
                <ContactOnWhatsApp />
              </div>
            </div>
          </div>

          <div className="grid w-full gap-10 sm:grid-cols-3 lg:w-auto lg:gap-20">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title} className="text-start">
                <h2 className="text-[12px] font-bold text-gold uppercase text-start">
                  {column.title}
                </h2>
                <ul className="mt-5 flex flex-col gap-5 text-start">
                  {column.links.map((link) => (
                    <li key={link.key} className="text-start">
                      <Link
                        href={link.href}
                        className="inline-block text-[13px] text-on-night opacity-70 transition-opacity duration-300 hover:opacity-100 text-start"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="h-px w-full bg-on-night/[0.13]" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1 text-[12px] text-on-night opacity-70">
              <p className="opacity-75">
                {fill(dict.footer.rights, { year: new Date().getFullYear() })}
              </p>
              <p className="text-[11px]">
                {dict.footer.designedBy}{" "}
                <a
                  href={GITHUB_PROFILE_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gold underline underline-offset-4 opacity-90 transition-opacity hover:opacity-100"
                >
                  {CONTACT_NAME}
                </a>
              </p>
            </div>
              <div className="flex flex-wrap items-center gap-3">
                <AudioToggle />
                <p className="text-[11px] text-on-night uppercase opacity-40">
                  {dict.footer.securedVia}
                </p>
                {paymentMethods.map((method) => (
                  <span
                    key={method}
                    className="rounded border border-on-night/[0.13] px-2 py-1 text-[9px] font-semibold text-on-night uppercase opacity-60"
                  >
                    {method}
                  </span>
                ))}
              </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

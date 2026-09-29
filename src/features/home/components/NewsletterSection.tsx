"use client";

import { useState, type FormEvent } from "react";
import { CheckIcon } from "@/components/icons";
import { showToast } from "@/components/ui/toast";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

export function NewsletterSection() {
  const { dict } = useI18n();
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) {
      return;
    }
    // No backend yet — the address is acknowledged locally only.
    setJoined(true);
    showToast({
      title: dict.home.newsletterDone,
      message: email,
      type: "success",
    });
    setEmail("");
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="flex flex-col items-center gap-7 px-4 py-12 text-center sm:gap-8 sm:px-6 md:px-10 lg:px-20 lg:py-[100px]"
    >
      <div className="flex max-w-[600px] flex-col gap-4">
        <h2
          id="newsletter-heading"
          className="font-serif text-[28px] text-ink sm:text-[40px]"
        >
          {dict.home.newsletterTitle}
        </h2>
        <p className="text-[13px] leading-[1.6] text-muted sm:text-[14px]">
          {dict.home.newsletterBody}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[500px] flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          {dict.home.emailLabel}
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={dict.home.newsletterPlaceholder}
          className="h-[50px] flex-1 rounded border border-line bg-surface px-5 text-[13px] text-ink outline-none transition-colors duration-300 placeholder:text-muted focus:border-gold"
        />
        <button
          type="submit"
          className="h-[50px] rounded bg-inverse px-8 text-[12px] font-bold text-on-inverse uppercase transition-all duration-300 hover:opacity-90 active:scale-[0.99]"
        >
          {dict.home.newsletterCta}
        </button>
      </form>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "flex items-center gap-1.5 text-[12px] text-success transition-opacity duration-300",
          joined ? "opacity-100" : "opacity-0",
        )}
      >
        {joined ? (
          <>
            <CheckIcon size={13} />
            {dict.home.newsletterDone}
          </>
        ) : null}
      </p>
    </section>
  );
}

"use client";

import { AlertIcon } from "@/components/icons";
import { useI18n } from "@/lib/i18n/I18nProvider";

/**
 * Says plainly that nothing is stored or sent. The brief for this build was a
 * front-end demonstration, and a sign-in form that looks real without saying so
 * invites people to type a password they actually use.
 */
export function AuthDemoNotice() {
  const { dict } = useI18n();

  return (
    <p className="flex items-start gap-2 rounded border border-line bg-sand px-3 py-2.5 text-[11px] leading-relaxed text-muted">
      <AlertIcon size={14} className="mt-0.5 shrink-0 text-gold" />
      {dict.auth.demoNotice}
    </p>
  );
}

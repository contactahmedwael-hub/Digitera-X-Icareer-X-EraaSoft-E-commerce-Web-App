"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckIcon, MailIcon } from "@/components/icons";
import { AuthDemoNotice } from "@/features/auth/components/AuthDemoNotice";
import { AuthField } from "@/features/auth/components/AuthField";
import { AuthShell } from "@/features/auth/components/AuthShell";
import { AuthSubmitButton } from "@/features/auth/components/AuthSubmitButton";
import { useAuthSubmit } from "@/features/auth/hooks/useAuthSubmit";
import { authPaths } from "@/features/auth/paths";
import type { ValidationKey } from "@/features/auth/types/auth.types";
import { isValidEmail } from "@/features/auth/utils/auth.validation";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function ResetPasswordPage() {
  const { dict, fill } = useI18n();
  const { status, submit } = useAuthSubmit();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<ValidationKey | undefined>();
  const [sentTo, setSentTo] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) return setError("required");
    if (!isValidEmail(trimmed)) return setError("emailInvalid");

    setError(undefined);
    submit(() => setSentTo(trimmed));
  }

  return (
    <AuthShell
      title={dict.auth.resetTitle}
      subtitle={dict.auth.resetSubtitle}
      footer={
        <p className="text-center text-[12px] text-muted">
          <Link
            href={authPaths.login}
            className="font-semibold text-gold underline-offset-4 transition-colors duration-300 hover:text-ink hover:underline"
          >
            {dict.auth.backToSignIn}
          </Link>
        </p>
      }
    >
      {sentTo ? (
        <div
          role="status"
          className="animate-[scale-in_0.4s_cubic-bezier(0.22,1,0.36,1)_both] rounded border border-line bg-surface p-7 text-center"
        >
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-success/12 text-success">
            <CheckIcon size={24} />
          </span>
          <h2 className="mt-4 font-serif text-[22px] text-ink">
            {dict.auth.resetSentTitle}
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">
            {fill(dict.auth.resetSentBody, { email: sentTo })}
          </p>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <AuthField
            label={dict.auth.email}
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(value) => {
              setEmail(value);
              setError(undefined);
            }}
            placeholder={dict.auth.emailPlaceholder}
            error={error}
            icon={<MailIcon size={16} />}
          />

          <AuthSubmitButton
            status={status}
            idleLabel={dict.auth.sendResetLink}
            busyLabel={dict.auth.sendingResetLink}
            icon={<MailIcon size={16} />}
          />

          <AuthDemoNotice />
        </form>
      )}
    </AuthShell>
  );
}

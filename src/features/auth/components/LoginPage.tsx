"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockIcon, LogInIcon, MailIcon } from "@/components/icons";
import { AuthCheckbox } from "@/features/auth/components/AuthCheckbox";
import { AuthDemoNotice } from "@/features/auth/components/AuthDemoNotice";
import { AuthField } from "@/features/auth/components/AuthField";
import { AuthShell } from "@/features/auth/components/AuthShell";
import { AuthSubmitButton } from "@/features/auth/components/AuthSubmitButton";
import { useAuthSubmit } from "@/features/auth/hooks/useAuthSubmit";
import { useReturnPath } from "@/features/auth/hooks/useReturnPath";
import { useSession } from "@/features/auth/hooks/useSession";
import { authPaths } from "@/features/auth/paths";
import type {
  FieldErrors,
  LoginField,
  LoginValues,
} from "@/features/auth/types/auth.types";
import { nameFromEmail } from "@/features/auth/utils/auth.identity";
import {
  hasErrors,
  validateLogin,
} from "@/features/auth/utils/auth.validation";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function LoginPage() {
  const { dict } = useI18n();
  const router = useRouter();
  const { signIn } = useSession();
  const returnPath = useReturnPath();

  const [values, setValues] = useState<LoginValues>({
    email: "",
    password: "",
  });
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<FieldErrors<LoginField>>({});
  const [submitted, setSubmitted] = useState(false);

  const { status, submit } = useAuthSubmit();

  function update(field: LoginField, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    // Only re-validate after a failed attempt, so the first pass stays quiet.
    if (submitted) setErrors(validateLogin(next));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const found = validateLogin(values);
    setErrors(found);
    if (hasErrors(found)) return;

    submit(() => {
      const email = values.email.trim();
      signIn({ email, name: nameFromEmail(email) });
      router.replace(returnPath);
    });
  }

  return (
    <AuthShell
      title={dict.auth.loginTitle}
      subtitle={dict.auth.loginSubtitle}
      footer={
        <p className="text-center text-[12px] text-muted">
          {dict.auth.noAccount}{" "}
          <Link
            href={authPaths.signup}
            className="font-semibold text-gold underline-offset-4 transition-colors duration-300 hover:text-ink hover:underline"
          >
            {dict.auth.goToSignup}
          </Link>
        </p>
      }
    >
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
        <AuthField
          label={dict.auth.email}
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(value) => update("email", value)}
          placeholder={dict.auth.emailPlaceholder}
          error={errors.email}
          icon={<MailIcon size={16} />}
        />

        <AuthField
          label={dict.auth.password}
          name="password"
          type="password"
          autoComplete="current-password"
          value={values.password}
          onChange={(value) => update("password", value)}
          placeholder={dict.auth.passwordPlaceholder}
          error={errors.password}
          icon={<LockIcon size={16} />}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <AuthCheckbox
            label={dict.auth.rememberMe}
            checked={remember}
            onChange={setRemember}
          />
          <Link
            href={authPaths.resetPassword}
            className="text-[12px] text-muted underline-offset-4 transition-colors duration-300 hover:text-gold hover:underline"
          >
            {dict.auth.forgotPassword}
          </Link>
        </div>

        <AuthSubmitButton
          status={status}
          idleLabel={dict.auth.signIn}
          busyLabel={dict.auth.signingIn}
          icon={<LogInIcon size={16} />}
        />

        <AuthDemoNotice />
      </form>
    </AuthShell>
  );
}

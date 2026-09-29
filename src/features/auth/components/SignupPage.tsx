"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockIcon, MailIcon, UserIcon, UserPlusIcon } from "@/components/icons";
import { AcceptTermsLabel } from "@/features/auth/components/AcceptTermsLabel";
import { AuthCheckbox } from "@/features/auth/components/AuthCheckbox";
import { AuthDemoNotice } from "@/features/auth/components/AuthDemoNotice";
import { AuthField } from "@/features/auth/components/AuthField";
import { AuthShell } from "@/features/auth/components/AuthShell";
import { AuthSubmitButton } from "@/features/auth/components/AuthSubmitButton";
import { PasswordStrengthMeter } from "@/features/auth/components/PasswordStrengthMeter";
import { useAuthSubmit } from "@/features/auth/hooks/useAuthSubmit";
import { useReturnPath } from "@/features/auth/hooks/useReturnPath";
import { useSession } from "@/features/auth/hooks/useSession";
import { authPaths } from "@/features/auth/paths";
import type {
  FieldErrors,
  SignupField,
  SignupValues,
} from "@/features/auth/types/auth.types";
import {
  getPasswordStrength,
  hasErrors,
  validateSignup,
} from "@/features/auth/utils/auth.validation";
import { useI18n } from "@/lib/i18n/I18nProvider";

const emptyValues: SignupValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptedTerms: false,
};

export function SignupPage() {
  const { dict } = useI18n();
  const router = useRouter();
  const { signIn } = useSession();
  const returnPath = useReturnPath();

  const [values, setValues] = useState<SignupValues>(emptyValues);
  const [errors, setErrors] = useState<FieldErrors<SignupField>>({});
  const [submitted, setSubmitted] = useState(false);

  const { status, submit } = useAuthSubmit();

  function update(field: SignupField, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (submitted) setErrors(validateSignup(next));
  }

  function toggleTerms(accepted: boolean) {
    const next = { ...values, acceptedTerms: accepted };
    setValues(next);
    if (submitted) setErrors(validateSignup(next));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const found = validateSignup(values);
    setErrors(found);
    if (hasErrors(found)) return;

    submit(() => {
      signIn({ name: values.name.trim(), email: values.email.trim() });
      router.replace(returnPath);
    });
  }

  return (
    <AuthShell
      title={dict.auth.signupTitle}
      subtitle={dict.auth.signupSubtitle}
      footer={
        <p className="text-center text-[12px] text-muted">
          {dict.auth.haveAccount}{" "}
          <Link
            href={authPaths.login}
            className="font-semibold text-gold underline-offset-4 transition-colors duration-300 hover:text-ink hover:underline"
          >
            {dict.auth.goToLogin}
          </Link>
        </p>
      }
    >
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
        <AuthField
          label={dict.auth.name}
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(value) => update("name", value)}
          placeholder={dict.auth.namePlaceholder}
          error={errors.name}
          icon={<UserIcon size={16} />}
        />

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
          autoComplete="new-password"
          value={values.password}
          onChange={(value) => update("password", value)}
          placeholder={dict.auth.passwordPlaceholder}
          error={errors.password}
          icon={<LockIcon size={16} />}
        >
          {values.password ? (
            <PasswordStrengthMeter
              strength={getPasswordStrength(values.password)}
            />
          ) : null}
        </AuthField>

        <AuthField
          label={dict.auth.confirmPassword}
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={(value) => update("confirmPassword", value)}
          placeholder={dict.auth.confirmPasswordPlaceholder}
          error={errors.confirmPassword}
          icon={<LockIcon size={16} />}
        />

        <AuthCheckbox
          label={<AcceptTermsLabel />}
          checked={values.acceptedTerms}
          onChange={toggleTerms}
          error={errors.acceptedTerms}
        />

        <AuthSubmitButton
          status={status}
          idleLabel={dict.auth.createAccount}
          busyLabel={dict.auth.creatingAccount}
          icon={<UserPlusIcon size={16} />}
        />

        <AuthDemoNotice />
      </form>
    </AuthShell>
  );
}

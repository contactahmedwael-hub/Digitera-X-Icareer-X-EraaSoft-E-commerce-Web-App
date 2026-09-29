"use client";

import { useState, type FormEvent } from "react";
import { MailIcon, UserIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { AuthField } from "@/features/auth/components/AuthField";
import type { AuthUser, FieldErrors } from "@/features/auth/types/auth.types";
import { isValidEmail } from "@/features/auth/utils/auth.validation";
import { useI18n } from "@/lib/i18n/I18nProvider";

type ProfileEditorProps = {
  user: AuthUser;
  onSave: (user: AuthUser) => void;
  onCancel: () => void;
};

type ProfileField = "name" | "email";

/** The account details in edit mode. Same field component as the auth forms. */
export function ProfileEditor({ user, onSave, onCancel }: ProfileEditorProps) {
  const { dict } = useI18n();
  const [values, setValues] = useState<AuthUser>(user);
  const [errors, setErrors] = useState<FieldErrors<ProfileField>>({});

  function validate(next: AuthUser): FieldErrors<ProfileField> {
    const found: FieldErrors<ProfileField> = {};
    if (!next.name.trim()) found.name = "required";
    else if (next.name.trim().length < 2) found.name = "nameTooShort";
    if (!next.email.trim()) found.email = "required";
    else if (!isValidEmail(next.email)) found.email = "emailInvalid";
    return found;
  }

  function update(field: ProfileField, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    setErrors(validate(next));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onSave({ name: values.name.trim(), email: values.email.trim() });
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField
          label={dict.auth.name}
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(value) => update("name", value)}
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
          error={errors.email}
          icon={<MailIcon size={16} />}
        />
      </div>

      <div className="flex flex-wrap gap-2.5">
        <Button type="submit" variant="primary">
          {dict.auth.saveChanges}
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          {dict.auth.cancel}
        </Button>
      </div>
    </form>
  );
}

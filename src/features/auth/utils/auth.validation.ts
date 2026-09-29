import type {
  FieldErrors,
  LoginField,
  LoginValues,
  PasswordStrength,
  SignupField,
  SignupValues,
  ValidationKey,
} from "@/features/auth/types/auth.types";

/**
 * Deliberately permissive: one or more non-space, non-@ characters, an @, a
 * domain, a dot and a 2+ letter TLD. Stricter patterns reject valid addresses.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/;

export const MIN_PASSWORD_LENGTH = 8;
export const MIN_NAME_LENGTH = 2;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

/**
 * Counts how many character classes appear, then folds length in. Used for the
 * strength meter and for the `passwordWeak` rule on registration.
 */
export function getPasswordStrength(value: string): PasswordStrength {
  const classes = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((pattern) =>
    pattern.test(value),
  ).length;

  if (value.length < MIN_PASSWORD_LENGTH || classes < 2) return "weak";
  if (value.length >= 12 && classes >= 3) return "strong";
  return "fair";
}

function validateEmailField(value: string): ValidationKey | undefined {
  if (!value.trim()) return "required";
  if (!isValidEmail(value)) return "emailInvalid";
  return undefined;
}

export function validateLogin(values: LoginValues): FieldErrors<LoginField> {
  const errors: FieldErrors<LoginField> = {};

  const email = validateEmailField(values.email);
  if (email) errors.email = email;

  if (!values.password) errors.password = "required";

  return errors;
}

export function validateSignup(values: SignupValues): FieldErrors<SignupField> {
  const errors: FieldErrors<SignupField> = {};

  const name = values.name.trim();
  if (!name) errors.name = "required";
  else if (name.length < MIN_NAME_LENGTH) errors.name = "nameTooShort";

  const email = validateEmailField(values.email);
  if (email) errors.email = email;

  if (!values.password) errors.password = "required";
  else if (values.password.length < MIN_PASSWORD_LENGTH)
    errors.password = "passwordTooShort";
  else if (getPasswordStrength(values.password) === "weak")
    errors.password = "passwordWeak";

  if (!values.confirmPassword) errors.confirmPassword = "required";
  else if (values.confirmPassword !== values.password)
    errors.confirmPassword = "passwordMismatch";

  if (!values.acceptedTerms) errors.acceptedTerms = "termsRequired";

  return errors;
}

export function hasErrors(errors: Record<string, unknown>): boolean {
  return Object.keys(errors).length > 0;
}

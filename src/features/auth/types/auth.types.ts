/** The signed-in visitor. Never holds a password. */
export type AuthUser = {
  name: string;
  email: string;
};

/** Field names used by the sign-in form. */
export type LoginField = "email" | "password";

/** Field names used by the registration form. */
export type SignupField = "name" | "email" | "password" | "confirmPassword";

export type LoginValues = Record<LoginField, string>;

export type SignupValues = Record<SignupField, string> & {
  acceptedTerms: boolean;
};

/**
 * A validation failure is stored as a dictionary key, not as a sentence, so the
 * same error renders in whichever language is active at paint time.
 */
export type ValidationKey =
  | "required"
  | "emailInvalid"
  | "nameTooShort"
  | "passwordTooShort"
  | "passwordWeak"
  | "passwordMismatch"
  | "termsRequired";

export type FieldErrors<Field extends string> = Partial<
  Record<Field | "acceptedTerms", ValidationKey>
>;

export type PasswordStrength = "weak" | "fair" | "strong";

/** Where the form currently is. Drives the button label and the live region. */
export type SubmitStatus = "idle" | "submitting" | "success";

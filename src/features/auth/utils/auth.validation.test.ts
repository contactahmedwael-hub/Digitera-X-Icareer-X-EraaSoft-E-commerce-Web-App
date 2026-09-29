import {
  getInitials,
  nameFromEmail,
} from "@/features/auth/utils/auth.identity";
import {
  getPasswordStrength,
  isValidEmail,
  validateLogin,
  validateSignup,
} from "@/features/auth/utils/auth.validation";

describe("isValidEmail", () => {
  it.each([
    "mo@example.com",
    "first.last@sub.example.co.uk",
    "user+tag@example.io",
  ])("accepts %s", (value) => {
    expect(isValidEmail(value)).toBe(true);
  });

  it.each(["", "mo", "mo@", "@example.com", "mo@example", "mo @example.com"])(
    "rejects %p",
    (value) => {
      expect(isValidEmail(value)).toBe(false);
    },
  );

  it("ignores surrounding whitespace", () => {
    expect(isValidEmail("  mo@example.com  ")).toBe(true);
  });
});

describe("getPasswordStrength", () => {
  it("calls anything under the minimum length weak", () => {
    expect(getPasswordStrength("Ab3$")).toBe("weak");
  });

  it("calls a single character class weak however long it is", () => {
    expect(getPasswordStrength("abcdefghijklmnop")).toBe("weak");
  });

  it("calls a long, varied password strong", () => {
    expect(getPasswordStrength("Odoratus2026!")).toBe("strong");
  });

  it("lands in between for a short but varied password", () => {
    expect(getPasswordStrength("Santal12")).toBe("fair");
  });
});

describe("validateLogin", () => {
  it("passes a filled, well-formed form", () => {
    expect(validateLogin({ email: "mo@example.com", password: "x" })).toEqual(
      {},
    );
  });

  it("flags both fields when empty", () => {
    expect(validateLogin({ email: "", password: "" })).toEqual({
      email: "required",
      password: "required",
    });
  });

  it("flags a malformed address", () => {
    expect(validateLogin({ email: "nope", password: "x" })).toEqual({
      email: "emailInvalid",
    });
  });
});

describe("validateSignup", () => {
  const valid = {
    name: "Mohamed",
    email: "mo@example.com",
    password: "Odoratus2026!",
    confirmPassword: "Odoratus2026!",
    acceptedTerms: true,
  };

  it("passes a complete form", () => {
    expect(validateSignup(valid)).toEqual({});
  });

  it("rejects a one-character name", () => {
    expect(validateSignup({ ...valid, name: "M" }).name).toBe("nameTooShort");
  });

  it("rejects a short password before judging its strength", () => {
    expect(
      validateSignup({ ...valid, password: "Ab3$", confirmPassword: "Ab3$" })
        .password,
    ).toBe("passwordTooShort");
  });

  it("rejects a long but single-class password as weak", () => {
    const password = "abcdefghijkl";
    expect(
      validateSignup({ ...valid, password, confirmPassword: password })
        .password,
    ).toBe("passwordWeak");
  });

  it("reports a mismatched confirmation", () => {
    expect(
      validateSignup({ ...valid, confirmPassword: "Something2026!" })
        .confirmPassword,
    ).toBe("passwordMismatch");
  });

  it("requires the terms checkbox", () => {
    expect(
      validateSignup({ ...valid, acceptedTerms: false }).acceptedTerms,
    ).toBe("termsRequired");
  });
});

describe("nameFromEmail", () => {
  it.each([
    ["mohamed.magdy@example.com", "Mohamed Magdy"],
    ["mo_komy@example.com", "Mo Komy"],
    ["MOHAMED@example.com", "Mohamed"],
    ["mo-komy-74@example.com", "Mo Komy"],
  ])("turns %s into %s", (email, expected) => {
    expect(nameFromEmail(email)).toBe(expected);
  });

  it("falls back to the local part when it has no words", () => {
    expect(nameFromEmail("123@example.com")).toBe("123");
  });
});

describe("getInitials", () => {
  it("takes one letter from each of the first two words", () => {
    expect(getInitials({ name: "Mohamed Magdy Elkomy", email: "" })).toBe("MM");
  });

  it("takes two letters from a single word", () => {
    expect(getInitials({ name: "Mo", email: "" })).toBe("MO");
  });

  it("falls back to the email when there is no name", () => {
    expect(getInitials({ name: "  ", email: "komy@example.com" })).toBe("KO");
  });
});

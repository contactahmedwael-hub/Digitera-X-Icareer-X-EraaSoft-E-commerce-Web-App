import type { CheckoutValues } from "@/features/checkout/types/checkout.types";
import {
  hasCheckoutErrors,
  isValidPhone,
  isValidPostalCode,
  validateCheckout,
} from "@/features/checkout/utils/checkout.validation";
import {
  createOrderId,
  FREE_SHIPPING_THRESHOLD,
  getOrderTotal,
  getShippingFee,
  SHIPPING_FEE,
} from "@/features/checkout/utils/order";
import { formatOrderDate } from "@/features/checkout/utils/order.format";

const valid: CheckoutValues = {
  fullName: "Mohamed Magdy",
  email: "mo@example.com",
  phone: "+20 100 000 0000",
  address: "12 Nile Street, Maadi",
  city: "Cairo",
  postalCode: "11728",
  notes: "",
  paymentMethod: "cash-on-delivery",
};

describe("isValidPhone", () => {
  it.each(["+20 100 000 0000", "01000000000", "(020) 100-0000"])(
    "accepts %s",
    (value) => expect(isValidPhone(value)).toBe(true),
  );

  it.each(["", "12345", "not a phone", "+1234567890123456789"])(
    "rejects %p",
    (value) => expect(isValidPhone(value)).toBe(false),
  );
});

describe("isValidPostalCode", () => {
  it("treats an empty value as valid, because it is optional", () => {
    expect(isValidPostalCode("")).toBe(true);
    expect(isValidPostalCode("   ")).toBe(true);
  });

  it("accepts a normal code", () => {
    expect(isValidPostalCode("11728")).toBe(true);
    expect(isValidPostalCode("SW1A 1AA")).toBe(true);
  });

  it("rejects one that is too short or has symbols", () => {
    expect(isValidPostalCode("11")).toBe(false);
    expect(isValidPostalCode("11@28")).toBe(false);
  });
});

describe("validateCheckout", () => {
  it("passes a complete form", () => {
    expect(validateCheckout(valid)).toEqual({});
    expect(hasCheckoutErrors(validateCheckout(valid))).toBe(false);
  });

  it("requires every field except the postal code and notes", () => {
    const errors = validateCheckout({
      ...valid,
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      notes: "",
    });

    expect(errors).toEqual({
      fullName: "required",
      email: "required",
      phone: "required",
      address: "required",
      city: "required",
    });
  });

  it("rejects a one-line address that is too short to deliver to", () => {
    expect(validateCheckout({ ...valid, address: "Maadi" }).address).toBe(
      "addressTooShort",
    );
  });

  it("rejects a malformed email and phone", () => {
    const errors = validateCheckout({
      ...valid,
      email: "nope",
      phone: "123",
    });
    expect(errors.email).toBe("emailInvalid");
    expect(errors.phone).toBe("phoneInvalid");
  });
});

describe("shipping", () => {
  it("is free at and above the threshold", () => {
    expect(getShippingFee(FREE_SHIPPING_THRESHOLD)).toBe(0);
    expect(getShippingFee(FREE_SHIPPING_THRESHOLD + 50)).toBe(0);
  });

  it("is charged below the threshold", () => {
    expect(getShippingFee(FREE_SHIPPING_THRESHOLD - 1)).toBe(SHIPPING_FEE);
  });

  it("is nothing at all on an empty bag", () => {
    expect(getShippingFee(0)).toBe(0);
  });

  it("is added into the total", () => {
    expect(getOrderTotal(100)).toBe(100 + SHIPPING_FEE);
    expect(getOrderTotal(200)).toBe(200);
  });
});

describe("createOrderId", () => {
  it("is prefixed and shaped consistently", () => {
    expect(createOrderId(1_700_000_000_000)).toMatch(
      /^ODR-[0-9A-Z]+-[0-9A-Z]{4}$/,
    );
  });

  it("does not collide within the same millisecond", () => {
    const ids = new Set(
      Array.from({ length: 200 }, () => createOrderId(1_700_000_000_000)),
    );
    expect(ids.size).toBeGreaterThan(190);
  });
});

describe("formatOrderDate", () => {
  it("formats in English", () => {
    expect(formatOrderDate("2026-09-23T10:00:00.000Z", "en")).toBe(
      "23 September 2026",
    );
  });

  it("formats in Arabic, keeping Western digits", () => {
    const formatted = formatOrderDate("2026-09-23T10:00:00.000Z", "ar");
    expect(formatted).toContain("2026");
    expect(formatted).toContain("سبتمبر");
  });

  it("returns an empty string for an unparseable date", () => {
    expect(formatOrderDate("not-a-date", "en")).toBe("");
  });
});

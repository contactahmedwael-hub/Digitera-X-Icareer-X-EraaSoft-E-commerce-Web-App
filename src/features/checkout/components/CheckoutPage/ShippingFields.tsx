"use client";

import { CheckoutField } from "@/features/checkout/components/CheckoutField";
import type {
  CheckoutErrors,
  CheckoutValues,
  ShippingField,
} from "@/features/checkout/types/checkout.types";
import { useI18n } from "@/lib/i18n/I18nProvider";

type ShippingFieldsProps = {
  values: CheckoutValues;
  errors: CheckoutErrors;
  onChange: (field: ShippingField, value: string) => void;
};

export function ShippingFields({
  values,
  errors,
  onChange,
}: ShippingFieldsProps) {
  const { dict } = useI18n();

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <CheckoutField
        label={dict.checkout.fullName}
        name="fullName"
        autoComplete="name"
        value={values.fullName}
        onChange={(value) => onChange("fullName", value)}
        placeholder={dict.checkout.fullNamePlaceholder}
        error={errors.fullName}
      />

      <CheckoutField
        label={dict.checkout.email}
        name="email"
        type="email"
        autoComplete="email"
        value={values.email}
        onChange={(value) => onChange("email", value)}
        placeholder={dict.checkout.emailPlaceholder}
        error={errors.email}
      />

      <CheckoutField
        label={dict.checkout.phone}
        name="phone"
        type="tel"
        autoComplete="tel"
        value={values.phone}
        onChange={(value) => onChange("phone", value)}
        placeholder={dict.checkout.phonePlaceholder}
        error={errors.phone}
      />

      <CheckoutField
        label={dict.checkout.city}
        name="city"
        autoComplete="address-level2"
        value={values.city}
        onChange={(value) => onChange("city", value)}
        placeholder={dict.checkout.cityPlaceholder}
        error={errors.city}
      />

      <CheckoutField
        className="sm:col-span-2"
        label={dict.checkout.address}
        name="address"
        autoComplete="street-address"
        value={values.address}
        onChange={(value) => onChange("address", value)}
        placeholder={dict.checkout.addressPlaceholder}
        error={errors.address}
      />

      <CheckoutField
        label={dict.checkout.postalCode}
        name="postalCode"
        autoComplete="postal-code"
        value={values.postalCode}
        onChange={(value) => onChange("postalCode", value)}
        placeholder={dict.checkout.postalCodePlaceholder}
        error={errors.postalCode}
        optional
      />

      <CheckoutField
        className="sm:col-span-2"
        label={dict.checkout.notes}
        name="notes"
        value={values.notes}
        onChange={(value) => onChange("notes", value)}
        placeholder={dict.checkout.notesPlaceholder}
        optional
        multiline
      />
    </div>
  );
}

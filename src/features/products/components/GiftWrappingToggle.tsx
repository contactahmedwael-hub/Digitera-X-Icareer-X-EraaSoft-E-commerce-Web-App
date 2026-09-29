"use client";

import { Switch } from "@/components/ui/Switch";
import { useI18n } from "@/lib/i18n/I18nProvider";

type GiftWrappingToggleProps = {
  checked: boolean;
  onChange: (next: boolean) => void;
};

/**
 * US-04: complimentary gift wrapping.
 * A free add-on rather than a variant, so it never changes the price.
 */
export function GiftWrappingToggle({
  checked,
  onChange,
}: GiftWrappingToggleProps) {
  const { dict } = useI18n();

  return (
    <Switch
      id="gift-wrapping"
      checked={checked}
      onChange={onChange}
      label={dict.product.giftWrapping}
      description={dict.product.giftWrappingBody}
    />
  );
}

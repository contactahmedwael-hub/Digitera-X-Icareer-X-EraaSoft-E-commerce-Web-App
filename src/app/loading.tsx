"use client";

import { BottleLoader } from "@/components/ui/BottleLoader";
import { useI18n } from "@/lib/i18n/I18nProvider";

export default function RouteLoading() {
  const { dict } = useI18n();

  return <BottleLoader label={dict.errors.preparing} />;
}

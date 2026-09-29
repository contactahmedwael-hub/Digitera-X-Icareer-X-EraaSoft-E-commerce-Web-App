"use client";

import { Spinner } from "@/components/ui/Spinner";
import { useI18n } from "@/lib/i18n/I18nProvider";

export default function RouteLoading() {
  const { dict } = useI18n();

  return <Spinner fullscreen label={dict.errors.preparing} />;
}
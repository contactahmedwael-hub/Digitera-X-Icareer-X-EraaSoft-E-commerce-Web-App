"use client";

import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import type { Locale } from "@/lib/i18n/locale";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import type { Theme } from "@/lib/theme/theme";
import { createQueryClient } from "@/lib/api/query-client";

export function Providers({
  locale,
  theme,
  children,
}: {
  locale: Locale;
  theme: Theme;
  children: React.ReactNode;
}) {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider locale={locale}>
        <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

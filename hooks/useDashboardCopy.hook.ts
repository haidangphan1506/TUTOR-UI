"use client";

import { useLocale } from "@/hooks/useLocale.hook";
import { dashboardDictionary } from "@/lib/i18n/dashboard.dictionary";

export function useDashboardCopy() {
  const { language, setLocale } = useLocale();

  return { ...dashboardDictionary[language], language, setLocale };
}

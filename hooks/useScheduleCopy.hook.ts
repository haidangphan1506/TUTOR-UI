"use client";

import { useLocale } from "@/hooks/useLocale.hook";
import { scheduleDictionary } from "@/lib/i18n/schedule.dictionary";

export function useScheduleCopy() {
  const { language, setLocale } = useLocale();

  return { ...scheduleDictionary[language], language, setLocale };
}

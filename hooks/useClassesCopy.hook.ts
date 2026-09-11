"use client";

import { useLocale } from "@/hooks/useLocale.hook";
import { classesDictionary } from "@/lib/i18n/classes.dictionary";

export function useClassesCopy() {
  const { language, setLocale } = useLocale();

  return { ...classesDictionary[language], language, setLocale };
}

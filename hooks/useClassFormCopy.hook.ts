"use client";

import { useLocale } from "@/hooks/useLocale.hook";
import { classFormDictionary } from "@/lib/i18n/class-form.dictionary";

export function useClassFormCopy() {
  const { language, setLocale } = useLocale();

  return { ...classFormDictionary[language], language, setLocale };
}

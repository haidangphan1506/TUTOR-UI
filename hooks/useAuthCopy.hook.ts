"use client";

import { useLocale } from "@/hooks/useLocale.hook";
import { authDictionary } from "@/lib/i18n/auth.dictionary";

export function useAuthCopy() {
  const { language, setLocale } = useLocale();

  return { ...authDictionary[language], language, setLocale };
}

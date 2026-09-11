"use client";

import { useLocale } from "@/hooks/useLocale.hook";
import { accountsDictionary } from "@/lib/i18n/accounts.dictionary";

export function useAccountsCopy() {
  const { language, setLocale } = useLocale();

  return { ...accountsDictionary[language], language, setLocale };
}

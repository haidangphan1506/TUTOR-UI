"use client";

import { useLocale } from "@/hooks/useLocale.hook";
import { appShellDictionary } from "@/lib/i18n/app-shell.dictionary";

export function useAppShellCopy() {
  const { language, setLocale } = useLocale();

  return { ...appShellDictionary[language], language, setLocale };
}

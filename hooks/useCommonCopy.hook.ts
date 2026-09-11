"use client";

import { useLocale } from "@/hooks/useLocale.hook";
import { commonDictionary } from "@/lib/i18n/common.dictionary";

export function useCommonCopy() {
  const { language, setLocale } = useLocale();

  return { ...commonDictionary[language], language, setLocale };
}

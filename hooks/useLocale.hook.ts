"use client";

import { useCallback } from "react";

import { useLocaleStore } from "@/zustand/locale.store";
import type { Language } from "@/types";

export function useLocale() {
  const language = useLocaleStore((s) => s.language);
  const setLanguageInStore = useLocaleStore((s) => s.setLanguage);

  const setLocale = useCallback(
    (next: Language) => {
      setLanguageInStore(next);
    },
    [setLanguageInStore],
  );

  return { language, setLocale };
}

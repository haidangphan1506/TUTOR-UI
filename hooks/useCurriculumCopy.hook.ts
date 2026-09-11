"use client";

import { useLocale } from "@/hooks/useLocale.hook";
import { curriculumDictionary } from "@/lib/i18n/curriculum.dictionary";

export function useCurriculumCopy() {
  const { language, setLocale } = useLocale();

  return { ...curriculumDictionary[language], language, setLocale };
}

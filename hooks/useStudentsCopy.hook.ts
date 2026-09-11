"use client";

import { useLocale } from "@/hooks/useLocale.hook";
import { studentsDictionary } from "@/lib/i18n/students.dictionary";

export function useStudentsCopy() {
  const { language, setLocale } = useLocale();

  return { ...studentsDictionary[language], language, setLocale };
}

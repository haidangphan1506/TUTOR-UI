"use client";

import { useLocale } from "@/hooks/useLocale.hook";
import { studentSessionsDictionary } from "@/lib/i18n/student-sessions.dictionary";

export function useStudentSessionsCopy() {
  const { language, setLocale } = useLocale();

  return { ...studentSessionsDictionary[language], language, setLocale };
}

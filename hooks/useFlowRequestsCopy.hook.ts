"use client";

import { useLocale } from "@/hooks/useLocale.hook";
import { flowRequestsDictionary } from "@/lib/i18n/flow-requests.dictionary";

export function useFlowRequestsCopy() {
  const { language, setLocale } = useLocale();

  return { ...flowRequestsDictionary[language], language, setLocale };
}

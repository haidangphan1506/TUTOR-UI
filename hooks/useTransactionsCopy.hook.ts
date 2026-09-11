"use client";

import { useLocale } from "@/hooks/useLocale.hook";
import { transactionsDictionary } from "@/lib/i18n/transactions.dictionary";

export function useTransactionsCopy() {
  const { language, setLocale } = useLocale();

  return { ...transactionsDictionary[language], language, setLocale };
}

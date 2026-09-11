"use client";

import { useMemo } from "react";

import { useGet } from "@/lib/axios/query";
import { unwrapApiData } from "@/lib/axios/api-unwrap";

export type TxType = "Income" | "Expense";

export type Tx = {
  id: string;
  name: string;
  date: string;
  category: string;
  categoryIcon: string;
  account: string;
  type: TxType;
  amount: number;
  color: string;
};

type ApiTransaction = {
  id: string;
  walletId: string;
  categoryId: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  description: string | null;
  date: string;
};

type TransactionsApiPayload = {
  data: ApiTransaction[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

type ApiWalletLite = { id: string; name: string };
type ApiCategoryLite = {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
};

type WalletsApiPayload = { data: ApiWalletLite[] };
type CategoriesApiPayload = { data: ApiCategoryLite[] };

const WALLETS_QUERY_KEY = ["wallets", "list"] as const;
const CATEGORIES_QUERY_KEY = ["categories", "list"] as const;

const formatTxDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });

export function useTransactionsList(params: {
  page: number;
  limit: number;
  search?: string;
}) {
  const search = params.search?.trim();
  const query: Record<string, unknown> = {
    page: params.page,
    limit: params.limit,
  };
  if (search) query.search = search;

  const transactionsQuery = useGet<unknown, TransactionsApiPayload>(
    ["transactions", "list", params.page, params.limit, search ?? ""],
    "/transactions",
    {
      params: query,
      select: (raw) => unwrapApiData<TransactionsApiPayload>(raw),
    },
  );

  const walletsQuery = useGet<unknown, WalletsApiPayload>(
    WALLETS_QUERY_KEY,
    "/wallets",
    {
      params: { page: 1, limit: 100 },
      select: (raw) => unwrapApiData<WalletsApiPayload>(raw),
    },
  );

  const categoriesQuery = useGet<unknown, CategoriesApiPayload>(
    CATEGORIES_QUERY_KEY,
    "/categories",
    {
      params: { page: 1, limit: 100 },
      select: (raw) => unwrapApiData<CategoriesApiPayload>(raw),
    },
  );

  const walletsById = useMemo(() => {
    const map = new Map<string, ApiWalletLite>();
    for (const w of walletsQuery.data?.data ?? []) map.set(w.id, w);
    return map;
  }, [walletsQuery.data]);

  const categoriesById = useMemo(() => {
    const map = new Map<string, ApiCategoryLite>();
    for (const c of categoriesQuery.data?.data ?? []) map.set(c.id, c);
    return map;
  }, [categoriesQuery.data]);

  const transactions: Tx[] = useMemo(() => {
    const rows = transactionsQuery.data?.data ?? [];
    return rows.map((tx) => {
      const category = categoriesById.get(tx.categoryId);
      const wallet = walletsById.get(tx.walletId);
      return {
        id: tx.id,
        name: tx.description?.trim() || category?.name || "Transaction",
        date: formatTxDate(tx.date),
        category: category?.name ?? "Uncategorized",
        categoryIcon: category?.icon ?? "💰",
        account: wallet?.name ?? "—",
        type: tx.type === "INCOME" ? "Income" : "Expense",
        amount: Number(tx.amount),
        color: category?.color ?? "#94a3b8",
      } satisfies Tx;
    });
  }, [transactionsQuery.data, walletsById, categoriesById]);

  return {
    transactions,
    pagination: transactionsQuery.data?.pagination,
    isPending:
      transactionsQuery.isPending ||
      walletsQuery.isPending ||
      categoriesQuery.isPending,
    isError:
      transactionsQuery.isError ||
      walletsQuery.isError ||
      categoriesQuery.isError,
    error:
      transactionsQuery.error ?? walletsQuery.error ?? categoriesQuery.error,
    refetch: transactionsQuery.refetch,
  };
}

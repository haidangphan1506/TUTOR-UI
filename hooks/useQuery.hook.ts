"use client";

import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";

import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
  apiPut,
} from "@/lib/axios/query";

/**
 * GET request hook backed by TanStack Query.
 *
 * @example
 * const { data, isLoading } = useGet<Transaction[]>(
 *   ["transactions", filters],
 *   "/transactions",
 *   { page: 1, limit: 20 },
 * );
 */
export function useGet<TData>(
  queryKey: readonly unknown[],
  url: string,
  params?: Record<string, unknown>,
  options?: Omit<
    UseQueryOptions<TData, Error, TData, readonly unknown[]>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey,
    queryFn: () => apiGet<TData>(url, params),
    ...options,
  });
}

/**
 * POST mutation hook.
 *
 * Pass a string for a static URL or a function `(payload) => url` for dynamic URLs.
 *
 * @example
 * // static
 * const { mutate } = usePost<Transaction, CreateTransactionDto>("/transactions");
 *
 * // dynamic (rarely needed for POST, but possible)
 * const { mutate } = usePost<void, { id: string }>((p) => `/items/${p.id}/activate`);
 */
export function usePost<TData, TPayload = unknown>(
  getUrl: string | ((payload: TPayload) => string),
  options?: UseMutationOptions<TData, Error, TPayload>,
) {
  return useMutation<TData, Error, TPayload>({
    mutationFn: (payload) => {
      const url = typeof getUrl === "function" ? getUrl(payload) : getUrl;
      return apiPost<TData, TPayload>(url, payload);
    },
    ...options,
  });
}

/**
 * PUT mutation hook.
 *
 * @example
 * const { mutate } = usePut<Transaction, UpdateTransactionDto>(
 *   (p) => `/transactions/${p.id}`,
 * );
 */
export function usePut<TData, TPayload = unknown>(
  getUrl: string | ((payload: TPayload) => string),
  options?: UseMutationOptions<TData, Error, TPayload>,
) {
  return useMutation<TData, Error, TPayload>({
    mutationFn: (payload) => {
      const url = typeof getUrl === "function" ? getUrl(payload) : getUrl;
      return apiPut<TData, TPayload>(url, payload);
    },
    ...options,
  });
}

/**
 * PATCH mutation hook.
 *
 * @example
 * const { mutate } = usePatch<Transaction, PatchTransactionDto>(
 *   (p) => `/transactions/${p.id}`,
 * );
 */
export function usePatch<TData, TPayload = unknown>(
  getUrl: string | ((payload: TPayload) => string),
  options?: UseMutationOptions<TData, Error, TPayload>,
) {
  return useMutation<TData, Error, TPayload>({
    mutationFn: (payload) => {
      const url = typeof getUrl === "function" ? getUrl(payload) : getUrl;
      return apiPatch<TData, TPayload>(url, payload);
    },
    ...options,
  });
}

/**
 * DELETE mutation hook.
 *
 * TPayload defaults to `string` (the resource ID). Pass a URL builder to embed
 * the ID (or any other value) into the path.
 *
 * @example
 * const { mutate } = useDelete<void, string>(
 *   (id) => `/transactions/${id}`,
 * );
 * mutate("abc-123");
 */
export function useDelete<TData, TPayload = string>(
  getUrl: string | ((payload: TPayload) => string),
  options?: UseMutationOptions<TData, Error, TPayload>,
) {
  return useMutation<TData, Error, TPayload>({
    mutationFn: (payload) => {
      const url = typeof getUrl === "function" ? getUrl(payload) : getUrl;
      return apiDelete<TData>(url);
    },
    ...options,
  });
}

import { unwrapApiData } from "@/lib/axios/api-unwrap";
import { useGet } from "@/lib/axios/query";
import type { UseQueryOptions } from "@tanstack/react-query";
import type { ApiResponse, DashboardOverview } from "@/types";

// ─── Query keys ──────────────────────────────────────────────────────────────

export const DASHBOARD_QUERY_KEY = ["dashboard"] as const;

// ─── Actions ─────────────────────────────────────────────────────────────────

/** Dashboard has no mutations — still exposed as `useDashboardActions().overview` for consistency. */
export function useDashboardActions(args?: {
  overviewOptions?: Omit<
    UseQueryOptions<ApiResponse<DashboardOverview>, Error, DashboardOverview>,
    "queryKey" | "queryFn"
  >;
}) {
  const overview = useGet<ApiResponse<DashboardOverview>, DashboardOverview>(
    [...DASHBOARD_QUERY_KEY, "overview"],
    "/dashboard/overview",
    {
      select: (raw) => unwrapApiData<DashboardOverview>(raw),
      ...args?.overviewOptions,
    },
  );

  return { overview };
}

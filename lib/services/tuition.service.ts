import { unwrapApiData } from "@/lib/axios/api-unwrap";
import { useGet, usePost, usePut, useDelete } from "@/lib/axios/query";
import type { UseQueryOptions } from "@tanstack/react-query";
import type {
  ApiResponse,
  DeleteResult,
  TuitionRecord,
  TuitionsResponse,
  TuitionSummary,
  CreateTuitionPayload,
  UpdateTuitionPayload,
  TuitionStatus,
} from "@/types";

// ─── Query keys ──────────────────────────────────────────────────────────────

export const TUITIONS_QUERY_KEY = ["tuitions"] as const;

// ─── Actions ─────────────────────────────────────────────────────────────────

/** All tuition queries + mutations behind one hook: `useTuitionActions({...}).create.mutate(...)`. */
export function useTuitionActions(args?: {
  list?: {
    page?: number;
    limit?: number;
    classId?: string;
    studentId?: string;
    status?: TuitionStatus;
  };
  listOptions?: Omit<
    UseQueryOptions<ApiResponse<TuitionsResponse>, Error, TuitionsResponse>,
    "queryKey" | "queryFn"
  >;
  summary?: { classId?: string };
  summaryOptions?: Omit<
    UseQueryOptions<ApiResponse<TuitionSummary>, Error, TuitionSummary>,
    "queryKey" | "queryFn"
  >;
  detailId?: string;
  detailOptions?: Omit<
    UseQueryOptions<ApiResponse<TuitionRecord>, Error, TuitionRecord>,
    "queryKey" | "queryFn"
  >;
}) {
  const list = useGet<ApiResponse<TuitionsResponse>, TuitionsResponse>(
    [...TUITIONS_QUERY_KEY, args?.list],
    "/tuitions",
    {
      params: args?.list,
      enabled: !!args?.list,
      select: (raw) => unwrapApiData<TuitionsResponse>(raw),
      ...args?.listOptions,
    },
  );

  const summary = useGet<ApiResponse<TuitionSummary>, TuitionSummary>(
    [...TUITIONS_QUERY_KEY, "summary", args?.summary],
    "/tuitions/summary",
    {
      params: args?.summary,
      enabled: !!args?.summary,
      select: (raw) => unwrapApiData<TuitionSummary>(raw),
      ...args?.summaryOptions,
    },
  );

  const detail = useGet<ApiResponse<TuitionRecord>, TuitionRecord>(
    [...TUITIONS_QUERY_KEY, "detail", args?.detailId],
    `/tuitions/${args?.detailId ?? ""}`,
    {
      enabled: !!args?.detailId,
      select: (raw) => unwrapApiData<TuitionRecord>(raw),
      ...args?.detailOptions,
    },
  );

  const create = usePost<ApiResponse<TuitionRecord>, CreateTuitionPayload>(
    "/tuitions",
  );
  const update = usePut<
    ApiResponse<TuitionRecord>,
    { id: string } & UpdateTuitionPayload
  >((payload) => `/tuitions/${payload.id}`);
  const del = useDelete<ApiResponse<DeleteResult>, string>(
    (id) => `/tuitions/${id}`,
  );

  return { list, summary, detail, create, update, delete: del };
}

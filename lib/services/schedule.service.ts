import { unwrapApiData } from "@/lib/axios/api-unwrap";
import { useGet, usePost, usePatch, useDelete } from "@/lib/axios/query";
import type { UseQueryOptions } from "@tanstack/react-query";
import type {
  ApiResponse,
  DeleteResult,
  ScheduleItem,
  SchedulePayload,
  BulkSchedulePayload,
} from "@/types";

// ─── Query keys ──────────────────────────────────────────────────────────────

export const SCHEDULES_QUERY_KEY = ["schedules"] as const;

// ─── Actions ─────────────────────────────────────────────────────────────────

/** All schedule queries + mutations behind one hook: `useScheduleActions({...}).create.mutate(...)`. */
export function useScheduleActions(args?: {
  list?: { page?: number; limit?: number; search?: string; classId?: string };
  listOptions?: Omit<
    UseQueryOptions<ApiResponse<{ schedules: ScheduleItem[] }>, Error, ScheduleItem[]>,
    "queryKey" | "queryFn"
  >;
  classId?: string;
  byClassOptions?: Omit<
    UseQueryOptions<ApiResponse<ScheduleItem[]>, Error, ScheduleItem[]>,
    "queryKey" | "queryFn"
  >;
  detailId?: string;
  detailOptions?: Omit<
    UseQueryOptions<ApiResponse<ScheduleItem>, Error, ScheduleItem>,
    "queryKey" | "queryFn"
  >;
}) {
  const list = useGet<ApiResponse<{ schedules: ScheduleItem[] }>, ScheduleItem[]>(
    [...SCHEDULES_QUERY_KEY, args?.list],
    "/schedules",
    {
      params: args?.list,
      enabled: !!args?.list,
      select: (raw) => {
        const data = unwrapApiData<{ schedules: ScheduleItem[] }>(raw);
        return data?.schedules ?? [];
      },
      ...args?.listOptions,
    },
  );

  const byClass = useGet<ApiResponse<ScheduleItem[]>, ScheduleItem[]>(
    [...SCHEDULES_QUERY_KEY, "class", args?.classId],
    `/schedules/class/${args?.classId ?? ""}`,
    {
      enabled: !!args?.classId,
      select: (raw) => unwrapApiData<ScheduleItem[]>(raw) ?? [],
      ...args?.byClassOptions,
    },
  );

  const detail = useGet<ApiResponse<ScheduleItem>, ScheduleItem>(
    [...SCHEDULES_QUERY_KEY, "detail", args?.detailId],
    `/schedules/${args?.detailId ?? ""}`,
    {
      enabled: !!args?.detailId,
      select: (raw) => unwrapApiData<ScheduleItem>(raw),
      ...args?.detailOptions,
    },
  );

  const create = usePost<ApiResponse<ScheduleItem>, SchedulePayload>(
    "/schedules",
  );
  const createBulk = usePost<ApiResponse<ScheduleItem[]>, BulkSchedulePayload>(
    "/schedules/bulk",
  );
  const update = usePatch<
    ApiResponse<ScheduleItem>,
    { id: string } & Partial<SchedulePayload>
  >((payload) => `/schedules/${payload.id}`);
  const del = useDelete<ApiResponse<DeleteResult>, string>(
    (id) => `/schedules/${id}`,
  );

  return { list, byClass, detail, create, createBulk, update, delete: del };
}

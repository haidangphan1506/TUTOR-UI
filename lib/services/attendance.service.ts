import { unwrapApiData } from "@/lib/axios/api-unwrap";
import { useGet, usePut } from "@/lib/axios/query";
import type { UseQueryOptions } from "@tanstack/react-query";
import type {
  ApiResponse,
  AttendanceRecord,
  AttendanceUpsertResult,
  UpsertAttendancePayload,
} from "@/types";

// ─── Query keys ──────────────────────────────────────────────────────────────

export const ATTENDANCE_QUERY_KEY = ["attendances"] as const;

// ─── Actions ─────────────────────────────────────────────────────────────────

/** All attendance queries + mutations behind one hook: `useAttendanceActions({...}).upsert.mutate(...)`. */
export function useAttendanceActions(args?: {
  sessionId?: string;
  listOptions?: Omit<
    UseQueryOptions<ApiResponse<AttendanceRecord[]>, Error, AttendanceRecord[]>,
    "queryKey" | "queryFn"
  >;
}) {
  const list = useGet<ApiResponse<AttendanceRecord[]>, AttendanceRecord[]>(
    [...ATTENDANCE_QUERY_KEY, "session", args?.sessionId],
    `/attendances/session/${args?.sessionId ?? ""}`,
    {
      enabled: !!args?.sessionId,
      select: (raw) => unwrapApiData<AttendanceRecord[]>(raw) ?? [],
      ...args?.listOptions,
    },
  );

  const upsert = usePut<
    ApiResponse<AttendanceUpsertResult>,
    UpsertAttendancePayload
  >("/attendances");

  return { list, upsert };
}

import { unwrapApiData } from "@/lib/axios/api-unwrap";
import { useGet, usePost, usePut, useDelete } from "@/lib/axios/query";
import type { UseQueryOptions } from "@tanstack/react-query";
import type {
  ApiResponse,
  DeleteResult,
  ApiFlowRequest,
  FlowRequestsApiPayload,
  CreateFlowRequestPayload,
  UpdateFlowRequestPayload,
} from "@/types";

// ─── Query keys ──────────────────────────────────────────────────────────────

export const FLOW_REQUESTS_QUERY_KEY = ["flow-requests"] as const;

// ─── Actions ─────────────────────────────────────────────────────────────────

/** All flow-request queries + mutations behind one hook. */
export function useFlowRequestActions(args?: {
  list?: {
    page?: number;
    limit?: number;
    search?: string;
  };
  listOptions?: Omit<
    UseQueryOptions<
      ApiResponse<FlowRequestsApiPayload>,
      Error,
      FlowRequestsApiPayload
    >,
    "queryKey" | "queryFn"
  >;
  detailId?: string;
  detailOptions?: Omit<
    UseQueryOptions<ApiResponse<ApiFlowRequest>, Error, ApiFlowRequest>,
    "queryKey" | "queryFn"
  >;
}) {
  const list = useGet<ApiResponse<FlowRequestsApiPayload>, FlowRequestsApiPayload>(
    [...FLOW_REQUESTS_QUERY_KEY, args?.list],
    "/flow-requests",
    {
      params: args?.list,
      enabled: !!args?.list,
      select: (raw) => unwrapApiData<FlowRequestsApiPayload>(raw),
      ...args?.listOptions,
    },
  );

  const detail = useGet<ApiResponse<ApiFlowRequest>, ApiFlowRequest>(
    [...FLOW_REQUESTS_QUERY_KEY, "detail", args?.detailId],
    `/flow-requests/${args?.detailId ?? ""}`,
    {
      enabled: !!args?.detailId,
      select: (raw) => unwrapApiData<ApiFlowRequest>(raw),
      ...args?.detailOptions,
    },
  );

  const create = usePost<ApiResponse<ApiFlowRequest>, CreateFlowRequestPayload>(
    "/flow-requests",
  );

  const update = usePut<ApiResponse<ApiFlowRequest>, UpdateFlowRequestPayload>(
    (payload) => `/flow-requests/${payload.id}`,
  );

  const del = useDelete<ApiResponse<DeleteResult>, string>(
    (id) => `/flow-requests/${id}`,
  );

  return { list, detail, create, update, delete: del };
}

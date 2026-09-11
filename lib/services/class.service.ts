import { unwrapApiData } from "@/lib/axios/api-unwrap";
import { useGet, usePost, usePut, useDelete } from "@/lib/axios/query";
import type { UseQueryOptions } from "@tanstack/react-query";
import type {
  ApiResponse,
  DeleteResult,
  ApiClassRow,
  ClassesApiPayload,
  ClassDetailDto,
  ClassStudentDto,
} from "@/types";

// ─── Query keys ──────────────────────────────────────────────────────────────

export const CLASSES_QUERY_KEY = ["classes"] as const;

// ─── Actions ─────────────────────────────────────────────────────────────────

/** All class queries + mutations behind one hook: `useClassActions({...}).create.mutate(...)`. */
export function useClassActions(args?: {
  list?: Record<string, unknown>;
  listOptions?: Omit<
    UseQueryOptions<ApiResponse<ClassesApiPayload>, Error, ClassesApiPayload>,
    "queryKey" | "queryFn"
  >;
  detailId?: string;
  detailOptions?: Omit<
    UseQueryOptions<ApiResponse<ClassDetailDto>, Error, ClassDetailDto>,
    "queryKey" | "queryFn"
  >;
  studentsClassId?: string;
  studentsOptions?: Omit<
    UseQueryOptions<ApiResponse<ClassStudentDto[]>, Error, ClassStudentDto[]>,
    "queryKey" | "queryFn"
  >;
  generateCodeOptions?: Omit<
    UseQueryOptions<ApiResponse<{ code: string }>, Error, string>,
    "queryKey" | "queryFn"
  >;
}) {
  const list = useGet<ApiResponse<ClassesApiPayload>, ClassesApiPayload>(
    [...CLASSES_QUERY_KEY, args?.list],
    "/classes",
    {
      params: { limit: 100, ...args?.list },
      select: (raw) => unwrapApiData<ClassesApiPayload>(raw),
      ...args?.listOptions,
    },
  );

  const detail = useGet<ApiResponse<ClassDetailDto>, ClassDetailDto>(
    [...CLASSES_QUERY_KEY, "detail", args?.detailId],
    `/classes/${args?.detailId ?? ""}`,
    {
      enabled: !!args?.detailId,
      select: (raw) => unwrapApiData<ClassDetailDto>(raw),
      ...args?.detailOptions,
    },
  );

  const students = useGet<ApiResponse<ClassStudentDto[]>, ClassStudentDto[]>(
    [...CLASSES_QUERY_KEY, "students", args?.studentsClassId],
    `/classes/${args?.studentsClassId ?? ""}/students`,
    {
      enabled: !!args?.studentsClassId,
      select: (raw) => unwrapApiData<ClassStudentDto[]>(raw) ?? [],
      ...args?.studentsOptions,
    },
  );

  /** `GET /classes/generate-code` returns `{ code: string }`. */
  const generateCode = useGet<ApiResponse<{ code: string }>, string>(
    [...CLASSES_QUERY_KEY, "generate-code"],
    "/classes/generate-code",
    {
      select: (raw) => unwrapApiData<{ code: string }>(raw)?.code ?? "",
      ...args?.generateCodeOptions,
    },
  );

  const create = usePost<ApiResponse<ApiClassRow>, Record<string, unknown>>(
    "/classes",
  );
  const update = usePut<
    ApiResponse<ApiClassRow>,
    { id: string } & Record<string, unknown>
  >((payload) => `/classes/${payload.id}`);
  const del = useDelete<ApiResponse<DeleteResult>, string>(
    (id) => `/classes/${id}`,
  );
  const enrollStudents = usePost<
    ApiResponse<ClassStudentDto[]>,
    { classId: string; studentIds: string[] }
  >((payload) => `/classes/${payload.classId}/students`);

  return {
    list,
    detail,
    students,
    generateCode,
    create,
    update,
    delete: del,
    enrollStudents,
  };
}

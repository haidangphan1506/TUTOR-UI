import { unwrapApiData } from "@/lib/axios/api-unwrap";
import { useGet, usePut, useDelete } from "@/lib/axios/query";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import type { UseQueryOptions } from "@tanstack/react-query";
import type {
  ApiResponse,
  DeleteResult,
  LessonItem,
  CreateLessonPayload,
  UpdateLessonPayload,
} from "@/types";

// ─── Query keys ──────────────────────────────────────────────────────────────

export const LESSONS_QUERY_KEY = ["lessons"] as const;

// ─── Plain functions ─────────────────────────────────────────────────────────

export async function apiUploadLessonFile(
  lessonId: string,
  type: "theory" | "exercises",
  file: File,
): Promise<LessonItem> {
  const formData = new FormData();
  formData.append("file", file);
  const url =
    type === "theory"
      ? `/curriculum/lessons/${lessonId}/add-theory`
      : `/curriculum/lessons/${lessonId}/exercises`;
  const raw = await axiosInstance.put<ApiResponse<LessonItem>>(url, formData);
  return unwrapApiData<LessonItem>(raw.data);
}

// ─── Actions ─────────────────────────────────────────────────────────────────

/** All lesson queries + mutations behind one hook: `useLessonActions({...}).create.mutate(...)`. */
export function useLessonActions(args?: {
  list?: {
    curriculumId: string;
    chapterId?: string;
    page?: number;
    limit?: number;
  };
  listOptions?: Omit<
    UseQueryOptions<ApiResponse<{ lessons: LessonItem[] }>, Error, LessonItem[]>,
    "queryKey" | "queryFn"
  >;
  detailId?: string;
  detailOptions?: Omit<
    UseQueryOptions<ApiResponse<LessonItem>, Error, LessonItem>,
    "queryKey" | "queryFn"
  >;
}) {
  const list = useGet<ApiResponse<{ lessons: LessonItem[] }>, LessonItem[]>(
    [...LESSONS_QUERY_KEY, args?.list],
    "/curriculum/lessons",
    {
      params: args?.list,
      enabled: !!args?.list,
      select: (raw) =>
        unwrapApiData<{ lessons: LessonItem[] }>(raw)?.lessons ?? [],
      ...args?.listOptions,
    },
  );

  const detail = useGet<ApiResponse<LessonItem>, LessonItem>(
    [...LESSONS_QUERY_KEY, "detail", args?.detailId],
    `/curriculum/lessons/${args?.detailId ?? ""}`,
    {
      enabled: !!args?.detailId,
      select: (raw) => unwrapApiData<LessonItem>(raw),
      ...args?.detailOptions,
    },
  );

  const create = useMutation<
    ApiResponse<LessonItem>,
    Error,
    { curriculumId: string; chapterId?: string } & CreateLessonPayload
  >({
    mutationFn: async (payload) => {
      const { curriculumId, chapterId, ...body } = payload;
      const params: Record<string, string> = { curriculumId };
      if (chapterId) params.chapterId = chapterId;
      const res = await axiosInstance.post<ApiResponse<LessonItem>>(
        "/curriculum/lessons",
        body,
        { params },
      );
      return res.data;
    },
  });
  const update = usePut<
    ApiResponse<LessonItem>,
    { id: string } & UpdateLessonPayload
  >((payload) => `/curriculum/lessons/${payload.id}`);
  const del = useDelete<ApiResponse<DeleteResult>, string>(
    (id) => `/curriculum/lessons/${id}`,
  );

  return { list, detail, create, update, delete: del };
}

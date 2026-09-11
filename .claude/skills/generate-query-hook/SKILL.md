---
name: generate-query-hook
description: Scaffold data layer cho một tài nguyên FE — các hook gọi API dùng wrapper useGet/usePost/usePut/useDelete (lib/axios/query.ts), key query, và type khớp hợp đồng BE. Dùng khi được yêu cầu thêm lời gọi API, hook fetch/mutation, hay tầng dữ liệu cho một feature trong web app Next.js này.
---

# Tạo data layer / query hook (FE)

Scaffold service file cho một tài nguyên, khớp hợp đồng BE (xem rule [[api-integration]]). Không
gọi `axiosInstance` trực tiếp trong component — luôn qua wrapper.

## Inputs

1. **Tên tài nguyên** (vd `assignment`) và route BE tương ứng (`/assignments`, `/assignments/:id`).
2. Cần thao tác nào: list (phân trang), get-by-id, create, update, delete.
3. Shape dữ liệu (định nghĩa trong `types/{name}.types.ts`, khớp phần đã bóc `data` của BE).

## Cấu trúc service file

Đặt trong `lib/services/{name}.service.ts`. Mỗi resource export **đúng một** hook
`use{Resource}Actions(args?)` gộp **tất cả** — mọi query (list/detail/summary/generate-code...) lẫn
mọi mutation (create/update/delete và action khác) — không tách hook query riêng
(`useFoos`/`useFooDetail`). Template:

```ts
import { unwrapApiData } from "@/lib/axios/api-unwrap";
import { useGet, usePost, usePut, useDelete } from "@/lib/axios/query";
import type { UseQueryOptions } from "@tanstack/react-query";
import type { ApiResponse, DeleteResult, ApiFoo, FoosApiPayload, CreateFooPayload, UpdateFooPayload } from "@/types";

// ─── Query keys ──────────────────────────────────────────────────────────────
export const FOOS_QUERY_KEY = ["foos", "list"] as const;

// ─── Actions ─────────────────────────────────────────────────────────────────

/** All foo queries + mutations behind one hook: `useFooActions({...}).create.mutate(...)`. */
export function useFooActions(args?: {
  list?: { page?: number; limit?: number; search?: string };
  listOptions?: Omit<UseQueryOptions<ApiResponse<FoosApiPayload>, Error, FoosApiPayload>, "queryKey" | "queryFn">;
  detailId?: string;
  detailOptions?: Omit<UseQueryOptions<ApiResponse<ApiFoo>, Error, ApiFoo>, "queryKey" | "queryFn">;
}) {
  const list = useGet<ApiResponse<FoosApiPayload>, FoosApiPayload>(
    [...FOOS_QUERY_KEY, args?.list],
    "/foos",
    {
      params: args?.list,
      enabled: !!args?.list,
      select: (raw) => unwrapApiData<FoosApiPayload>(raw),
      ...args?.listOptions,
    },
  );

  const detail = useGet<ApiResponse<ApiFoo>, ApiFoo>(
    [...FOOS_QUERY_KEY, "detail", args?.detailId],
    `/foos/${args?.detailId ?? ""}`,
    {
      enabled: !!args?.detailId,
      select: (raw) => unwrapApiData<ApiFoo>(raw),
      ...args?.detailOptions,
    },
  );

  const create = usePost<ApiResponse<ApiFoo>, CreateFooPayload>("/foos");
  const update = usePut<ApiResponse<ApiFoo>, { id: string } & UpdateFooPayload>(
    (payload) => `/foos/${payload.id}`,
  );
  const del = useDelete<ApiResponse<DeleteResult>, string>((id) => `/foos/${id}`);

  return { list, detail, create, update, delete: del };
}
```

**Không dùng `unknown` làm generic của `useGet`/`usePost`/`usePut`/`usePatch`/`useDelete`.** Tham số
`TRaw` luôn là `ApiResponse<T>` (`types/api.types.ts` — envelope BE bọc quanh `data`), `T` là shape
thật trong `data`. Mutation không tự bóc nên `TData` của nó cũng là `ApiResponse<T>`, không phải `T`
trần. DELETE dùng `ApiResponse<DeleteResult>` (`DeleteResult = { id: string }`) trừ khi doc ghi rõ
shape khác. BE row chưa type đầy đủ → đặt tên `Record<string, unknown>` trong
`types/{name}.types.ts` (vd `ChapterItem`) thay vì để `unknown` trần trong service file.

Mỗi `useGet`/`usePost`/`usePut`/`usePatch`/`useDelete` bên trong `use{Resource}Actions()` chạy
**không điều kiện ngay ở đầu hook** — không đặt trong closure trả về (`{ create: (options) =>
usePost(...) }`), vì closure đó không phải hook nên gọi hook bên trong nó vi phạm rules-of-hooks
(`react-hooks/rules-of-hooks`). Query có tham số động (id chi tiết, filter list...) nhận qua field
tương ứng trong `args` (`args.detailId`, `args.list`...) và tự set `enabled: !!args.xxx` để trì hoãn
thực thi tới khi có tham số — hook vẫn luôn được gọi, chỉ query không chạy. `delete` là từ khoá nên
khai biến local `del` rồi return `{ delete: del }`. Field mutation đặt tên theo domain khi resource có
action ngoài CRUD (vd `markRead`, `grade`, `toggleStatus`) thay vì ép về `create`/`update`/`delete`.
Resource chỉ đọc, không có mutation nào (vd dashboard) vẫn giữ tên `use{Resource}Actions`, chỉ trả về
field query.

Component gọi `use{Resource}Actions({ list: params }).create.mutate(payload, { onSuccess, onError })`
— callback mutate truyền lúc gọi `mutate()`/`mutateAsync()`, không bind lúc tạo hook. Chỉ truyền field
`args` mà component đó cần (list page truyền `list`, detail page truyền `detailId`). Xem
`lib/services/auth.service.ts` (`useAuthActions` — chỉ mutation) và `lib/services/tuition.service.ts`
(`useTuitionActions` — đủ `list`/`summary`/`detail` + `create`/`update`/`delete`) làm mẫu thật.

## Quy ước query key

- `const {NAME}_QUERY_KEY = ["{name}", "list"] as const` ở đầu file.
- List: `[...FOOS_QUERY_KEY, args?.list]` — spread + object params (React Query so sánh key theo cấu
  trúc, không cần liệt kê từng field rời).
- Detail: `[...FOOS_QUERY_KEY, "detail", args?.detailId]`.
- Include **mọi** tham số ảnh hưởng cache (page, search, filter values) vào key.

## Type conventions (`types/{name}.types.ts`)

**Tất cả `type`/`interface`/`enum` phải sống trong `types/`** — không khai báo inline trong service
file hay component.

- Tạo `types/{name}.types.ts` chứa:
  - `Api{Resource}` — shape thô BE sau `unwrapApiData()`.
  - `Create{Resource}Payload` — payload POST.
  - `Update{Resource}Payload` — payload PUT.
  - `{Resources}ApiPayload` — shape list `{ [resource]: Api{Resource}[], pagination }`.
  - Enum/constant liên quan (vd `FooStatus`).
- `ApiResponse<T>`/`DeleteResult` (`types/api.types.ts`) đã có sẵn, dùng chung cho mọi resource —
  không tạo lại.
- Barrel `types/index.ts` re-export hết → import qua `@/types` hoặc trực tiếp `@/types/{name}.types`.
- Service file import type: `import type { ApiResponse, ApiFoo, CreateFooPayload } from "@/types"`.
- Kiểm tra `types/*.types.ts` có sẵn type chưa trước khi thêm mới.

## Bóc response + lỗi

- `select: (raw) => unwrapApiData<T>(raw)` trong `useGet` options.
- Mutation không tự bóc `{ data }` — component tự `unwrapApiData()` trong `onSuccess` nếu cần đọc
  response.
- `onError: (err) => toast.error(getErrorMessage(err, fallback))` truyền vào
  `mutate(payload, { onError })`/`mutateAsync(payload, { onError })` ở component, không bind lúc
  tạo `use{Resource}Actions()`.
- Form errors: `handleFormApiError(err, setError, fallback)` (422 Nest validation pipe).

## Sau khi tạo

1. `bun run lint` + `bun run build`.
2. Cập nhật `API_ENDPOINTS.md` nếu thêm endpoint.
3. Báo cáo file đã đổi. Không commit trừ khi được yêu cầu.

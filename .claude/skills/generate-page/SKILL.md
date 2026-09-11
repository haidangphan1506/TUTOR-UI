---
name: generate-page
description: Scaffold một màn hình FE mới theo quy ước dự án — route trong app/(app)/{name}/page.tsx và component feature trong components/{name}/, dùng primitives ui/, query hook và Zod form. Dùng khi được yêu cầu tạo/thêm một trang, màn hình, hoặc feature UI cho web app Next.js này.
---

# Tạo màn hình FE (Next.js App Router)

Scaffold một màn hình mới khớp đúng quy ước hiện có. Tham khảo `components/students/*` +
`app/(app)/students/page.tsx` làm mẫu (có list + phân trang + dialog CRUD + dùng UI primitives).

## Inputs (hỏi hoặc suy ra)

1. **Tên feature** (số nhiều, lowercase, vd `assignments`) → route `app/(app)/assignments/`.
2. Màn hình cần gì: list (có phân trang?), detail (`[id]/page.tsx`?), dialog thêm/sửa/xoá?
3. Đọc/ghi dữ liệu gì (map sang endpoint BE) — dùng type trong `types/*`.
4. **Role được vào** (ADMIN/TUTOR/STUDENT/PARENT): độc quyền 1 role hay dùng chung? Xem
   `.claude/rules/fe-rbac-role-guarding.md`.

## Việc tạo

Các quy ước chi tiết (API primitive, quy tắc override, ví dụ mẫu) nằm trong `.claude/rules/*.md` —
mục dưới đây chỉ liệt kê thứ tự việc cần làm và trỏ đúng rule cho từng phần, tránh lặp lại nội dung
đã có ở đó (rule là nguồn duy nhất, sửa quy ước thì sửa ở rule, không sửa ở đây).

- **Route**: `app/(app)/{name}/page.tsx` (và `[id]/page.tsx` nếu có detail). Page.tsx import
  component list từ `components/{name}/{name}-list.tsx` (hoặc `{name}-page.tsx` nếu page không
  phải list table). Page là React Server/Client component theo nhu cầu; phần tương tác (dialog, form)
  tách ra client component trong `components/{name}/`. Nếu trang **độc quyền 1 role** → đặt trong
  route-group role theo `.claude/rules/fe-rbac-role-guarding.md`.
- **Component feature** — **bắt buộc tách file theo trách nhiệm** (xem [[structure-naming]]):
  - `{name}-list.tsx` — component list/toolbar: fetch data, render search + filter tabs + table +
    pagination + UsageGuides. Chứa state search/filter/pagination.
  - `{action}-{name}-dialog.tsx` hoặc `{action}-{name}-modal.tsx` — mỗi dialog thêm/sửa/xoá là
    component riêng, nhận props `open`/`onClose`/`onSaved` (hoặc `onAdd`/`onConfirm`). Không nhồi
    dialog logic vào file list.
  - `{name}-data.ts` (tuỳ chọn) — hằng số domain không phải text hiển thị.
  - Dùng **UI primitives** (`components/ui/*`) theo `.claude/rules/ui-components.md` — **không**
    dùng thẻ HTML thô cho control đã có primitive:
    - `<button>` → `Button`; `<input>` → `Input`; `<select>` → `Select`; `<label>` → `Label`;
      `<table>/<thead>/<tbody>/<tr>/<th>/<td>` → `Table`/`TableHeader`/`TableBody`/`TableRow`/
      `TableHead`/`TableCell`
    - Bảng đơn giản → `Table` primitives; bảng phức tạp (column config, auto state) → `DataTable`.
    - Dialog → `Dialog` (`dialog-form.ui`) hoặc `ConfirmDialog` (`confirm-dialog.ui`).
  - Trước khi dùng một primitive, `Read` file `.ui.tsx` của nó để lấy đúng props hiện tại — đừng
    chỉ dựa vào mô tả trong rule hay suy đoán từ tên. Xem `components/students/` (tất cả dialog tách
    riêng + list dùng `Table`/`Input`/`Label`/`Select`/`Button`) và
    `components/users/users-page.tsx` (DataTable + Pagination) làm mẫu.
- **Data**: dùng `useGet/usePost/usePut/useDelete` (`@/lib/query.ts`) theo `.claude/rules/api-integration.md`
  và `.claude/rules/state-and-forms.md`. Nếu cần hook query riêng, dùng skill `generate-query-hook`.
- **Form**: React Hook Form + Zod v4 theo `.claude/rules/state-and-forms.md`. Field khớp schema BE.
- **Type** — **tất cả `type`/`interface`/`enum` phải sống trong `types/`** (xem [[api-integration]]
  mục Type conventions):
  - Tạo/mở rộng `types/{name}.types.ts` cho tài nguyên mới. Barrel `types/index.ts` re-export
    hết → import qua `@/types` hoặc trực tiếp `@/types/{name}.types`.
  - **Không** khai báo `type`/`interface`/`enum` inline trong file component/service/hook — kể cả
    khi chỉ dùng 1 nơi. Di chuyển vào `types/{name}.types.ts` rồi import.
  - Kiểm tra type có sẵn (vd `SessionStatus`, `SessionFile` trong `session.types.ts`) trước khi
    thêm mới để tránh trùng lặp.
  - Props type của component (vd `FooListProps`, `AddFooDialogProps`) — nếu dùng ở nhiều nơi thì
    đặt trong `types/{name}.types.ts`; nếu chỉ dùng 1 file thì khai báo inline trong file đó
    (đây là ngoại lệ duy nhất — component props type là pseudo-local, không phải DTO).
- **i18n / UI copy (vi + en)**: dictionary + `use{Name}Copy.hook.ts` theo `.claude/rules/i18n-copy.md` —
  không hardcode chuỗi hiển thị trong JSX/toast.
- **Điều hướng/menu & phân quyền**: thêm mục vào menu theo role trong
  `components/layout/app-sidebar.tsx`, và khai báo quyền route trong `ROUTE_ACCESS`
  (`lib/rbac/route-access.ts`) nếu là trang dùng chung — hai nơi phải khớp
  (`.claude/rules/fe-rbac-role-guarding.md`).

## Sau khi tạo

1. `bun run lint` và `bun run build` để chắc biên dịch được.
2. Kiểm tra feature folder có đúng cấu trúc: list component tách riêng, mỗi dialog/modal tách riêng
   theo `components/{name}/`. Không có file nào nhồi cả list + dialog.
3. Cập nhật `API_ENDPOINTS.md` nếu có lời gọi API mới.
4. Báo cáo file đã tạo/sửa. Không commit trừ khi được yêu cầu.

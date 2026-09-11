# Rule: Cấu trúc thư mục & đặt tên file (FE)

- **Đặt tên file**: UI primitive `{name}.ui.tsx`; component feature `{name}.tsx` hoặc
  `{name}-list.tsx` (list/table page); dialog/modal `{action}-{name}-dialog.tsx` hoặc
  `{action}-{name}-modal.tsx` (vd `add-student-dialog.tsx`, `edit-class-modal.tsx`);
  hook `use{Name}.hook.ts`; type `{name}.types.ts`; Redux slice `{name}.slice.ts`.
- **Types folder** (`types/`): tất cả `type`/`interface`/`enum` DTO phải sống trong `types/{name}.types.ts`
  — không khai báo inline trong component/service/hook (xem [[api-integration]] mục Type conventions).
  Barrel `types/index.ts` re-export hết → import qua `@/types` hoặc `@/types/{name}.types`.
  Ngoại lệ: component props type chỉ dùng 1 file thì khai báo inline trong file đó.
- **Feature folder** (`components/{name}/`): tách file theo trách nhiệm — list/table component
  riêng, mỗi dialog/modal thêm/sửa/xoá riêng, data constants riêng (nếu có). Không nhồi list +
  dialog + form vào cùng 1 file. Xem `components/students/` (add/edit/delete dialog tách riêng) và
  `components/users/` (`users-page.tsx` + create/edit/delete dialog + `role-options.ts`) làm mẫu.
- **Path alias**: `@/*` trỏ về gốc project (`@/components/...`, `@/lib/...`) — không dùng đường dẫn
  tương đối dài `../../..`.
- **Không import qua barrel gốc `@/components`** (`components/index.ts`, gom cả `./auth`,
  `./layout`, `./providers`, `./ui`). Import primitive/component theo đường dẫn trực tiếp
  (`@/components/ui/pagination.ui`, `@/components/students/add-student-dialog`...) — đúng như mọi
  file khác trong repo đang làm. Barrel gốc từng gây bug thật: `app/(app)/students/page.tsx` import
  `Pagination` từ `@/components` tạo circular import (barrel gốc kéo theo `./layout`/`./providers`),
  khiến Turbopack resolve `Pagination` thành `undefined` lúc render ("Element type is invalid... got:
  undefined") dù component export đúng. Sub-barrel theo nhóm (`components/ui/index.ts`,
  `components/layout/index.ts`...) vẫn dùng bình thường, chỉ tránh barrel gốc `@/components`.
- **Cấu trúc route**: màn hình đã đăng nhập nằm trong nhóm `app/(app)/{name}/`; màn hình auth trong
  `app/(auth)/`. Page.tsx import component list từ `components/{name}/{name}-list.tsx` (hoặc
  `{name}-page.tsx` nếu page không có list). Component theo feature đặt trong `components/{name}/`.
  Phân quyền theo role cho route-group con trong `app/(app)/` xem [[fe-rbac-role-guarding]].
- **Testing**: test trong `test/` phản chiếu cấu trúc source; đặt tên `*.test.ts(x)`; Vitest + jsdom +
  `@testing-library/react`.

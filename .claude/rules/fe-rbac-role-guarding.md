# Rule: Phân quyền route theo role (ADMIN/TUTOR/STUDENT/PARENT)

Xem cấu trúc route/naming chung ở [[structure-naming]].

- **SSOT**: `lib/rbac/roles.ts` (`UserRole`, `ROLE_LABELS`, `ROLE_HOME`) + `lib/rbac/route-access.ts`
  (bảng `ROUTE_ACCESS`: prefix URL → role được vào; route không khai báo = mọi role đã đăng nhập).
- Trang **độc quyền 1 role** → đặt trong route-group role tương ứng
  `app/(app)/(admin|tutor|student|parent)/{name}/`; mỗi group có `layout.tsx` bọc
  `<RoleGuard allow={[ROLE]}>`. Route-group không đổi URL nên một URL chỉ thuộc **một** group.
- Trang **dùng chung nhiều role** → để ở `app/(app)/` gốc; `<RouteAccessGuard>` ở shell
  (`(app)/root.layout.tsx`) tự chặn theo `ROUTE_ACCESS` (khớp cả route con động).
- `<AuthGuard>` (shell) lo xác thực; `RoleGuard`/`RouteAccessGuard` lo phân quyền. Guard chỉ chặn
  phía client — quyền thật do BE enforce. Khi đổi quyền route, sửa **cả** `ROUTE_ACCESS` **và** menu
  theo role trong `components/layout/app-sidebar.tsx` (hai nơi phải khớp).
- **Một route dùng chung nhiều role nhưng UI khác hẳn theo role** (không chỉ ẩn/khoá vài control):
  tách thành component riêng theo role, và component export ở route dùng một **dispatcher** rẽ theo
  `useCurrentUserRole()` ở đầu file — xem `components/classes/class-detail-page.tsx`
  (`ClassDetailPage` rẽ sang `TutorClassDetailPage` nội bộ file đó hoặc
  `ClassDetailWatchPage` ở `components/classes/class-detail-watch-page.tsx` cho STUDENT/PARENT).
  Component không-tutor tự fetch dữ liệu riêng (không tái dùng hook fetch của bản tutor) để tránh gọi
  API dư khi mount nhánh kia. Dùng dispatcher này khi layout khác biệt đủ lớn (vd trang "xem" dạng
  dashboard khác hẳn trang "quản lý" dạng bảng); nếu chỉ khác vài nút/cột (vd ẩn nút xoá, ẩn cột thao
  tác) thì dùng cờ `isTutor`/`useCurrentUserRole()` ẩn/khoá control ngay trong cùng component — xem
  `components/classes/classes-page.tsx` (list, ẩn nút "Thêm lớp"/cột hành động) và
  `components/classes/session-detail-page.tsx` (buổi học, khoá form + ẩn nút import/xoá tài liệu) làm
  mẫu cho cách ẩn tại-chỗ này.

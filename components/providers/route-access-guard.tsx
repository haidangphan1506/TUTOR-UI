"use client";

import { usePathname } from "next/navigation";

import { ALL_ROLES } from "@/lib/rbac/roles";
import { getRouteAccess } from "@/lib/rbac/route-access";
import { RoleGuard } from "./role-guard";

/**
 * Chặn theo role cho **mọi route dùng chung** dựa trên bảng `ROUTE_ACCESS`.
 * Đặt một lần ở shell `(app)` — tự tra `pathname` (kể cả route con động như
 * `/classes/[id]/...`) rồi uỷ quyền cho `RoleGuard`.
 *
 * Route không khai báo trong `ROUTE_ACCESS` → cho mọi role đã đăng nhập
 * (`ALL_ROLES`). Bổ sung cho các layout `RoleGuard` ở từng route-group role
 * (defense in depth — cả hai đều nhất quán với `ROUTE_ACCESS`).
 */
export function RouteAccessGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const allow = getRouteAccess(pathname) ?? ALL_ROLES;

  return <RoleGuard allow={allow}>{children}</RoleGuard>;
}

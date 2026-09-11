import { RoleGuard } from "@/components/providers/role-guard";

/**
 * Route-group PARENT. Đặt các trang chỉ dành cho Phụ huynh vào `(parent)/`.
 * Trang dùng chung nhiều role vẫn để ở `(app)/` gốc.
 */
export default function ParentGroupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RoleGuard allow={["PARENT"]}>{children}</RoleGuard>;
}

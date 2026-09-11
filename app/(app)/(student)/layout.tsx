import { RoleGuard } from "@/components/providers/role-guard";

/**
 * Route-group STUDENT. Đặt các trang chỉ dành cho Học sinh vào `(student)/`.
 * Trang dùng chung nhiều role vẫn để ở `(app)/` gốc.
 */
export default function StudentGroupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RoleGuard allow={["STUDENT"]}>{children}</RoleGuard>;
}

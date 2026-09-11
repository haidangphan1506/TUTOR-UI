import { RoleGuard } from "@/components/providers/role-guard";

/**
 * Route-group TUTOR. Đặt các trang chỉ dành cho Gia sư vào `(tutor)/`.
 * Trang dùng chung nhiều role vẫn để ở `(app)/` gốc.
 */
export default function TutorGroupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RoleGuard allow={["TUTOR"]}>{children}</RoleGuard>;
}

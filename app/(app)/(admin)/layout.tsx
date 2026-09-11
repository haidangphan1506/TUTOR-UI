import { RoleGuard } from "@/components/providers/role-guard";

/**
 * Route-group ADMIN. Mọi trang đặt trong `(admin)/` chỉ Quản trị viên truy cập
 * được — role khác gõ thẳng URL sẽ bị đá về trang chủ.
 */
export default function AdminGroupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RoleGuard allow={["ADMIN"]}>{children}</RoleGuard>;
}

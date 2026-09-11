import type { UserRole } from "@/hooks/useCurrentUserRole";

export type { UserRole };

/** Mọi role hợp lệ của hệ thống, theo đúng thứ tự phân cấp quyền. */
export const ALL_ROLES: readonly UserRole[] = [
  "ADMIN",
  "TUTOR",
  "STUDENT",
  "PARENT",
] as const;

/** Nhãn hiển thị tiếng Việt cho từng role. */
export const ROLE_LABELS = {
  ADMIN: "Quản trị viên",
  TUTOR: "Gia sư",
  STUDENT: "Học sinh",
  PARENT: "Phụ huynh",
} as const satisfies Record<UserRole, string>;

/**
 * Trang chủ mặc định theo role — dùng làm đích redirect khi một role truy cập
 * URL không thuộc quyền của mình (RoleGuard).
 */
export const ROLE_HOME = {
  ADMIN: "/",
  TUTOR: "/",
  STUDENT: "/",
  PARENT: "/",
} as const satisfies Record<UserRole, string>;

/** Kiểm tra một role có nằm trong danh sách được phép hay không. */
export function isRoleAllowed(
  role: UserRole,
  allow: readonly UserRole[],
): boolean {
  return allow.includes(role);
}

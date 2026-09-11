import type { ManagedUserRole } from "@/types";

export const ROLE_OPTIONS: { label: string; value: ManagedUserRole }[] = [
  { label: "Quản trị viên", value: "ADMIN" },
  { label: "Gia sư", value: "TUTOR" },
  { label: "Học sinh", value: "STUDENT" },
  { label: "Phụ huynh", value: "PARENT" },
];

export const ROLE_LABEL: Record<ManagedUserRole, string> = {
  ADMIN: "Quản trị viên",
  TUTOR: "Gia sư",
  STUDENT: "Học sinh",
  PARENT: "Phụ huynh",
};

export const ROLE_COLOR: Record<ManagedUserRole, { bg: string; text: string }> =
  {
    ADMIN: { bg: "#F3E8FF", text: "#7C3AED" },
    TUTOR: { bg: "#E4F6EF", text: "#0B7A6D" },
    STUDENT: { bg: "#DBEAFE", text: "#2563EB" },
    PARENT: { bg: "#FFF0E6", text: "#E85D24" },
  };

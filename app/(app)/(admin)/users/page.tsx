import type { Metadata } from "next";

import { UsersPage } from "@/components/users/users-page";

export const metadata: Metadata = {
  title: "Quản lý người dùng",
};

export default function Page() {
  return <UsersPage />;
}

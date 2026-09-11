import type { Metadata } from "next";

import { GradesPage } from "@/components/grades";

export const metadata: Metadata = {
  title: "Quản lý điểm số",
};

export default function Page() {
  return <GradesPage />;
}

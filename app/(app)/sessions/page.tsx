import type { Metadata } from "next";

import { StudentSessionsPage } from "@/components/sessions";

export const metadata: Metadata = {
  title: "Buổi học",
};

export default function Page() {
  return <StudentSessionsPage />;
}

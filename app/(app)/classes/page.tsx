import type { Metadata } from "next";

import { ClassesPage } from "@/components/classes";

export const metadata: Metadata = {
  title: "Classes",
};

export default function Page() {
  return <ClassesPage />;
}

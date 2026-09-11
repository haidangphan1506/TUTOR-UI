import type { Metadata } from "next";

import { CurriculumListPage } from "@/components/curriculum";

export const metadata: Metadata = {
  title: "Chương trình học",
};

export default function Page() {
  return <CurriculumListPage />;
}

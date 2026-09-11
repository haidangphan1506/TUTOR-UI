import type { Metadata } from "next";

import { PracticeExamsPage } from "@/components/practice-exams";

export const metadata: Metadata = {
  title: "Ôn tập & Thi thử",
};

export default function Page() {
  return <PracticeExamsPage />;
}

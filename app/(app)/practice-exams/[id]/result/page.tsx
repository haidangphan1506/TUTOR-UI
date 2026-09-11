import type { Metadata } from "next";

import { PracticeExamResultPage } from "@/components/practice-exams";

export const metadata: Metadata = {
  title: "Kết quả thi",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PracticeExamResultPage examId={id} />;
}

import type { Metadata } from "next";

import { PracticeExamTakePage } from "@/components/practice-exams";

export const metadata: Metadata = {
  title: "Ôn tập & Thi thử",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PracticeExamTakePage examId={id} />;
}

import type { Metadata } from "next";

import { ExerciseSubmitPage } from "@/components/classes/page/exercise-submit-page";

export const metadata: Metadata = {
  title: "Nộp bài tập",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; sessionId: string }>;
}) {
  const { id, sessionId } = await params;
  return <ExerciseSubmitPage classId={id} sessionId={sessionId} />;
}

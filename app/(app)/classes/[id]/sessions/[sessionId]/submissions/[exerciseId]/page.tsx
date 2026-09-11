import type { Metadata } from "next";

import { ExerciseGradePage } from "@/components/classes/page/exercise-grade-page";

export const metadata: Metadata = {
  title: "Chấm bài",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; sessionId: string; exerciseId: string }>;
}) {
  const { id, sessionId, exerciseId } = await params;
  return (
    <ExerciseGradePage classId={id} sessionId={sessionId} exerciseId={exerciseId} />
  );
}

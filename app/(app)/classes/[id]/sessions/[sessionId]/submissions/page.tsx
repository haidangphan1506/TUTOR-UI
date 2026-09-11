import type { Metadata } from "next";

import { SessionSubmissionsPage } from "@/components/classes/page/session-submissions-page";

export const metadata: Metadata = {
  title: "Bài nộp của học sinh",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; sessionId: string }>;
}) {
  const { id, sessionId } = await params;
  return <SessionSubmissionsPage classId={id} sessionId={sessionId} />;
}

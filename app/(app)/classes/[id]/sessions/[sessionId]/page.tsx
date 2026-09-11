import type { Metadata } from "next";

import { SessionDetailPage } from "@/components/classes/page/session-detail-page";

export const metadata: Metadata = {
  title: "Chi tiết buổi học",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; sessionId: string }>;
}) {
  const { id, sessionId } = await params;
  return <SessionDetailPage classId={id} sessionId={sessionId} />;
}

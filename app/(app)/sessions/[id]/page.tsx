import type { Metadata } from "next";

import { SessionDetailView } from "@/components/sessions";

export const metadata: Metadata = {
  title: "Chi tiết buổi học",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SessionDetailView sessionId={id} />;
}

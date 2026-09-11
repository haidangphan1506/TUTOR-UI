import type { Metadata } from "next";

import { ClassDetailPage } from "@/components/classes/page/class-detail-page";

export const metadata: Metadata = {
  title: "Chi tiết lớp học",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClassDetailPage classId={id} />;
}

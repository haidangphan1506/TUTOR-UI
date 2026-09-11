import type { Metadata } from "next";

import { ClassMaterialsPage } from "@/components/classes";

export const metadata: Metadata = {
  title: "Bài tập",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClassMaterialsPage classId={id} mode="exercise" />;
}

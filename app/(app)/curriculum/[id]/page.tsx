import type { Metadata } from "next";

import { CurriculumDetailPage } from "@/components/curriculum";

export const metadata: Metadata = {
  title: "Chi tiết chương trình",
};

type Props = { params: Promise<{ id: string }> };

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <CurriculumDetailPage frameworkId={id} />;
}

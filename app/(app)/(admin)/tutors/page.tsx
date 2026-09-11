import type { Metadata } from "next";

import { TutorsPage } from "@/components/tutors/tutors-page";

export const metadata: Metadata = {
  title: "Quản lý gia sư",
};

export default function Page() {
  return <TutorsPage />;
}

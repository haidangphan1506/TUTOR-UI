import type { Metadata } from "next";

import { FeesPage } from "@/components/fees";

export const metadata: Metadata = {
  title: "Học phí",
};

export default function Page() {
  return <FeesPage />;
}

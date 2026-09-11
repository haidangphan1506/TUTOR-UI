import type { Metadata } from "next";

import { InvestmentsPage } from "@/components/investments";

export const metadata: Metadata = {
  title: "Investments",
};

export default function Page() {
  return <InvestmentsPage />;
}

import type { Metadata } from "next";

import { DiscussionsPage } from "@/components/discussions";

export const metadata: Metadata = {
  title: "Thảo luận với phụ huynh",
};

export default function Page() {
  return <DiscussionsPage />;
}

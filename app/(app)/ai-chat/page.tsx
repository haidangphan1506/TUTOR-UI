import type { Metadata } from "next";

import { AiChatPage } from "@/components/ai-chat/ai-chat";

export const metadata: Metadata = {
  title: "AI Trợ lý",
};

export default function Page() {
  return <AiChatPage />;
}

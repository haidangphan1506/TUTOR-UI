"use client";

import { useCallback, useState } from "react";

import { getErrorMessage } from "@/lib/axios";
import { unwrapApiData } from "@/lib/axios/api-unwrap";
import { usePost } from "@/lib/axios/query";

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

interface ChatRequest {
  message: string;
  history: ChatMessage[];
}

/** Shape returned by `POST /ai-chat/chat` after the Nest response envelope is unwrapped. */
interface ChatReply {
  reply: string;
}

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Xin chào! Tôi là trợ lý AI. Bạn có thể hỏi tôi về lớp học, lịch học, học phí, bài tập, điểm số hay chương trình học của mình.",
};

/**
 * Conversation state + send logic for the AI chat widget.
 * Sends the running history so the assistant keeps context across turns.
 */
export function useAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const mutation = usePost<unknown, ChatRequest>("/ai-chat/chat");

  const sendMessage = useCallback(
    async (raw: string) => {
      const content = raw.trim();
      if (!content || mutation.isPending) return;

      const history = messages;
      setMessages((prev) => [...prev, { role: "user", content }]);

      try {
        const body = await mutation.mutateAsync({ message: content, history });
        const { reply } = unwrapApiData<ChatReply>(body);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: reply || "Xin lỗi, tôi chưa có câu trả lời.",
          },
        ]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: getErrorMessage(
              error,
              "Đã có lỗi xảy ra, vui lòng thử lại sau.",
            ),
          },
        ]);
      }
    },
    [messages, mutation],
  );

  const reset = useCallback(() => setMessages([WELCOME_MESSAGE]), []);

  return {
    messages,
    sendMessage,
    reset,
    isSending: mutation.isPending,
  };
}

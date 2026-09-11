"use client";

import { useEffect, useCallback, useRef } from "react";
import { useSocket } from "@/components/providers/socket.provider";

type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: string;
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
};

type TypingEvent = {
  userId: string;
  conversationId: string;
};

type UseChatSocketOptions = {
  conversationId?: string;
  onMessage?: (message: Message) => void;
  onTypingStart?: (data: TypingEvent) => void;
  onTypingStop?: (data: TypingEvent) => void;
  onUserStatus?: (data: { userId: string; status: string }) => void;
};

export function useChatSocket({
  conversationId,
  onMessage,
  onTypingStart,
  onTypingStop,
  onUserStatus,
}: UseChatSocketOptions) {
  const { socket, isConnected } = useSocket();
  const onMessageRef = useRef(onMessage);
  const onTypingStartRef = useRef(onTypingStart);
  const onTypingStopRef = useRef(onTypingStop);
  const onUserStatusRef = useRef(onUserStatus);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    onTypingStartRef.current = onTypingStart;
  }, [onTypingStart]);

  useEffect(() => {
    onTypingStopRef.current = onTypingStop;
  }, [onTypingStop]);

  useEffect(() => {
    onUserStatusRef.current = onUserStatus;
  }, [onUserStatus]);

  // Join/leave conversation room
  useEffect(() => {
    if (!socket || !conversationId) return;

    socket.emit("conversation:join", { conversationId });

    return () => {
      socket.emit("conversation:leave", { conversationId });
    };
  }, [socket, conversationId]);

  // Listen for events
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message: Message) => {
      onMessageRef.current?.(message);
    };

    const handleTypingStart = (data: TypingEvent) => {
      onTypingStartRef.current?.(data);
    };

    const handleTypingStop = (data: TypingEvent) => {
      onTypingStopRef.current?.(data);
    };

    const handleUserStatus = (data: { userId: string; status: string }) => {
      onUserStatusRef.current?.(data);
    };

    socket.on("message:receive", handleMessage);
    socket.on("typing:start", handleTypingStart);
    socket.on("typing:stop", handleTypingStop);
    socket.on("user:status", handleUserStatus);

    return () => {
      socket.off("message:receive", handleMessage);
      socket.off("typing:start", handleTypingStart);
      socket.off("typing:stop", handleTypingStop);
      socket.off("user:status", handleUserStatus);
    };
  }, [socket]);

  const sendMessage = useCallback(
    (content: string) => {
      if (!socket || !conversationId || !content.trim()) return;
      socket.emit("message:send", { conversationId, content: content.trim() });
    },
    [socket, conversationId],
  );

  const startTyping = useCallback(() => {
    if (!socket || !conversationId) return;
    socket.emit("typing:start", { conversationId });
  }, [socket, conversationId]);

  const stopTyping = useCallback(() => {
    if (!socket || !conversationId) return;
    socket.emit("typing:stop", { conversationId });
  }, [socket, conversationId]);

  const markAsRead = useCallback(
    (messageId: string) => {
      if (!socket || !conversationId) return;
      socket.emit("message:read", { conversationId, messageId });
    },
    [socket, conversationId],
  );

  return {
    isConnected,
    sendMessage,
    startTyping,
    stopTyping,
    markAsRead,
  };
}

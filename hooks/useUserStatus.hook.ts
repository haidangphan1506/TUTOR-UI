"use client";

import { useCallback } from "react";
import { useSocket } from "@/components/providers/socket.provider";

export function useUserStatus() {
  const { socket, onlineUsers } = useSocket();

  const isOnline = useCallback(
    (userId: string): boolean => {
      return onlineUsers.has(userId);
    },
    [onlineUsers],
  );

  const getOnlineUsers = useCallback((): string[] => {
    return Array.from(onlineUsers);
  }, [onlineUsers]);

  const checkUserStatus = useCallback(
    (userId: string): "online" | "offline" => {
      return onlineUsers.has(userId) ? "online" : "offline";
    },
    [onlineUsers],
  );

  return {
    onlineUsers,
    isOnline,
    getOnlineUsers,
    checkUserStatus,
  };
}

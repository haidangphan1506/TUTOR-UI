"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios/client";

export type ConversationParticipant = {
  userId: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  role: string;
  joinedAt: string;
};

export type ConversationMessage = {
  id: string;
  senderId: string;
  content: string;
  status: "SENT" | "DELIVERED" | "READ";
  createdAt: string;
};

export type Conversation = {
  id: string;
  type: "DIRECT" | "GROUP" | "CLASS";
  name: string | null;
  classId: string | null;
  createdBy: string;
  lastMessageAt: string | null;
  createdAt: string;
  participants: ConversationParticipant[];
  lastMessage: ConversationMessage | null;
  unreadCount: number;
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  status: "SENT" | "DELIVERED" | "READ";
  createdAt: string;
};

export function useConversations() {
  return useQuery<Conversation[]>({
    queryKey: ["conversations"],
    queryFn: async () => {
      const response = await axiosInstance.get("/chat/conversations");
      return response.data.data;
    },
  });
}

export function useConversation(conversationId: string | null) {
  return useQuery<Conversation>({
    queryKey: ["conversations", conversationId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/chat/conversations/${conversationId}`);
      return response.data.data;
    },
    enabled: !!conversationId,
  });
}

export function useMessages(conversationId: string | null, limit = 50) {
  return useQuery<Message[]>({
    queryKey: ["messages", conversationId, limit],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/chat/conversations/${conversationId}/messages?limit=${limit}`,
      );
      return response.data.data;
    },
    enabled: !!conversationId,
  });
}

export function useCreateDirectConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (targetUserId: string) => {
      const response = await axiosInstance.post("/chat/conversations/direct", {
        targetUserId,
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}

export function useCreateGroupConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, participantIds }: { name: string; participantIds: string[] }) => {
      const response = await axiosInstance.post("/chat/conversations/group", {
        name,
        participantIds,
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (conversationId: string) => {
      await axiosInstance.post(`/chat/conversations/${conversationId}/read`);
    },
    onSuccess: (_, conversationId) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
    },
  });
}

export function useUnreadCounts() {
  return useQuery<Record<string, number>>({
    queryKey: ["unread-counts"],
    queryFn: async () => {
      const response = await axiosInstance.get("/chat/unread");
      return response.data.data;
    },
  });
}

export type ChatableUser = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  role: string;
  hasConversation: boolean;
};

export function useChatableUsers() {
  return useQuery<ChatableUser[]>({
    queryKey: ["chatable-users"],
    queryFn: async () => {
      const response = await axiosInstance.get("/chat/users");
      return response.data.data;
    },
  });
}

"use client";

import { useAuth as useAuthContext } from "@/components/providers/auth.provider";

/** Cùng context với `AuthProvider` — `isAuthenticated` chỉ true sau khi token được API xác nhận. */
export const useAuth = () => {
  const { isAuthenticated } = useAuthContext();
  return { isAuthenticated };
};

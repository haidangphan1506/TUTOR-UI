"use client";

import { useMemo } from "react";

import { useAuthStore } from "@/zustand/auth.store";

/** Decodes the JWT access token and returns the user ID (sub claim), or null if not authenticated. */
export function useCurrentUserId(): string | null {
  const accessToken = useAuthStore((s) => s.accessToken);
  const role = useAuthStore((s) => s.user?.role);
  return useMemo(() => {
    if (!accessToken || !role) return null;
    try {
      const payload = accessToken.split(".")[1];
      if (!payload) return null;
      const decoded = JSON.parse(atob(payload)) as { sub?: string };
      return decoded.sub ?? null;
    } catch {
      return null;
    }
  }, [accessToken, role]);
}

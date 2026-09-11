import type { StateStorage } from "zustand/middleware";

const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

/** Tránh đụng `localStorage` khi bundle chạy trên server (Next.js). */
export const safeStorage: StateStorage =
  typeof window !== "undefined" ? window.localStorage : noopStorage;

"use client";

import { useEffect, useSyncExternalStore } from "react";

type PersistedStore = {
  persist: {
    rehydrate: () => Promise<void> | void;
    hasHydrated: () => boolean;
    onFinishHydration: (listener: () => void) => () => void;
  };
};

/**
 * Stores dùng `skipHydration: true` để tránh SSR/CSR mismatch (localStorage
 * không tồn tại ở server, nên hydrate tự động lúc module load có thể khiến
 * lần render đầu tiên trên client lệch với HTML server đã render).
 *
 * Gọi hook này **một lần** ở component bootstrap (`AuthProvider`, mount ở
 * root layout) để chủ động kích hoạt rehydrate trong `useEffect` — chỉ chạy
 * trên client, sau lần render đầu.
 */
export function useHydrateOnMount(store: PersistedStore): void {
  useEffect(() => {
    void store.persist.rehydrate();
  }, [store]);
}

/**
 * Đọc trạng thái hydrate (đã rehydrate xong hay chưa) một cách reactive — dùng
 * ở bất kỳ nơi nào cần biết store đã sẵn sàng (vd `useAuth()` tránh redirect
 * sớm khi token thật ra đã có trong localStorage nhưng chưa kịp rehydrate).
 * Không tự trigger rehydrate — chỉ đọc, việc kích hoạt do `useHydrateOnMount`
 * đảm nhiệm ở nơi khác.
 */
export function useHasHydrated(store: PersistedStore): boolean {
  return useSyncExternalStore(
    store.persist.onFinishHydration,
    store.persist.hasHydrated,
    () => false,
  );
}

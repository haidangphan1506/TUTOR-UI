import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { DEVTOOLS_CONNECTION_NAME } from "./devtools";
import { safeStorage } from "./storage";

export type GlobalState = {
  light: boolean;
  usageGuideState: boolean;
};

export type GlobalActions = {
  toggleTheme: (light: boolean) => void;
  toggleUsageGuide: (usageGuideState: boolean) => void;
};

export const useGlobalStore = create<GlobalState & GlobalActions>()(
  devtools(
    persist(
      (set) => ({
        light: true,
        usageGuideState: true,
        toggleTheme: (light) => set({ light }, false, "global/toggleTheme"),
        toggleUsageGuide: (usageGuideState) =>
          set({ usageGuideState }, false, "global/toggleUsageGuide"),
      }),
      {
        name: "global-store",
        storage: createJSONStorage(() => safeStorage),
        partialize: (state) => ({ usageGuideState: state.usageGuideState }),
        skipHydration: true,
      },
    ),
    {
      name: DEVTOOLS_CONNECTION_NAME,
      store: "global",
      enabled: process.env.NODE_ENV !== "production",
    },
  ),
);

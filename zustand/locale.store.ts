import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { DEFAULT_LANGUAGE, type Language } from "@/types";
import { DEVTOOLS_CONNECTION_NAME } from "./devtools";
import { safeStorage } from "./storage";

export type LocaleState = {
  language: Language;
};

export type LocaleActions = {
  setLanguage: (language: Language) => void;
};

export const useLocaleStore = create<LocaleState & LocaleActions>()(
  devtools(
    persist(
      (set) => ({
        language: DEFAULT_LANGUAGE,
        setLanguage: (language) =>
          set({ language }, false, "locale/setLanguage"),
      }),
      {
        name: "locale-store",
        storage: createJSONStorage(() => safeStorage),
        partialize: (state) => ({ language: state.language }),
        skipHydration: true,
      },
    ),
    {
      name: DEVTOOLS_CONNECTION_NAME,
      store: "locale",
      enabled: process.env.NODE_ENV !== "production",
    },
  ),
);

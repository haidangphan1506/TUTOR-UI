"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

export const THEME_STORAGE_KEY = "theme-preference";

export type ThemePreference = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: ThemePreference;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => {},
});

/** @internal exported for testing */
export function readStoredTheme(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);

    if (raw === "light" || raw === "dark" || raw === "system") {
      return raw;
    }
  } catch {
    //
  }

  return "system";
}

function resolveTheme(theme: ThemePreference): "light" | "dark" {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  return theme;
}

function applyDom(theme: ThemePreference): "light" | "dark" {
  const resolved = resolveTheme(theme);

  document.documentElement.classList.toggle("dark", resolved === "dark");

  return resolved;
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ThemePreference>("system");

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  useLayoutEffect(() => {
    const stored = readStoredTheme();

    setTimeout(() => {
      setThemeState(stored);
    }, 0);
    setTimeout(() => {
      setResolvedTheme(applyDom(stored));
    }, 0);
  }, []);

  useEffect(() => {
    if (theme !== "system") {
      return;
    }

    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    const onChange = () => {
      setResolvedTheme(applyDom("system"));
    };

    mql.addEventListener("change", onChange);

    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, [theme]);

  const setTheme = useCallback((next: ThemePreference) => {
    setThemeState(next);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      //
    }

    setResolvedTheme(applyDom(next));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  DEFAULT_COLOR_THEME_ID,
  applyColorThemeVars,
  clearColorThemeVars,
  colorThemes,
  findColorTheme,
  type ColorThemeSelection,
} from "@/lib/color-themes";
import { useTheme } from "./theme.provider";

export const COLOR_THEME_STORAGE_KEY = "color-theme-preference";

type ColorThemeContextValue = {
  colorTheme: ColorThemeSelection;
  setColorTheme: (id: ColorThemeSelection) => void;
  themes: typeof colorThemes;
};

const ColorThemeContext = createContext<ColorThemeContextValue>({
  colorTheme: DEFAULT_COLOR_THEME_ID,
  setColorTheme: () => {},
  themes: colorThemes,
});

/** @internal exported for testing */
export function readStoredColorTheme(): ColorThemeSelection {
  if (typeof window === "undefined") {
    return DEFAULT_COLOR_THEME_ID;
  }

  try {
    const raw = localStorage.getItem(COLOR_THEME_STORAGE_KEY);

    if (
      raw === DEFAULT_COLOR_THEME_ID ||
      findColorTheme(raw as ColorThemeSelection)
    ) {
      return raw as ColorThemeSelection;
    }
  } catch {
    //
  }

  return DEFAULT_COLOR_THEME_ID;
}

export const ColorThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { resolvedTheme } = useTheme();
  const [colorTheme, setColorThemeState] = useState<ColorThemeSelection>(
    DEFAULT_COLOR_THEME_ID,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setColorThemeState(readStoredColorTheme());
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const theme = findColorTheme(colorTheme);

    if (!theme) {
      clearColorThemeVars();
      return;
    }

    applyColorThemeVars(theme, resolvedTheme);
  }, [colorTheme, resolvedTheme]);

  const setColorTheme = useCallback((id: ColorThemeSelection) => {
    setColorThemeState(id);

    try {
      localStorage.setItem(COLOR_THEME_STORAGE_KEY, id);
    } catch {
      //
    }
  }, []);

  const value = useMemo(
    () => ({ colorTheme, setColorTheme, themes: colorThemes }),
    [colorTheme, setColorTheme],
  );

  return (
    <ColorThemeContext.Provider value={value}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export const useColorTheme = () => useContext(ColorThemeContext);

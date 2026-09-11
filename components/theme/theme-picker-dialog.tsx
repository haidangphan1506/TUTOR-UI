"use client";

import { Check, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import { useColorTheme } from "@/components/providers/color-theme.provider";
import { useAppShellCopy } from "@/hooks/useAppShellCopy.hook";
import { cn } from "@/lib/utils";
import {
  DEFAULT_COLOR_THEME_ID,
  colorThemes,
  type ColorThemeSelection,
} from "@/lib/color-themes";

type ThemeSwatch = {
  background: string;
  muted: string;
  primary: string;
  secondary: string;
  chart1: string;
  chart2: string;
  chart3: string;
};

type ThemeCardData = {
  id: ColorThemeSelection;
  name: string;
  description: string;
  swatch: ThemeSwatch;
};

const CLOSE_ANIMATION_MS = 300;

type ThemePickerDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const ThemePickerDialog = ({
  open,
  onClose,
}: ThemePickerDialogProps) => {
  const { colorTheme, setColorTheme } = useColorTheme();
  const { themePicker } = useAppShellCopy();
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);

  const themeCards: ThemeCardData[] = useMemo(
    () => [
      {
        id: DEFAULT_COLOR_THEME_ID,
        name: themePicker.defaultName,
        description: themePicker.defaultDescription,
        swatch: {
          background: "#fff8f5",
          muted: "#f5ece7",
          primary: "#9c3e21",
          secondary: "#eae2d0",
          chart1: "#bc5637",
          chart2: "#795437",
          chart3: "#645e50",
        },
      },
      ...colorThemes.map((theme) => ({
        id: theme.id,
        name: theme.name,
        description: theme.description,
        swatch: {
          background: theme.light.background,
          muted: theme.light.muted,
          primary: theme.light.primary,
          secondary: theme.light.secondary,
          chart1: theme.light.chart1,
          chart2: theme.light.chart2,
          chart3: theme.light.chart3,
        },
      })),
    ],
    [themePicker.defaultName, themePicker.defaultDescription],
  );

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setMounted(true);
      setClosing(false);
    } else {
      setClosing(true);
    }
  }

  useEffect(() => {
    if (!closing) {
      return;
    }

    const timer = setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, CLOSE_ANIMATION_MS);

    return () => clearTimeout(timer);
  }, [closing]);

  const requestClose = () => {
    if (!closing) {
      onClose();
    }
  };

  useEffect(() => {
    if (!mounted) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const filteredCards = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      return themeCards;
    }

    return themeCards.filter(
      (card) =>
        card.name.toLowerCase().includes(q) ||
        card.description.toLowerCase().includes(q),
    );
  }, [query, themeCards]);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={themePicker.title}
    >
      <div
        className={cn(
          "absolute inset-0 bg-foreground/40 backdrop-blur-sm",
          closing
            ? "animate-out fade-out duration-300"
            : "animate-in fade-in duration-300",
        )}
        onClick={requestClose}
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative z-10 flex h-full w-full max-w-lg flex-col border-l border-border/70 bg-card shadow-xl",
          closing
            ? "animate-out slide-out-to-right duration-300"
            : "animate-in slide-in-from-right duration-300",
        )}
      >
        <div className="flex items-start justify-between gap-3 border-b border-border/70 p-5">
          <div className="space-y-1">
            <h2 className="section-title">{themePicker.title}</h2>
            <p className="text-xs text-muted-foreground">
              {themePicker.subtitle}
            </p>
          </div>
          <button
            type="button"
            aria-label={themePicker.closeDialog}
            onClick={requestClose}
            className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          <label className="flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm text-muted-foreground">
            <Search className="size-4 shrink-0" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={themePicker.searchPlaceholder}
              className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            {filteredCards.map((card) => {
              const isSelected = colorTheme === card.id;

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setColorTheme(card.id)}
                  className={cn(
                    "relative flex flex-col gap-2 rounded-xl border p-2.5 text-left transition-colors hover:border-primary/60",
                    isSelected
                      ? "border-primary ring-1 ring-primary"
                      : "border-border/70",
                  )}
                >
                  {isSelected ? (
                    <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3" />
                    </span>
                  ) : null}

                  <div
                    className="space-y-2 rounded-lg border border-black/5 p-2"
                    style={{ backgroundColor: card.swatch.background }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="size-8 shrink-0 rounded-md"
                        style={{ backgroundColor: card.swatch.muted }}
                      />
                      <div className="flex flex-1 flex-col gap-1.5">
                        <span
                          className="h-2.5 w-3/4 rounded-full"
                          style={{ backgroundColor: card.swatch.primary }}
                        />
                        <span
                          className="h-2.5 w-1/2 rounded-full"
                          style={{ backgroundColor: card.swatch.secondary }}
                        />
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <span
                        className="h-2.5 flex-1 rounded-full"
                        style={{ backgroundColor: card.swatch.chart1 }}
                      />
                      <span
                        className="h-2.5 flex-1 rounded-full"
                        style={{ backgroundColor: card.swatch.chart2 }}
                      />
                      <span
                        className="h-2.5 flex-1 rounded-full"
                        style={{ backgroundColor: card.swatch.chart3 }}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {card.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border/70 bg-muted/30 px-5 py-3 text-xs">
          <span className="text-muted-foreground">
            {themePicker.footerBy}{" "}
            <span className="font-semibold text-primary">TweakCN</span>
          </span>
          <span className="text-muted-foreground">
            {themePicker.footerSaved}
          </span>
        </div>
      </div>
    </div>,
    document.body,
  );
};

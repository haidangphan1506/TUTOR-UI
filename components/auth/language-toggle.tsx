"use client";

import { useLocale } from "@/hooks/useLocale.hook";
import { cn } from "@/lib/utils";
import type { Language } from "@/types";

const languageToggleCopy: Record<Language, { code: string; label: string }> = {
  vi: { code: "VI", label: "Tiếng Việt" },
  en: { code: "EN", label: "English" },
};

const languageOrder: Language[] = ["vi", "en"];

export function LanguageToggle() {
  const { language, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Chuyển ngôn ngữ / Switch language"
      className="inline-flex items-center gap-0.5 rounded-full bg-muted p-1 text-xs font-semibold"
    >
      {languageOrder.map((lang) => {
        const active = language === lang;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLocale(lang)}
            aria-pressed={active}
            title={languageToggleCopy[lang].label}
            className={cn(
              "rounded-full px-2.5 py-1 transition",
              active
                ? "bg-white text-primary shadow-sm dark:bg-card"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {languageToggleCopy[lang].code}
          </button>
        );
      })}
    </div>
  );
}

export default LanguageToggle;

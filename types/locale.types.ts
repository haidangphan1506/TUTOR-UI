/** Kept in sync with backend `SUPPORTED_LANGUAGES` (packages/guards/language.guard.ts). */
export const SUPPORTED_LANGUAGES = ["vi", "en"] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "vi";

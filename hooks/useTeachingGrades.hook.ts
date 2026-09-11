"use client";

import { useState, useCallback } from "react";

const STORAGE_KEY = "teaching-grade-ids";

function readStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function useTeachingGrades() {
  const [selectedIds, setSelectedIds] = useState<string[]>(readStorage);

  const toggle = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((g) => g !== id)
        : [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const setAll = useCallback((ids: string[]) => {
    setSelectedIds(ids);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, []);

  return { selectedIds, toggle, setAll };
}

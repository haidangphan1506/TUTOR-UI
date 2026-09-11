"use client";

import { useDashboardCopy } from "@/hooks/useDashboardCopy.hook";
import type { DashboardDictionary } from "@/lib/i18n/dashboard.dictionary";

const CATEGORY_META = [
  { key: "foodAndDining", amount: 920, color: "#e8743b", percent: 26 },
  { key: "housing", amount: 1200, color: "#3b82f6", percent: 34 },
  { key: "transport", amount: 380, color: "#06b6d4", percent: 11 },
  { key: "shopping", amount: 540, color: "#8b5cf6", percent: 15 },
  { key: "entertainment", amount: 240, color: "#22c55e", percent: 7 },
  { key: "health", amount: 180, color: "#ec4899", percent: 5 },
  { key: "other", amount: 100, color: "#94a3b8", percent: 2 },
] as const satisfies ReadonlyArray<{
  key: keyof DashboardDictionary["spendingCategory"]["categories"];
  amount: number;
  color: string;
  percent: number;
}>;

export const SpendingCategoryCard = () => {
  const copy = useDashboardCopy();

  return (
    <section className="rounded-xl border bg-card">
      <div className="border-b px-5 py-4">
        <h2 className="text-sm font-semibold">{copy.spendingCategory.title}</h2>
      </div>

      <div className="p-5">
        {/* Donut placeholder */}
        <div className="mb-4 flex justify-center">
          <div className="relative flex size-28 items-center justify-center rounded-full border-8 border-muted">
            <span className="text-xs font-semibold text-muted-foreground">
              {copy.spendingCategory.thisMonth}
            </span>
          </div>
        </div>

        <ul className="space-y-2">
          {CATEGORY_META.map((c) => (
            <li
              key={c.key}
              className="flex items-center justify-between text-xs"
            >
              <span className="flex items-center gap-2 text-muted-foreground">
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: c.color }}
                />
                {copy.spendingCategory.categories[c.key]}
              </span>
              <span className="font-medium tabular-nums">{c.percent}%</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

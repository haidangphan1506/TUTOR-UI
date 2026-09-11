"use client";

import { useDashboardCopy } from "@/hooks/useDashboardCopy.hook";

import { BudgetProgressItem } from "./budget-progress-item";

export const budgetItems = [
  { name: "Food & Dining", spent: 620, limit: 800, color: "#e8743b" },
  { name: "Housing", spent: 1200, limit: 1200, color: "#3b82f6" },
  { name: "Transport", spent: 290, limit: 400, color: "#06b6d4" },
  { name: "Shopping", spent: 480, limit: 500, color: "#8b5cf6" },
  { name: "Entertainment", spent: 130, limit: 200, color: "#22c55e" },
  { name: "Health", spent: 95, limit: 300, color: "#ec4899" },
  { name: "Travel", spent: 0, limit: 500, color: "#f59e0b" },
  { name: "Education", spent: 200, limit: 250, color: "#10b981" },
];

export const BudgetOverviewCard = () => {
  const copy = useDashboardCopy();

  return (
    <section className="rounded-xl border bg-card">
      <div className="border-b px-5 py-4">
        <h2 className="text-sm font-semibold">{copy.budgetOverview.title}</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 p-5 lg:grid-cols-4">
        {budgetItems.map((item) => (
          <BudgetProgressItem key={item.name} {...item} />
        ))}
      </div>
    </section>
  );
};

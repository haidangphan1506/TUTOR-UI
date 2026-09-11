"use client";

import { useDashboardCopy } from "@/hooks/useDashboardCopy.hook";

type BudgetProgressItemProps = {
  name: string;
  spent: number;
  limit: number;
  color: string;
};

export const BudgetProgressItem = ({
  name,
  spent,
  limit,
  color,
}: BudgetProgressItemProps) => {
  const copy = useDashboardCopy();
  const percent = Math.min(
    100,
    limit > 0 ? Math.round((spent / limit) * 100) : 0,
  );
  const over = spent > limit;

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium">
          <span
            className="size-2.5 rounded-full"
            style={{ backgroundColor: color }}
          />
          {name}
        </span>
        <span className="text-xs font-semibold tabular-nums" style={{ color }}>
          {percent}%
        </span>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-track">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${percent}%`,
            backgroundColor: over ? "var(--negative)" : color,
          }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground tabular-nums">
        <span>
          ${spent.toLocaleString()} {copy.budgetProgressItem.spentSuffix}
        </span>
        <span>
          ${limit.toLocaleString()} {copy.budgetProgressItem.limitSuffix}
        </span>
      </div>
    </div>
  );
};

"use client";

import { ArrowDownLeft, ArrowUpRight, PiggyBank, Wallet } from "lucide-react";

import {
  IncomeExpenseChartCard,
  SpendingCategoryCard,
  StatCard,
} from "@/components/dashboard";
import { DashboardSection } from "@/components/dashboard/dashboard-section";

const TOP_CATEGORIES = [
  { label: "Housing", amount: 1200, color: "#3b82f6" },
  { label: "Food & Dining", amount: 920, color: "#e8743b" },
  { label: "Shopping", amount: 540, color: "#8b5cf6" },
  { label: "Transport", amount: 380, color: "#06b6d4" },
  { label: "Entertainment", amount: 240, color: "#22c55e" },
];

const maxCategory = Math.max(...TOP_CATEGORIES.map((c) => c.amount));

export const AnalyticsPage = () => {
  return (
    <div className="space-y-4 pb-6">
      <div className="space-y-1">
        <h1 className="page-title">Analytics</h1>
        <p className="page-description">
          Insights into your income, spending and saving trends.
        </p>
      </div>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          title="Avg. Monthly Income"
          value="$8,040"
          change="+8.1% vs last year"
          icon={<ArrowUpRight className="size-4" />}
        />
        <StatCard
          title="Avg. Monthly Spend"
          value="$3,610"
          change="-4.3% vs last year"
          positive={false}
          icon={<ArrowDownLeft className="size-4" />}
        />
        <StatCard
          title="Avg. Savings Rate"
          value="55%"
          change="+6.2% vs last year"
          icon={<PiggyBank className="size-4" />}
        />
        <StatCard
          title="Net Cash Flow"
          value="+$4,430"
          change="Positive 11 of 12 months"
          icon={<Wallet className="size-4" />}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <IncomeExpenseChartCard />
        </div>
        <SpendingCategoryCard />
      </section>

      <DashboardSection title="Top Spending Categories" subtitle="This month">
        <ul className="space-y-3">
          {TOP_CATEGORIES.map((category) => (
            <li key={category.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-muted-foreground">
                    {category.label}
                  </span>
                </span>
                <span className="font-medium tabular-nums">
                  ${category.amount.toLocaleString()}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-track">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(category.amount / maxCategory) * 100}%`,
                    backgroundColor: category.color,
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </DashboardSection>
    </div>
  );
};

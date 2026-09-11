"use client";

import { PiggyBank, Plus, TrendingDown, Wallet } from "lucide-react";

import { StatCard } from "@/components/dashboard";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { BudgetProgressItem } from "@/components/dashboard/budget-progress-item";
import { budgetItems } from "@/components/dashboard/budget-overview-card";
import { Button } from "@/components/ui/button.ui";
import UsageGuides, {
  type UsageGuideStep,
} from "@/components/ui/usage-guide.ui";

const MONTHLY = [
  { label: "Total Budget", amount: 4200, color: "var(--primary)" },
  { label: "Spent", amount: 3460, color: "var(--negative)" },
  { label: "Remaining", amount: 740, color: "var(--positive)" },
];

const overallProgress = Math.round((3460 / 4200) * 100);

const USAGE_GUIDE_STEPS: UsageGuideStep[] = [
  {
    n: 1,
    title: "Tổng quan ngân sách",
    body: "3 thẻ ở đầu trang cho biết tổng ngân sách, số tiền đã chi và số tiền còn lại trong tháng.",
  },
  {
    n: 2,
    title: "Tiến độ chi tiêu",
    body: (
      <>
        Thanh <span className="font-semibold">Monthly Budget</span> hiển thị
        phần trăm ngân sách đã sử dụng trong tháng hiện tại.
      </>
    ),
  },
  {
    n: 3,
    title: "Ngân sách theo danh mục",
    body: "Lưới Category Budgets liệt kê giới hạn chi tiêu và mức đã dùng của từng danh mục.",
  },
  {
    n: 4,
    title: "Tạo ngân sách mới",
    body: (
      <>
        Nhấn nút <span className="font-semibold">+ New budget</span> ở góc
        trên để thiết lập một ngân sách mới.
      </>
    ),
  },
];

export const BudgetsPage = () => {
  return (
    <div className="space-y-4 pb-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="page-title">Budgets</h1>
          <p className="page-description">
            Set spending limits and track progress per category.
          </p>
        </div>
        <Button size="default" className="w-auto gap-2 px-4">
          <Plus className="size-4" />
          New budget
        </Button>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Budget"
          value="$4,200"
          change="June 2025"
          icon={<Wallet className="size-4" />}
        />
        <StatCard
          title="Spent So Far"
          value="$3,460"
          change={`${overallProgress}% of budget`}
          positive={false}
          icon={<TrendingDown className="size-4" />}
        />
        <StatCard
          title="Remaining"
          value="$740"
          change="On track"
          icon={<PiggyBank className="size-4" />}
        />
      </section>

      <DashboardSection title="Monthly Budget" subtitle="June 2025">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">$3,460 spent</span>
            <span className="font-medium tabular-nums">{overallProgress}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-track">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-4 pt-1 text-xs text-muted-foreground">
            {MONTHLY.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-2">
                <span
                  className="size-2.5 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                {item.label}: ${item.amount.toLocaleString()}
              </span>
            ))}
          </div>
        </div>
      </DashboardSection>

      <DashboardSection
        title="Category Budgets"
        subtitle="Spending limits by category"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {budgetItems.map((item) => (
            <BudgetProgressItem key={item.name} {...item} />
          ))}
        </div>
      </DashboardSection>

      <UsageGuides steps={USAGE_GUIDE_STEPS} />
    </div>
  );
};

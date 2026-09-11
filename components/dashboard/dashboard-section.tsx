import React from "react";

import { cn } from "@/lib/utils";

type DashboardSectionProps = {
  title: string;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export const DashboardSection = ({
  title,
  subtitle,
  actions,
  children,
  className,
}: DashboardSectionProps) => (
  <section className={cn("rounded-xl border bg-card", className)}>
    <div className="flex items-start justify-between gap-4 border-b px-5 py-4">
      <div>
        <h2 className="text-sm font-semibold">{title}</h2>
        {subtitle && (
          <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
    <div className="p-5">{children}</div>
  </section>
);

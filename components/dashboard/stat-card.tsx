import React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string;
  change: React.ReactNode;
  icon?: React.ReactNode;
  positive?: boolean;
  captionOnly?: boolean;
  iconClassName?: string;
  iconWrapperClassName?: string;
};

export const StatCard = ({
  title,
  value,
  change,
  icon,
  positive,
  captionOnly,
  iconClassName,
  iconWrapperClassName,
}: StatCardProps) => {
  const iconNode = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
        className: iconClassName ?? "size-3.5 text-primary",
      })
    : icon;

  const isPositive =
    positive !== undefined
      ? positive
      : typeof change === "string" && change.startsWith("+");

  const isNegative =
    positive !== undefined
      ? !positive
      : typeof change === "string" && change.startsWith("-");

  return (
    <article className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{title}</p>
        {iconNode && (
          <span
            className={cn(
              "flex size-7 items-center justify-center rounded-md bg-muted",
              iconWrapperClassName,
            )}
          >
            {iconNode}
          </span>
        )}
      </div>

      <p className="mt-3 text-2xl font-bold tabular-nums">{value}</p>

      <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
        {!captionOnly && isPositive && (
          <TrendingUp
            data-testid="trending-up"
            className="size-3.5 text-positive"
          />
        )}
        {!captionOnly && isNegative && (
          <TrendingDown
            data-testid="trending-down"
            className="size-3.5 text-negative"
          />
        )}
        <span
          className={cn(
            captionOnly
              ? "text-muted-foreground"
              : isPositive
                ? "text-positive"
                : isNegative
                  ? "text-negative"
                  : "text-muted-foreground",
          )}
        >
          {change}
        </span>
      </div>
    </article>
  );
};

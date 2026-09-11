"use client";

import { AlertTriangle, Bell, ChevronDown, ChevronUp } from "lucide-react";
import { Fragment, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/zustand/global.store";

export type UsageGuideStep = {
  n: number;
  title: string;
  body: ReactNode;
};

export type UsageGuidesProps = {
  title?: string;
  steps: UsageGuideStep[];
  warning?: ReactNode;
};

const UsageGuides = ({
  title = "Hướng dẫn sử dụng",
  steps,
  warning,
}: UsageGuidesProps) => {
  const usageGuideState = useGlobalStore((s) => s.usageGuideState);
  const toggleUsageGuide = useGlobalStore((s) => s.toggleUsageGuide);

  return (
    <div className="fixed inset-x-4 bottom-4 z-40">
      {/* Guide card */}
      <div className="rounded-xl border border-[#E7EEEC] bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between gap-2">
          <Fragment>
            <span className="flex size-6 items-center justify-center rounded-full border-2 border-[#0E9F8E]/40">
              <Bell className="size-3 text-[#0E9F8E]" />
            </span>
            <h3 className="font-semibold text-[#16302b]">{title}</h3>
          </Fragment>

          <button
            type="button"
            onClick={() => toggleUsageGuide(!usageGuideState)}
            aria-label={
              usageGuideState
                ? "Đóng hướng dẫn sử dụng"
                : "Mở hướng dẫn sử dụng"
            }
            className="rounded-md p-0.5 text-[#9AAEA9] hover:bg-[#F3F7F5] hover:text-[#16302b] transition-colors"
          >
            {usageGuideState ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
        </div>

        {/* Steps (collapsible) */}
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-in-out",
            usageGuideState ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <div
              className={cn(
                "grid grid-cols-1 gap-5 pb-1 transition-opacity duration-200 ease-in-out sm:grid-cols-2 lg:grid-cols-4",
                usageGuideState ? "opacity-100 delay-100" : "opacity-0",
              )}
            >
              {steps.map(({ n, title: stepTitle, body }) => (
                <div key={n} className="flex gap-3">
                  <span
                    className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: "#0E9F8E" }}
                  >
                    {n}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#16302b]">
                      {stepTitle}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#16302b]">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Warning notice - always visible regardless of steps toggle */}
        {warning && (
          <div
            className={cn(
              "flex items-start gap-3 rounded-xl border border-[#FF7A45]/30 bg-[#FFF0E6] px-4 py-3.5",
              usageGuideState && "mt-4",
            )}
          >
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[#FF7A45]" />
            <p className="text-sm leading-relaxed text-[#16302b]">
              {warning}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsageGuides;

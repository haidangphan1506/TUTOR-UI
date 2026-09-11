"use client";

import { Check } from "lucide-react";

import { useClassFormCopy } from "@/hooks/useClassFormCopy.hook";

const BRAND = "#0E9F8E";

type Step = 1 | 2 | 3;

export const CreateClassStepper = ({ current }: { current: Step }) => {
  const copy = useClassFormCopy();
  const steps: { step: Step; label: string }[] = [
    { step: 1, label: copy.create.stepper.info },
    { step: 2, label: copy.create.stepper.formatCurriculum },
    { step: 3, label: copy.create.stepper.scheduleTuition },
  ];

  return (
    <div className="flex items-center justify-center overflow-x-auto">
      {steps.map((s, i) => (
        <div key={s.step} className="flex items-center">
          <div className="flex items-center gap-2">
            {/* circle */}
            <div
              className="flex size-8 items-center justify-center rounded-full text-sm font-semibold transition-colors"
              style={
                s.step <= current
                  ? { background: BRAND, color: "#fff" }
                  : { background: "#F3F7F5", color: "#9AAEA9" }
              }
            >
              {s.step < current ? <Check className="size-4" /> : s.step}
            </div>
            {/* label */}
            <span
              className="text-sm whitespace-nowrap"
              style={
                s.step === current
                  ? { fontWeight: 600, color: "#16302b" }
                  : s.step < current
                    ? { color: BRAND }
                    : { color: "#9AAEA9" }
              }
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className="mx-3 h-px w-10 shrink-0 transition-colors sm:w-16 md:w-15"
              style={{ background: s.step < current ? BRAND : "#E7EEEC" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

"use client";

import { useCallback, useId, useRef, useState } from "react";
import type { ClipboardEvent, ComponentProps, KeyboardEvent } from "react";

import { cn } from "@/lib/utils";

export type OtpInputProps = Omit<
  ComponentProps<"div">,
  "onChange" | "defaultValue"
> & {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  "aria-label"?: string;
};

export const onlyDigits = (s: string, maxLen: number) => {
  return s.replace(/\D/g, "").slice(0, maxLen);
};

export function OtpInput({
  length = 6,
  value: valueProp,
  defaultValue = "",
  onChange,
  onComplete,
  disabled,
  className,
  id: idProp,
  "aria-label": ariaLabel = "One-time code",
  ...props
}: OtpInputProps) {
  const autoId = useId();
  const groupId = idProp ?? `otp-${autoId}`;
  const isControlled = valueProp !== undefined;
  const [inner, setInner] = useState(() => onlyDigits(defaultValue, length));
  const digits = isControlled ? onlyDigits(valueProp ?? "", length) : inner;

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const setDigits = useCallback(
    (next: string) => {
      const clean = onlyDigits(next, length);
      if (!isControlled) setInner(clean);
      onChange?.(clean);
      if (clean.length === length) onComplete?.(clean);
    },
    [isControlled, length, onChange, onComplete],
  );

  const focusAt = useCallback(
    (i: number) => {
      const el = inputsRef.current[Math.max(0, Math.min(i, length - 1))];
      queueMicrotask(() => el?.focus());
    },
    [length],
  );

  const handleChange = useCallback(
    (index: number, raw: string) => {
      const nums = onlyDigits(raw, length);
      if (nums.length === 0) {
        const next = `${digits.slice(0, index)}${digits.slice(index + 1)}`;
        setDigits(next);
        return;
      }
      const d = nums.slice(-1);
      const next = onlyDigits(
        `${digits.slice(0, index)}${d}${digits.slice(index + 1)}`,
        length,
      );
      setDigits(next);
      if (d && index < length - 1) focusAt(index + 1);
    },
    [digits, length, setDigits, focusAt],
  );

  const onKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (digits[index]) return;
        e.preventDefault();
        if (index > 0) {
          const next = `${digits.slice(0, index - 1)}${digits.slice(index)}`;
          setDigits(next);
          focusAt(index - 1);
        }
      }
      if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        focusAt(index - 1);
      }
      if (e.key === "ArrowRight" && index < length - 1) {
        e.preventDefault();
        focusAt(index + 1);
      }
    },
    [digits, length, setDigits, focusAt],
  );

  const onPasteGroup = useCallback(
    (e: ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      const text = onlyDigits(e.clipboardData.getData("text"), length);
      if (!text) return;
      setDigits(text);
      focusAt(Math.min(text.length, length - 1));
    },
    [length, setDigits, focusAt],
  );

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      id={groupId}
      data-slot="otp-input"
      onPaste={onPasteGroup}
      className={cn("flex w-full justify-center gap-2 sm:gap-2.5", className)}
      {...props}
    >
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          disabled={disabled}
          aria-label={`Digit ${i + 1} of ${length}`}
          className={cn(
            "size-11 rounded-xl border border-input bg-surface-container-lowest text-center font-label text-lg font-semibold tabular-nums text-foreground outline-none transition-colors",
            "focus:border-primary focus:ring-1 focus:ring-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "sm:size-12 sm:text-xl",
          )}
          value={digits[i] ?? ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
        />
      ))}
    </div>
  );
}

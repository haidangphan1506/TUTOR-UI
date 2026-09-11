"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ComponentProps, ReactNode, Ref } from "react";

function applyRef<T>(ref: Ref<T | null> | undefined, instance: T | null): void {
  if (!ref) return;
  if (typeof ref === "function") ref(instance);
  else (ref as { current: T | null }).current = instance;
}
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input.ui";
import { Label } from "@/components/ui/label.ui";
import { Separator } from "@/components/ui/separator.ui";

function FieldSet({ className, ...props }: ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className,
      )}
      {...props}
    />
  );
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base",
        className,
      )}
      {...props}
    />
  );
}

function FieldGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
        className,
      )}
      {...props}
    />
  );
}

const fieldVariants = cva(
  "group/field flex w-full flex flex-row gap-2 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
        horizontal:
          "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        responsive:
          "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  },
);

function Field({
  className,
  orientation = "vertical",
  ...props
}: ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}

function FieldContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-0.5 leading-snug",
        className,
      )}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

function FieldTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-left text-sm leading-normal font-normal text-muted-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
        "last:mt-0 nth-last-2:-mt-1",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className,
      )}
      {...props}
    />
  );
}

function FieldSeparator({
  children,
  className,
  ...props
}: ComponentProps<"div"> & {
  children?: ReactNode;
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className,
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="relative mx-auto block w-fit bg-card px-3 font-label text-[10px] font-semibold tracking-wide text-muted-foreground lowercase"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  );
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ];

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>,
        )}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-sm font-normal text-destructive", className)}
      {...props}
    >
      {content}
    </div>
  );
}

/* —— MUI-style OutlinedField (TextField variant="outlined") —— */

const outlinedFieldInputClass = cn(
  "h-auto min-h-0 w-full border-0 bg-transparent py-0 text-sm leading-5 shadow-none ring-0 outline-none dark:bg-transparent",
  "focus-visible:border-0 focus-visible:ring-0 placeholder:text-muted-foreground",
);

type OutlinedFieldContextValue = {
  inputId: string;
  shrink: boolean;
  setHasValue: (v: boolean) => void;
  disabled: boolean;
  invalid: boolean;
};

const OutlinedFieldContext = createContext<OutlinedFieldContextValue | null>(
  null,
);

function useOutlinedFieldContext() {
  const ctx = useContext(OutlinedFieldContext);
  if (!ctx) {
    throw new Error(
      "OutlinedField subcomponents must be used within <OutlinedField>.",
    );
  }
  return ctx;
}

type OutlinedFieldProps = ComponentProps<"div"> & {
  /** Validation: destructive border/ring on this shell only + aria-invalid on input */
  invalid?: boolean;
  disabled?: boolean;
  /** When true, label starts in "shrunk" position (e.g. prefilled read-only) */
  defaultShrink?: boolean;
};

/**
 * Outlined text field shell: border on the wrapper, floating label (MUI
 * `TextField` `variant="outlined"`). Label shrinks to the top notch when the
 * control is focused or has a value.
 */
function OutlinedField({
  className,
  invalid = false,
  disabled = false,
  defaultShrink = false,
  children,
  onFocusCapture,
  onBlurCapture,
  ...rest
}: OutlinedFieldProps) {
  const inputId = useId();
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(defaultShrink);

  const shrink = focused || hasValue;

  const setHasValueStable = useCallback((v: boolean) => {
    setHasValue(v);
  }, []);

  const ctx = useMemo<OutlinedFieldContextValue>(
    () => ({
      inputId,
      shrink,
      setHasValue: setHasValueStable,
      disabled,
      invalid,
    }),
    [inputId, shrink, setHasValueStable, disabled, invalid],
  );

  return (
    <OutlinedFieldContext.Provider value={ctx}>
      <div
        role="group"
        data-slot="outlined-field"
        data-shrink={shrink ? "true" : undefined}
        data-invalid={invalid ? "true" : undefined}
        data-disabled={disabled ? "true" : undefined}
        {...rest}
        onFocusCapture={(e) => {
          onFocusCapture?.(e);
          setFocused(true);
        }}
        onBlurCapture={(e) => {
          onBlurCapture?.(e);
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setFocused(false);
          }
        }}
        className={cn(
          "group/outlined-field relative border border-solid border-input bg-surface-container-lowest transition-[border-color,box-shadow] duration-200 ease-out",
          "focus-within:border-primary focus-within:ring-1 focus-within:ring-primary",
          invalid &&
            "border-destructive ring-1 ring-destructive/30 focus-within:border-destructive focus-within:ring-2 focus-within:ring-destructive/35",
          disabled && "pointer-events-none opacity-50",
          className,
        )}
      >
        {children}
      </div>
    </OutlinedFieldContext.Provider>
  );
}

type OutlinedFieldLabelProps = ComponentProps<"label"> & {
  /** Shift label right when a start adornment (icon) is used */
  startAdorned?: boolean;
};

function OutlinedFieldLabel({
  className,
  children,
  startAdorned,
  ...props
}: OutlinedFieldLabelProps) {
  const { inputId, shrink } = useOutlinedFieldContext();

  return (
    <label
      htmlFor={inputId}
      data-slot="outlined-field-label"
      className={cn(
        "pointer-events-none absolute z-20 origin-top-left bg-surface-container-lowest px-1.5 font-label transition-[top,transform,font-size,font-weight,color,letter-spacing] duration-200 ease-out",
        startAdorned ? "left-10" : "left-3",
        shrink
          ? "top-0 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-wider text-primary"
          : "top-1/2 -translate-y-1/2 text-[15px] leading-5 font-normal tracking-normal text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}

function OutlinedFieldControl({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="outlined-field-control"
      className={cn("relative flex items-center px-3 py-3", className)}
      {...props}
    />
  );
}

function OutlinedFieldStart({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="outlined-field-start"
      className={cn(
        "pointer-events-none absolute left-3 top-1/2 z-1 flex -translate-y-1/2 items-center text-muted-foreground transition-colors group-focus-within/outlined-field:text-primary",
        className,
      )}
      {...props}
    />
  );
}

function OutlinedFieldEnd({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="outlined-field-end"
      className={cn(
        "absolute right-3 top-1/2 z-1 flex -translate-y-1/2 items-center",
        className,
      )}
      {...props}
    />
  );
}

type OutlinedFieldInputProps = ComponentProps<typeof Input>;

const OutlinedFieldInput = forwardRef<
  HTMLInputElement,
  OutlinedFieldInputProps
>(function OutlinedFieldInput(
  {
    className,
    placeholder,
    onChange,
    value,
    defaultValue,
    disabled: disabledProp,
    "aria-invalid": ariaInvalid,
    ...rest
  },
  ref,
) {
  const {
    inputId,
    shrink,
    setHasValue,
    disabled: ctxDisabled,
    invalid,
  } = useOutlinedFieldContext();
  const innerRef = useRef<HTMLInputElement>(null);
  const disabled = disabledProp ?? ctxDisabled;

  const { ref: incomingRef, ...props } = rest as typeof rest & {
    ref?: Ref<HTMLInputElement | null>;
  };

  const assignRef = useCallback(
    (node: HTMLInputElement | null) => {
      innerRef.current = node;
      applyRef(ref, node);
      applyRef(incomingRef, node);
    },
    [ref, incomingRef],
  );

  useLayoutEffect(() => {
    applyRef(incomingRef, innerRef.current);
  }, [incomingRef]);

  useLayoutEffect(() => {
    const v = innerRef.current?.value;
    setHasValue(!!v && v.length > 0);
  }, [setHasValue]);

  useEffect(() => {
    if (value === undefined) return;
    setHasValue(String(value).length > 0);
  }, [value, setHasValue]);

  const showPlaceholder = shrink ? placeholder : undefined;

  return (
    <Input
      ref={assignRef}
      id={inputId}
      outlinedSlot
      disabled={disabled}
      aria-invalid={invalid ? true : ariaInvalid}
      placeholder={showPlaceholder}
      value={value}
      defaultValue={defaultValue}
      className={cn(outlinedFieldInputClass, className)}
      {...props}
      onChange={(e) => {
        setHasValue(e.target.value.length > 0);
        onChange?.(e);
      }}
    />
  );
});

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
  OutlinedField,
  OutlinedFieldLabel,
  OutlinedFieldControl,
  OutlinedFieldStart,
  OutlinedFieldEnd,
  OutlinedFieldInput,
};

"use client";

import { useState } from "react";
import { Pencil, Plus, Save } from "lucide-react";

import { Dialog } from "@/components/ui/dialog-form.ui";
import { Input } from "@/components/ui/input.ui";
import { useAccountsCopy } from "@/hooks/useAccountsCopy.hook";
import { useCommonCopy } from "@/hooks/useCommonCopy.hook";
import { cn } from "@/lib/utils";
import {
  DEFAULT_ACCOUNT_FORM,
  WALLET_TYPE_COLOR,
  WALLET_TYPES,
  type Account,
  type AccountFormValues,
  type WalletApiType,
} from "./accounts.data";

type WalletFormDialogProps = {
  open: boolean;
  mode: "add" | "edit";
  initial?: Account | null;
  onClose: () => void;
  onSubmit: (values: AccountFormValues) => void;
  isLoading?: boolean;
};

export const WalletFormDialog = ({
  open,
  mode,
  initial,
  onClose,
  onSubmit,
  isLoading = false,
}: WalletFormDialogProps) => {
  const copy = useAccountsCopy();
  const commonCopy = useCommonCopy();
  const [values, setValues] = useState<AccountFormValues>(() =>
    initial
      ? {
          name: initial.name,
          type: initial.type,
          balance: initial.balance,
          currency: initial.currency,
          note: initial.note ?? "",
          isDefault: initial.isDefault ?? false,
        }
      : DEFAULT_ACCOUNT_FORM,
  );
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof AccountFormValues>(
    key: K,
    value: AccountFormValues[K],
  ) => setValues((prev) => ({ ...prev, [key]: value }));

  const submit = () => {
    if (!values.name.trim()) {
      setError(copy.form.errors.nameRequired);
      return;
    }
    if (values.balance < 0) {
      setError(copy.form.errors.balanceNegative);
      return;
    }
    if (!values.currency || values.currency.length !== 3) {
      setError(copy.form.errors.currencyInvalid);
      return;
    }
    onSubmit({
      ...values,
      name: values.name.trim(),
      currency: values.currency.toUpperCase(),
    });
  };

  return (
    <Dialog
      isOpen={open}
      icon={mode === "add" ? Plus : Pencil}
      title={mode === "add" ? copy.form.addTitle : copy.form.editTitle}
      subtitle={mode === "add" ? copy.form.addSubtitle : copy.form.editSubtitle}
      cancelText={commonCopy.actions.cancel}
      onCancel={onClose}
      submitText={
        isLoading
          ? copy.form.saving
          : mode === "add"
            ? commonCopy.actions.create
            : copy.form.saveChanges
      }
      submitIcon={mode === "add" ? Plus : Save}
      onSubmit={submit}
      loading={isLoading}
    >
      <form
        id="wallet-form"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
        className="space-y-4"
      >
        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="wallet-name" className="text-sm font-medium">
            {copy.form.nameLabel}
          </label>
          <Input
            id="wallet-name"
            value={values.name}
            onChange={(e) => {
              setError(null);
              update("name", e.target.value);
            }}
            placeholder={copy.form.namePlaceholder}
            invalid={Boolean(error && !values.name.trim())}
            autoFocus
          />
          {error ? <p className="text-xs text-destructive">{error}</p> : null}
        </div>

        {/* Type */}
        <div className="space-y-1.5">
          <span className="text-sm font-medium">{copy.form.typeLabel}</span>
          <div className="grid grid-cols-2 gap-2">
            {WALLET_TYPES.map((type) => {
              const active = values.type === type;
              const color = WALLET_TYPE_COLOR[type];
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => update("type", type as WalletApiType)}
                  className={cn(
                    "h-10 rounded-md border text-sm font-medium transition-colors",
                    active
                      ? "border-[var(--t-color)] text-[var(--t-color)]"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                  style={
                    active
                      ? ({
                          "--t-color": color,
                          backgroundColor: `${color}18`,
                        } as React.CSSProperties)
                      : undefined
                  }
                >
                  {copy.walletTypes[type]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Balance + Currency */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label htmlFor="wallet-balance" className="text-sm font-medium">
              {copy.form.balanceLabel}
            </label>
            <Input
              id="wallet-balance"
              type="number"
              min={0}
              step="any"
              value={values.balance}
              onChange={(e) => update("balance", Number(e.target.value))}
              placeholder="0"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="wallet-currency" className="text-sm font-medium">
              {copy.form.currencyLabel}
            </label>
            <Input
              id="wallet-currency"
              value={values.currency}
              onChange={(e) =>
                update("currency", e.target.value.toUpperCase().slice(0, 3))
              }
              placeholder="VND"
              maxLength={3}
            />
          </div>
        </div>

        {/* Note */}
        <div className="space-y-1.5">
          <label htmlFor="wallet-note" className="text-sm font-medium">
            {copy.form.noteLabel}{" "}
            <span className="text-muted-foreground">
              {copy.form.noteOptional}
            </span>
          </label>
          <textarea
            id="wallet-note"
            value={values.note}
            onChange={(e) => update("note", e.target.value)}
            placeholder={copy.form.notePlaceholder}
            rows={2}
            className="w-full resize-none rounded-md border border-input bg-surface-container-lowest px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary dark:bg-input/30"
          />
        </div>

        {/* isDefault */}
        <label className="flex cursor-pointer items-center gap-2.5">
          <input
            type="checkbox"
            checked={values.isDefault}
            onChange={(e) => update("isDefault", e.target.checked)}
            className="size-4 rounded border-input accent-primary"
          />
          <span className="text-sm">{copy.form.setDefault}</span>
        </label>
      </form>
    </Dialog>
  );
};

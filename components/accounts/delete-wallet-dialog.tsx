"use client";

import { AlertTriangle } from "lucide-react";

import { Dialog } from "@/components/ui/dialog-form.ui";
import { useAccountsCopy } from "@/hooks/useAccountsCopy.hook";
import { useCommonCopy } from "@/hooks/useCommonCopy.hook";
import { type Account } from "./accounts.data";

type DeleteWalletDialogProps = {
  account: Account | null;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: (account: Account) => void;
};

export const DeleteWalletDialog = ({
  account,
  isLoading = false,
  onClose,
  onConfirm,
}: DeleteWalletDialogProps) => {
  const copy = useAccountsCopy();
  const commonCopy = useCommonCopy();

  return (
    <Dialog
      isOpen={Boolean(account)}
      icon={AlertTriangle}
      title={copy.deleteDialog.title}
      subtitle={copy.deleteDialog.subtitle}
      cancelText={commonCopy.actions.cancel}
      onCancel={onClose}
      submitText={isLoading ? copy.deleteDialog.deleting : commonCopy.actions.delete}
      submitVariant="destructive"
      onSubmit={() => account && onConfirm(account)}
      loading={isLoading}
    >
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive">
          <AlertTriangle className="size-4" />
        </span>
        <p className="text-sm text-muted-foreground">
          {copy.deleteDialog.confirmPrefix}{" "}
          <span className="font-medium text-foreground">{account?.name}</span>
          {copy.deleteDialog.confirmSuffix}
        </p>
      </div>
    </Dialog>
  );
};

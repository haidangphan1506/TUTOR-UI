"use client";

import { AlertTriangle } from "lucide-react";

import { Dialog } from "@/components/ui/dialog-form.ui";
import { type Category } from "./categories.data";

type DeleteCategoryDialogProps = {
  category: Category | null;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: (category: Category) => void;
};

export const DeleteCategoryDialog = ({
  category,
  isLoading = false,
  onClose,
  onConfirm,
}: DeleteCategoryDialogProps) => {
  return (
    <Dialog
      isOpen={Boolean(category)}
      icon={AlertTriangle}
      title="Delete category"
      subtitle="This action cannot be undone."
      cancelText="Cancel"
      onCancel={onClose}
      submitText={isLoading ? "Deleting…" : "Delete"}
      submitVariant="destructive"
      onSubmit={() => category && onConfirm(category)}
      loading={isLoading}
    >
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive">
          <AlertTriangle className="size-4" />
        </span>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-medium text-foreground">{category?.name}</span>?
          Transactions using this category will need to be reassigned.
        </p>
      </div>
    </Dialog>
  );
};

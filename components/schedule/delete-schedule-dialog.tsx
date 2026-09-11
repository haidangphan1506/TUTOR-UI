"use client";

import { AlertTriangle, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Dialog } from "@/components/ui/dialog-form.ui";
import { getErrorMessage } from "@/lib/axios";
import { useSessionActions, SESSIONS_QUERY_KEY } from "@/lib/services/session.service";
import { useScheduleCopy } from "@/hooks/useScheduleCopy.hook";
import { useCommonCopy } from "@/hooks/useCommonCopy.hook";
import { useQueryClient } from "@tanstack/react-query";
import type { StudentSessionListItem } from "@/types";

type DeleteScheduleDialogProps = {
  session: StudentSessionListItem | null;
  onClose: () => void;
};

export function DeleteScheduleDialog({ session, onClose }: DeleteScheduleDialogProps) {
  const copy = useScheduleCopy();
  const common = useCommonCopy();
  const queryClient = useQueryClient();
  const { delete: del } = useSessionActions();

  const isOpen = !!session;

  const handleConfirm = () => {
    if (!session) return;

    del.mutate(session.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });
        toast.success(copy.deleteDialog.toastSuccess);
        onClose();
      },
      onError: (err) => {
        toast.error(getErrorMessage(err, copy.deleteDialog.toastError));
      },
    });
  };

  const dateStr = session ? new Date(session.startAt).toLocaleDateString("vi-VN") : "";
  const timeStr = session ? `${session.startAt ? new Date(session.startAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) : ""}` : "";

  return (
    <Dialog
      isOpen={isOpen}
      icon={AlertTriangle}
      title={copy.deleteDialog.title}
      subtitle={session ? `${session.class?.name ?? ""} — ${dateStr} ${timeStr}` : ""}
      className="max-w-md"
      cancelText={common.actions.cancel}
      onCancel={onClose}
      submitText={common.actions.delete}
      submitIcon={Trash2}
      submitVariant="destructive"
      onSubmit={handleConfirm}
      loading={del.isPending}
    >
      <div className="flex flex-col gap-3 py-2">
        <p className="text-sm text-foreground">{copy.deleteDialog.description}</p>
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3">
          <p className="text-sm text-destructive">{copy.deleteDialog.warning}</p>
        </div>
      </div>
    </Dialog>
  );
}

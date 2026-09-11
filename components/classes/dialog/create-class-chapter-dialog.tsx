"use client";

import { useMemo, useState } from "react";
import { BookOpen, Plus } from "lucide-react";
import { toast } from "sonner";

import { axiosInstance, getErrorMessage } from "@/lib/axios";
import { Dialog } from "@/components/ui/dialog-form.ui";
import { Input } from "@/components/ui/input.ui";
import { Select } from "@/components/ui/select.ui";

type Grade = { id: string; name: string; level: number };

/** Create-chapter dialog on the per-class curriculum page. */
export const CreateClassChapterDialog = ({
  grades,
  onClose,
  onCreated,
}: {
  grades: Grade[];
  onClose: () => void;
  onCreated: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [gradeId, setGradeId] = useState(grades[0]?.id ?? "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !gradeId) return;
    setSubmitting(true);
    try {
      await axiosInstance.post("/curriculum", { title: title.trim(), gradeId });
      toast.success("Đã tạo chương mới");
      onCreated();
      onClose();
    } catch (err) {
      toast.error(getErrorMessage(err, "Tạo chương thất bại"));
    } finally {
      setSubmitting(false);
    }
  };

  const sortedGrades = useMemo(
    () => [...grades].sort((a, b) => a.level - b.level),
    [grades],
  );

  return (
    <Dialog
      isOpen
      icon={BookOpen}
      title="Tạo chương mới"
      cancelText="Huỷ"
      onCancel={onClose}
      submitText="Tạo chương"
      submitIcon={Plus}
      onSubmit={handleSubmit}
      loading={submitting}
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Tên chương</label>
          <Input
            autoFocus
            type="text"
            placeholder="Ví dụ: Chương 1 — Đạo hàm..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            disabled={submitting}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Khối lớp</label>
          <Select
            value={gradeId}
            onValueChange={setGradeId}
            options={sortedGrades.map((g) => ({ label: g.name, value: g.id }))}
            placeholder="Chọn khối lớp"
            disabled={submitting}
          />
        </div>
      </div>
    </Dialog>
  );
};

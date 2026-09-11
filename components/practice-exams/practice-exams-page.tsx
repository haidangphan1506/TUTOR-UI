"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Clock, ListChecks } from "lucide-react";

import { cn } from "@/lib/utils";
import type {
  ExamMode,
  ExamSubjectCode,
  PracticeExam,
} from "@/types/practice-exam.types";
import {
  DIFFICULTY_META,
  MOCK_PRACTICE_EXAMS,
  MODE_FILTERS,
  MODE_META,
  PracticeExamsPageCopy,
  SUBJECT_FILTERS,
  SUBJECT_META,
} from "@/components/practice-exams/practice-exams.data";
import UsageGuides, {
  type UsageGuideStep,
} from "@/components/ui/usage-guide.ui";

const USAGE_GUIDE_STEPS: UsageGuideStep[] = [
  {
    n: 1,
    title: "Chọn chế độ",
    body: (
      <>
        Lọc theo <span className="font-semibold">Thi thử có giờ</span> hoặc{" "}
        <span className="font-semibold">Ôn tập tự do</span> ở hàng thẻ đầu
        tiên.
      </>
    ),
  },
  {
    n: 2,
    title: "Lọc theo môn",
    body: "Chọn một môn (Toán, Lý, Hóa, Tiếng Anh) ở hàng thẻ thứ hai để thu hẹp danh sách đề.",
  },
  {
    n: 3,
    title: "Bắt đầu làm bài",
    body: (
      <>
        Nhấn <span className="font-semibold">Bắt đầu</span> trên thẻ đề để vào
        làm bài; đề đã làm hiển thị điểm cao nhất thay vì nút bắt đầu.
      </>
    ),
  },
  {
    n: 4,
    title: "Độ khó",
    body: "Nhãn Dễ / Trung bình / Khó ở góc dưới mỗi thẻ cho biết mức độ đề.",
  },
];

/* ─── Pill toggle ─────────────────────────────────────────── */

const PillToggle = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
      active
        ? "bg-emerald-600 text-white"
        : "border border-border bg-card text-muted-foreground hover:bg-muted",
    )}
  >
    {children}
  </button>
);

const SubjectPill = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "rounded-full border px-3.5 py-1 text-sm font-medium transition-colors",
      active
        ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
        : "border-border text-muted-foreground hover:bg-muted",
    )}
  >
    {children}
  </button>
);

/* ─── Exam card ───────────────────────────────────────────── */

const ExamCard = ({ exam }: { exam: PracticeExam }) => {
  const subjectMeta = SUBJECT_META[exam.subject];
  const modeMeta = MODE_META[exam.mode];
  const difficultyMeta = DIFFICULTY_META[exam.difficulty];

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "inline-flex items-center rounded-md px-2 py-1 text-xs font-bold",
            subjectMeta.badgeClass,
          )}
        >
          {subjectMeta.label}
        </span>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            modeMeta.badgeClass,
          )}
        >
          {modeMeta.label}
        </span>
      </div>

      <h3 className="mt-3 text-sm font-semibold text-foreground">
        {exam.title}
      </h3>

      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <ListChecks className="size-3.5" />
          {exam.questionCount} câu
        </span>
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" />
          {exam.durationMinutes} phút
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
          {difficultyMeta.label}
        </span>

        {exam.bestScore !== null ? (
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {PracticeExamsPageCopy.bestScoreLabel}: {exam.bestScore}/10
          </span>
        ) : (
          <Link
            href={`/practice-exams/${exam.id}`}
            className="flex items-center gap-0.5 text-xs font-medium text-emerald-600 hover:underline dark:text-emerald-400"
          >
            {PracticeExamsPageCopy.startAction}
            <ChevronRight className="size-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};

/* ─── Main page ───────────────────────────────────────────── */

export const PracticeExamsPage = () => {
  const [modeFilter, setModeFilter] = useState<"ALL" | ExamMode>("ALL");
  const [subjectFilter, setSubjectFilter] = useState<"ALL" | ExamSubjectCode>(
    "ALL",
  );

  const exams = useMemo(
    () =>
      MOCK_PRACTICE_EXAMS.filter(
        (exam) =>
          (modeFilter === "ALL" || exam.mode === modeFilter) &&
          (subjectFilter === "ALL" || exam.subject === subjectFilter),
      ),
    [modeFilter, subjectFilter],
  );

  return (
    <div className="flex flex-col gap-6 p-2">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {PracticeExamsPageCopy.heading}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {PracticeExamsPageCopy.subheading}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {MODE_FILTERS.map((filter) => (
          <PillToggle
            key={filter.key}
            active={modeFilter === filter.key}
            onClick={() => setModeFilter(filter.key)}
          >
            {filter.label}
          </PillToggle>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {SUBJECT_FILTERS.map((filter) => (
          <SubjectPill
            key={filter.key}
            active={subjectFilter === filter.key}
            onClick={() => setSubjectFilter(filter.key)}
          >
            {filter.label}
          </SubjectPill>
        ))}
      </div>

      {exams.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          {PracticeExamsPageCopy.emptyState}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      )}

      <p className="py-6 text-center text-xs text-muted-foreground">
        {PracticeExamsPageCopy.footer}
      </p>

      <UsageGuides steps={USAGE_GUIDE_STEPS} />
    </div>
  );
};

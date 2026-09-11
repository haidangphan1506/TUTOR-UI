"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Flag } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button.ui";
import {
  MOCK_QUIZ_QUESTIONS,
  PracticeExamTakeCopy,
} from "@/components/practice-exams/practice-exam-take.data";

export const PracticeExamTakePage = ({ examId }: { examId: string }) => {
  const router = useRouter();
  const questions = useMemo(
    () => MOCK_QUIZ_QUESTIONS[examId] ?? [],
    [examId],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());

  const question = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;
  const isFlagged = question ? flagged.has(question.id) : false;
  const progress = questions.length
    ? (currentIndex / questions.length) * 100
    : 0;

  const selectAnswer = (optionKey: string) => {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: optionKey }));
  };

  const toggleFlag = () => {
    if (!question) return;
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(question.id)) next.delete(question.id);
      else next.add(question.id);
      return next;
    });
  };

  if (!question) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        Không tìm thấy câu hỏi cho đề này.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-40 py-8">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-emerald-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-[11px] font-bold tracking-wide text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            {PracticeExamTakeCopy.typeLabel[question.type]}
          </span>
          <button
            type="button"
            onClick={toggleFlag}
            className={cn(
              "flex items-center gap-1.5 text-xs font-medium transition-colors",
              isFlagged
                ? "text-amber-600 dark:text-amber-400"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Flag className={cn("size-3.5", isFlagged && "fill-current")} />
            {PracticeExamTakeCopy.markAction}
          </button>
        </div>

        <h2 className="mt-4 text-base font-semibold text-foreground">
          {question.text}
        </h2>

        <div className="mt-5 flex flex-col gap-3">
          {question.options.map((option) => {
            const selected = answers[question.id] === option.key;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => selectAnswer(option.key)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-4 text-left text-sm transition-colors",
                  selected
                    ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20"
                    : "border-border hover:bg-muted/40",
                )}
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-semibold",
                    selected
                      ? "bg-emerald-600 text-white"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {option.key}
                </span>
                {option.text}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          className="w-max px-4"
          disabled={isFirst}
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
        >
          <ChevronLeft className="size-4" />
          {PracticeExamTakeCopy.prevAction}
        </Button>

        <Button
          type="button"
          className="w-max px-4"
          onClick={() =>
            isLast
              ? router.push(`/practice-exams/${examId}/result`)
              : setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))
          }
        >
          {isLast
            ? PracticeExamTakeCopy.submitAction
            : PracticeExamTakeCopy.nextAction}
          {!isLast && <ChevronRight className="size-4" />}
        </Button>
      </div>
    </div>
  );
};

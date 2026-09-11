"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ExamResultQuestion } from "@/types/practice-exam.types";
import {
  MOCK_EXAM_RESULTS,
  MOCK_RESULT_QUESTIONS,
  PracticeExamResultCopy,
} from "@/components/practice-exams/practice-exam-result.data";

type ReviewFilter = "ALL" | "CORRECT" | "WRONG";

const ResultTab = ({
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

const ReviewCard = ({ question }: { question: ExamResultQuestion }) => (
  <div
    className={cn(
      "rounded-xl border border-border border-l-4 bg-card p-4",
      question.isCorrect ? "border-l-emerald-500" : "border-l-orange-500",
    )}
  >
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-foreground">
        Câu {question.index}
      </span>
      <span
        className={cn(
          "rounded-full px-2 py-0.5 text-[11px] font-semibold",
          question.isCorrect
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
            : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
        )}
      >
        {question.isCorrect
          ? PracticeExamResultCopy.correctBadge
          : PracticeExamResultCopy.wrongBadge}
      </span>
    </div>

    <p className="mt-2 text-sm font-medium text-foreground">
      {question.text}
    </p>

    <div className="mt-3 flex flex-col gap-1 text-xs">
      <p className="text-muted-foreground">
        {PracticeExamResultCopy.yourAnswerLabel}:{" "}
        <span
          className={cn(
            "font-semibold",
            question.isCorrect
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-orange-600 dark:text-orange-400",
          )}
        >
          {question.userAnswerLabel}
        </span>
      </p>
      {!question.isCorrect && question.correctAnswerLabel ? (
        <p className="text-muted-foreground">
          {PracticeExamResultCopy.correctAnswerLabel}:{" "}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {question.correctAnswerLabel}
          </span>
        </p>
      ) : null}
    </div>

    <div className="mt-3 border-t border-border pt-3 text-xs">
      <span className="font-semibold text-foreground">
        {PracticeExamResultCopy.explanationLabel}:{" "}
      </span>
      <span className="text-muted-foreground">{question.explanation}</span>
    </div>
  </div>
);

export const PracticeExamResultPage = ({ examId }: { examId: string }) => {
  const [filter, setFilter] = useState<ReviewFilter>("ALL");

  const result = MOCK_EXAM_RESULTS[examId];
  const questions = useMemo(
    () => MOCK_RESULT_QUESTIONS[examId] ?? [],
    [examId],
  );

  const correctCount = questions.filter((q) => q.isCorrect).length;
  const wrongCount = questions.length - correctCount;

  const filteredQuestions = useMemo(
    () =>
      questions.filter((q) => {
        if (filter === "CORRECT") return q.isCorrect;
        if (filter === "WRONG") return !q.isCorrect;
        return true;
      }),
    [questions, filter],
  );

  if (!result) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        Không tìm thấy kết quả cho đề này.
      </p>
    );
  }

  const scorePercent = Math.min(
    100,
    Math.round((result.score / result.maxScore) * 100),
  );
  const averagePercent = Math.min(
    100,
    Math.round((result.classAverage / result.maxScore) * 100),
  );

  return (
    <div className="flex flex-col gap-6 p-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          href="/practice-exams"
          className="flex items-center gap-1 hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          {PracticeExamResultCopy.backToList}
        </Link>
        <span>—</span>
        <span className="text-foreground">
          {PracticeExamResultCopy.breadcrumb} – {result.examTitle}
        </span>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex w-full flex-col items-center gap-3 rounded-2xl bg-emerald-600 p-6 lg:w-56">
          <div
            className="relative flex size-32 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(white ${scorePercent}%, rgba(255,255,255,0.25) 0)`,
            }}
          >
            <div className="absolute inset-2 flex flex-col items-center justify-center rounded-full bg-emerald-600">
              <span className="text-3xl font-bold text-white">
                {result.score}
              </span>
              <span className="text-[11px] text-emerald-100">
                /{result.maxScore} {PracticeExamResultCopy.scoreSuffix}
              </span>
            </div>
          </div>
          <span className="rounded-full bg-white/90 px-4 py-1 text-sm font-semibold text-emerald-700">
            {result.badge}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-[11px] font-medium tracking-wide text-muted-foreground">
                {PracticeExamResultCopy.statCorrectLabel}
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {result.correctCount}/{result.totalCount}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-[11px] font-medium tracking-wide text-muted-foreground">
                {PracticeExamResultCopy.statTimeLabel}
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {result.timeSpent}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-[11px] font-medium tracking-wide text-muted-foreground">
                {PracticeExamResultCopy.statRankLabel}
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {result.classRank}
                <span className="text-sm font-medium text-muted-foreground">
                  /{result.classSize}
                </span>
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm font-semibold text-foreground">
              {PracticeExamResultCopy.comparisonTitle}
            </p>

            <div className="mt-3 flex flex-col gap-3">
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{PracticeExamResultCopy.comparisonYou}</span>
                  <span>
                    {result.score}/{result.maxScore}
                  </span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-emerald-600"
                    style={{ width: `${scorePercent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{PracticeExamResultCopy.comparisonClassAverage}</span>
                  <span>
                    {result.classAverage}/{result.maxScore}
                  </span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-muted-foreground/50"
                    style={{ width: `${averagePercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <ResultTab active={filter === "ALL"} onClick={() => setFilter("ALL")}>
          {PracticeExamResultCopy.tabAll} ({questions.length})
        </ResultTab>
        <ResultTab
          active={filter === "CORRECT"}
          onClick={() => setFilter("CORRECT")}
        >
          {PracticeExamResultCopy.tabCorrect} ({correctCount})
        </ResultTab>
        <ResultTab
          active={filter === "WRONG"}
          onClick={() => setFilter("WRONG")}
        >
          {PracticeExamResultCopy.tabWrong} ({wrongCount})
        </ResultTab>
      </div>

      <div className="flex flex-col gap-3">
        {filteredQuestions.map((question) => (
          <ReviewCard key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
};

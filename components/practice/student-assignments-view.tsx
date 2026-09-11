"use client";

/**
 * Student view — "Bài tập được giao".
 * Lists the assignments the student sees across their enrolled classes, driven by
 * the real API: sessions (`GET /sessions`) merged with the student's submissions
 * (`GET /exercises?studentId=me`). Each row links to the per-session submit page.
 */

import { useMemo } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ClipboardCheck,
  Clock,
  Loader2,
  Star,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useSessionActions } from "@/lib/services/session.service";
import { useExerciseActions } from "@/lib/services/exercise.service";
import { getErrorMessage } from "@/lib/axios";
import { useCurrentUserId } from "@/hooks/useCurrentUserId";
import { fmtDate } from "@/components/sessions/session-shared";
import type {
  ExercisesResponse,
  StudentSessionsResponse,
  StudentSessionListItem,
  ExerciseDetail,
} from "@/types/session.types";
import {
  PRACTICE_STATUS,
  PortalFooter,
  type PracticeStatus,
} from "./practice-shared";

/* ─── Assignment row (derived from a session + optional submission) ─── */

type AssignmentRowData = {
  key: string;
  href: string;
  title: string;
  description: string;
  dueLabel: string;
  status: PracticeStatus;
  score: number | null;
};

const actionLabel = (status: PracticeStatus) =>
  status === "GRADED"
    ? "Xem điểm"
    : status === "SUBMITTED"
      ? "Xem / nộp lại"
      : "Nộp bài";

const AssignmentRow = ({ a }: { a: AssignmentRowData }) => {
  const meta = PRACTICE_STATUS[a.status];
  const overdueColor =
    a.status === "NOT_SUBMITTED" ? "text-[#E85D24]" : "text-[#16302b]";

  return (
    <Link
      href={a.href}
      className="relative block overflow-hidden rounded-xl border border-[#E7EEEC] bg-white shadow-sm transition-colors hover:border-[#0E9F8E]/40"
    >
      <span className={cn("absolute inset-y-0 left-0 w-1", meta.bar)} />
      <div className="flex items-start gap-4 pl-5 pr-4 py-4">
        <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#F1F0FE] text-[#6366F1]">
          <ClipboardCheck className="size-5" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-[#16302b]">{a.title}</h3>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                meta.badge,
              )}
            >
              <span className="size-1.5 rounded-full bg-current opacity-70" />
              {meta.label}
            </span>
          </div>

          <p className="mt-1 text-sm text-[#5c726d]">{a.description}</p>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            <span className={cn("flex items-center gap-1.5", overdueColor)}>
              <Clock className="size-3.5" />
              Buổi học: <span className="font-semibold">{a.dueLabel}</span>
            </span>
            {a.status === "GRADED" && (
              <span className="flex items-center gap-1.5 text-[#4f46e5]">
                <Star className="size-3.5 fill-current" />
                Điểm: <span className="font-bold">{a.score?.toFixed(1)}</span>
                <span className="text-[#9AAEA9]">/10</span>
              </span>
            )}
          </div>
        </div>

        <span className="mt-1 flex shrink-0 items-center gap-1 self-center text-sm font-semibold text-[#0E9F8E]">
          {actionLabel(a.status)}
          <ChevronRight className="size-4" />
        </span>
      </div>
    </Link>
  );
};

/* ─── Main view ─── */

export const StudentAssignmentsView = () => {
  const studentId = useCurrentUserId();

  const {
    data: sessionsPayload,
    isLoading: sessionsLoading,
    error: sessionsError,
  } = useSessionActions({ list: { limit: 100 } }).list;

  const sessions = useMemo<StudentSessionListItem[]>(() => {
    return sessionsPayload?.sessions ?? [];
  }, [sessionsPayload]);

  const { data: exercisesRaw, isLoading: exercisesLoading } =
    useExerciseActions({
      list: { studentId: studentId ?? undefined, limit: 100 },
      listOptions: { enabled: !!studentId },
    }).list;

  const submissionBySession = useMemo(() => {
    const map: Record<string, ExerciseDetail> = {};
    if (!exercisesRaw) return map;
    for (const ex of exercisesRaw) {
      if (ex.sessionId) map[ex.sessionId] = ex;
    }
    return map;
  }, [exercisesRaw]);

  const assignments = useMemo<AssignmentRowData[]>(() => {
    const rows: (AssignmentRowData & { sessionNumber: number })[] = [];
    for (const s of sessions) {
      const submission = submissionBySession[s.id];
      // an assignment exists once homework is visible (session ended with exercise files)
      // or the student has already submitted something for this session.
      const hasAssigned =
        s.status === "COMPLETED" && (s.exerciseUrls?.length ?? 0) > 0;
      if (!submission && !hasAssigned) continue;

      const status: PracticeStatus =
        submission?.status === "GRADED"
          ? "GRADED"
          : submission && submission.status === "SUBMITTED"
            ? "SUBMITTED"
            : "NOT_SUBMITTED";

      rows.push({
        key: s.id,
        href: `/classes/${s.classId}/sessions/${s.id}/exercise`,
        title: s.title || `Buổi ${s.sessionNumber}`,
        description:
          s.description?.trim() ||
          `${s.class.name} · Bài tập buổi ${s.sessionNumber}`,
        dueLabel: `${fmtDate(s.startAt)} · Buổi ${s.sessionNumber}`,
        status,
        score: submission?.score ?? null,
        sessionNumber: s.sessionNumber,
      });
    }
    return rows.sort((a, b) => b.sessionNumber - a.sessionNumber);
  }, [sessions, submissionBySession]);

  const stats = useMemo(() => {
    const graded = assignments.filter((a) => a.status === "GRADED");
    const submitted = assignments.filter(
      (a) => a.status === "SUBMITTED",
    ).length;
    const pending = assignments.filter(
      (a) => a.status === "NOT_SUBMITTED",
    ).length;
    const scores = graded
      .map((a) => a.score)
      .filter((v): v is number => v !== null);
    const avg =
      scores.length > 0
        ? Math.round((scores.reduce((x, y) => x + y, 0) / scores.length) * 10) /
          10
        : null;
    return {
      total: assignments.length,
      submitted,
      pending,
      graded: graded.length,
      avg,
    };
  }, [assignments]);

  const loading = sessionsLoading || exercisesLoading;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-[#16302b]">Bài tập được giao</h1>
        <p className="mt-1 text-sm text-[#9AAEA9]">
          Xem đề bài sau mỗi buổi học, nộp bài đúng hạn và nhận điểm cùng nhận
          xét của gia sư.
        </p>
      </div>

      {!loading && !sessionsError && assignments.length > 0 && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { label: "Tổng bài", value: stats.total },
            { label: "Chưa nộp", value: stats.pending },
            { label: "Chờ chấm", value: stats.submitted },
            { label: "Điểm TB", value: stats.avg ?? "—" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-[#E7EEEC] bg-[#F9FDFB] px-3 py-2.5"
            >
              <p className="text-xs text-[#9AAEA9]">{s.label}</p>
              <p className="mt-0.5 text-lg font-bold text-[#16302b]">
                {s.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="size-6 animate-spin text-[#9AAEA9]" />
        </div>
      ) : sessionsError ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <XCircle className="size-8 text-red-400" />
          <p className="mt-2 text-sm text-[#9AAEA9]">
            {getErrorMessage(sessionsError, "Không thể tải danh sách bài tập")}
          </p>
        </div>
      ) : assignments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#E7EEEC] bg-white py-16 text-center">
          <ClipboardCheck className="size-9 text-[#C5D5D1]" />
          <p className="mt-2 text-sm text-[#9AAEA9]">
            Chưa có bài tập nào được giao.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {assignments.map((a) => (
            <AssignmentRow key={a.key} a={a} />
          ))}
        </div>
      )}

      <PortalFooter />
    </div>
  );
};

"use client";

/**
 * Parent view — child's homework portal ("Bài làm của con").
 * Học phí now lives at its own real-data page (`/fees`, see
 * `components/fees/family-fees-page.tsx`) rather than a tab here.
 * Static mock data (see practice-shared) for homework — not yet backed by API.
 */

import { useMemo } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  Clock,
  Star,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  MOCK_ASSIGNMENTS,
  MOCK_CHILD,
  PRACTICE_STATUS,
  PortalBanner,
  PortalFooter,
  StatTile,
  type Assignment,
} from "./practice-shared";

/* ─── Homework row (read-only, parent perspective) ─────────── */

const WorkRow = ({ a }: { a: Assignment }) => {
  const meta = PRACTICE_STATUS[a.status];
  return (
    <div className="relative overflow-hidden rounded-xl border border-[#E7EEEC] bg-white shadow-sm">
      <span className={cn("absolute inset-y-0 left-0 w-1", meta.bar)} />
      <div className="flex items-center gap-4 pl-5 pr-4 py-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#F1F0FE] text-[#6366F1]">
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
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#9AAEA9]">
            <Clock className="size-3.5" />
            Hạn nộp: <span className="font-medium">{a.dueLabel}</span>
          </p>
        </div>

        {/* Right result */}
        <div className="flex shrink-0 items-center gap-1.5">
          <div className="text-right">
            {a.status === "GRADED" ? (
              <>
                <p className="text-xl font-bold text-[#4f46e5]">
                  {a.score?.toFixed(1)}
                </p>
                <p className="text-[11px] text-[#9AAEA9]">điểm</p>
              </>
            ) : a.status === "SUBMITTED" ? (
              <>
                <p className="text-lg font-bold tracking-widest text-[#C5D5D1]">
                  •••
                </p>
                <p className="text-[11px] text-[#9AAEA9]">chờ chấm</p>
              </>
            ) : (
              <>
                <p className="text-lg font-bold text-[#C5D5D1]">—</p>
                <p className="text-[11px] text-[#E85D24]">chưa nộp</p>
              </>
            )}
          </div>
          <ChevronRight className="size-4 text-[#C5D5D1]" />
        </div>
      </div>
    </div>
  );
};

/* ─── Main ─────────────────────────────────────────────────── */

export const ParentPortalView = () => {
  const stats = useMemo(() => {
    const submitted = MOCK_ASSIGNMENTS.filter(
      (a) => a.status !== "NOT_SUBMITTED",
    ).length;
    const graded = MOCK_ASSIGNMENTS.filter((a) => a.status === "GRADED").length;
    const notSubmitted = MOCK_ASSIGNMENTS.filter(
      (a) => a.status === "NOT_SUBMITTED",
    ).length;
    return {
      total: MOCK_ASSIGNMENTS.length,
      submitted,
      graded,
      notSubmitted,
    };
  }, []);

  const missing = useMemo(
    () => MOCK_ASSIGNMENTS.find((a) => a.status === "NOT_SUBMITTED") ?? null,
    [],
  );

  return (
    <div className="flex flex-col gap-4 pb-8">
      <PortalBanner
        initial={MOCK_CHILD.initial}
        title={MOCK_CHILD.name}
        subtitle={`${MOCK_CHILD.className} · Gia sư: ${MOCK_CHILD.tutorName}`}
        statLabel="Điểm TB môn"
        statValue={MOCK_CHILD.avgScore.toFixed(1)}
      />

      <Link
        href="/fees"
        className="flex items-center gap-2 self-start rounded-lg border border-[#E7EEEC] bg-white px-4 py-2 text-sm font-semibold text-[#5c726d] transition-colors hover:border-[#0E9F8E]/40 hover:text-[#0E9F8E]"
      >
        <CreditCard className="size-4" />
        Xem học phí
        <ChevronRight className="size-4" />
      </Link>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatTile
          label="Đã nộp"
          value={stats.submitted}
          suffix={`/ ${stats.total} bài`}
          icon={CheckCircle2}
        />
        <StatTile
          label="Đã có điểm"
          value={stats.graded}
          suffix="bài"
          icon={Star}
          iconClass="bg-[#F1F0FE] text-[#6366F1]"
        />
        <StatTile
          label="Chưa nộp"
          value={stats.notSubmitted}
          suffix="bài"
          icon={AlertTriangle}
          iconClass="bg-[#FFF0E6] text-[#F59E0B]"
        />
      </div>

      {missing && (
        <div className="flex items-start gap-3 rounded-xl border border-[#FF7A45]/30 bg-[#FFF0E6] px-4 py-3">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[#FF7A45]" />
          <p className="text-sm leading-relaxed text-[#16302b]">
            <span className="font-semibold text-[#E85D24]">Nhắc nhở:</span>{" "}
            Con còn{" "}
            <span className="font-semibold">{stats.notSubmitted} bài</span>{" "}
            chưa nộp — “{missing.title.split(" — ")[0]}” hạn{" "}
            {missing.dueLabel.split(" · ")[0]}. Bạn có thể nhắc con hoàn thành
            đúng hạn.
          </p>
        </div>
      )}

      <h2 className="mt-1 font-bold text-[#16302b]">Bài tập gần đây</h2>
      <div className="flex flex-col gap-3">
        {MOCK_ASSIGNMENTS.map((a) => (
          <WorkRow key={a.id} a={a} />
        ))}
      </div>

      <PortalFooter />
    </div>
  );
};

"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  BookText,
  ClipboardList,
  Loader2,
} from "lucide-react";

import { useGet } from "@/lib/axios/query";
import { getErrorMessage } from "@/lib/axios";
import { unwrapApiData } from "@/lib/axios/api-unwrap";
import { MaterialLessonCard, type MaterialLesson } from "../components/material-lesson-card";

/* ─── Types ─────────────────────────────────────────────── */

type MaterialsResponse = {
  class: {
    id: string;
    name: string;
    subject: string;
    curriculumId: string | null;
  };
  lessons: MaterialLesson[];
  theoryCount: number;
  exerciseCount: number;
};

type MaterialMode = "theory" | "exercise";

/* ─── Main page ──────────────────────────────────────────── */

const CONFIG: Record<
  MaterialMode,
  {
    title: string;
    subtitle: string;
    icon: typeof BookText;
    countKey: "theoryCount" | "exerciseCount";
    filesKey: "theoryUrls" | "exerciseUrls";
    empty: string;
  }
> = {
  theory: {
    title: "Lý thuyết",
    subtitle: "Danh sách tài liệu bài giảng theo từng bài học.",
    icon: BookText,
    countKey: "theoryCount",
    filesKey: "theoryUrls",
    empty: "Chưa có tài liệu lý thuyết nào cho lớp này.",
  },
  exercise: {
    title: "Bài tập",
    subtitle: "Danh sách đề bài / tài liệu bài tập theo từng bài học.",
    icon: ClipboardList,
    countKey: "exerciseCount",
    filesKey: "exerciseUrls",
    empty: "Chưa có tài liệu bài tập nào cho lớp này.",
  },
};

type ClassMaterialsPageProps = { classId: string; mode: MaterialMode };

export const ClassMaterialsPage = ({
  classId,
  mode,
}: ClassMaterialsPageProps) => {
  const cfg = CONFIG[mode];
  const Icon = cfg.icon;

  const { data, isLoading, error, refetch } = useGet<unknown>(
    ["class-materials", classId],
    `/classes/${classId}/materials`,
    { enabled: !!classId },
  );

  const materials = useMemo<MaterialsResponse | null>(
    () => (data ? (unwrapApiData<MaterialsResponse>(data) ?? null) : null),
    [data],
  );

  const lessonsWithFiles = useMemo(() => {
    const lessons = materials?.lessons ?? [];
    return lessons
      .map((l) => ({ lesson: l, files: l[cfg.filesKey] ?? [] }))
      .filter((row) => row.files.length > 0);
  }, [materials, cfg.filesKey]);

  const totalFiles = materials?.[cfg.countKey] ?? 0;

  return (
    <div className="space-y-5 pb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link
          href="/classes"
          className="transition-colors hover:text-foreground"
        >
          Quản lý lớp học
        </Link>
        <span>/</span>
        <Link
          href={`/classes/${classId}`}
          className="transition-colors hover:text-foreground"
        >
          {materials?.class?.name ?? "Chi tiết lớp"}
        </Link>
        <span>/</span>
        <span className="font-medium text-foreground">{cfg.title}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">{cfg.title}</h1>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-800/50 dark:bg-emerald-950/30 dark:text-emerald-400">
              <Icon className="size-3" />
              {totalFiles} tệp
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{cfg.subtitle}</p>
        </div>
      </div>

      {/* Tab switch: Lý thuyết / Bài tập */}
      <div className="inline-flex rounded-lg border bg-card p-1">
        <Link
          href={`/classes/${classId}/curriculum`}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            mode === "theory"
              ? "bg-emerald-600 text-white"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookText className="size-4" />
          Lý thuyết
        </Link>
        <Link
          href={`/classes/${classId}/exercise`}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            mode === "exercise"
              ? "bg-emerald-600 text-white"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ClipboardList className="size-4" />
          Bài tập
        </Link>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center rounded-xl border bg-card py-16">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center rounded-xl border bg-card py-16 text-center">
          <p className="text-sm text-muted-foreground">
            {getErrorMessage(error, "Không thể tải tài liệu")}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 text-sm font-medium text-emerald-600 hover:underline"
          >
            Thử lại
          </button>
        </div>
      ) : lessonsWithFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border bg-card py-16 text-center">
          <Icon className="size-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm font-medium text-muted-foreground">
            {cfg.empty}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Tài liệu được quản lý trong Chương trình bài giảng của lớp.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {lessonsWithFiles.map((row, idx) => (
            <MaterialLessonCard
              key={row.lesson.id}
              lesson={row.lesson}
              index={idx}
              files={row.files}
            />
          ))}
        </div>
      )}
    </div>
  );
};

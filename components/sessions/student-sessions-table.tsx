"use client";

import { useRouter } from "next/navigation";
import { BookOpen, ChevronRight, FileText, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import type { StudentSessionListItem } from "@/types/session.types";
import {
  SESSION_STATUS_META,
  StatusBadge,
  fmtDate,
  fmtTime,
} from "./session-shared";

export const StudentSessionsTable = ({
  sessions,
}: {
  sessions: StudentSessionListItem[];
}) => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto rounded-xl border border-border/60 bg-card">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border/60 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-3 font-medium">Buổi</th>
            <th className="px-4 py-3 font-medium">Tiêu đề</th>
            <th className="px-4 py-3 font-medium">Lớp</th>
            <th className="px-4 py-3 font-medium">Thời gian</th>
            <th className="px-4 py-3 font-medium">Địa điểm</th>
            <th className="px-4 py-3 text-center font-medium">Tài liệu</th>
            <th className="px-4 py-3 font-medium">Trạng thái</th>
            <th className="px-4 py-3" aria-label="Xem chi tiết" />
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => {
            const meta = SESSION_STATUS_META[s.status];
            const materials = s.theoryUrls.length + s.exerciseUrls.length;

            return (
              <tr
                key={s.id}
                onClick={() => router.push(`/sessions/${s.id}`)}
                className="group cursor-pointer border-b border-border/40 transition-colors last:border-0 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/10"
              >
                <td className="px-4 py-3">
                  <span className="inline-flex size-9 flex-col items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                    <span className="text-sm font-semibold leading-none tabular-nums">
                      {String(s.sessionNumber).padStart(2, "0")}
                    </span>
                  </span>
                </td>

                <td className="max-w-[220px] px-4 py-3">
                  <p className="truncate font-medium">
                    {s.title || `Buổi học ${s.sessionNumber}`}
                  </p>
                </td>

                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <BookOpen className="size-3.5 shrink-0" />
                    <span className="truncate">{s.class.name}</span>
                    <span className="font-mono text-xs">({s.class.code})</span>
                  </span>
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                  {fmtDate(s.startAt)}
                  {fmtTime(s.startAt) ? ` · ${fmtTime(s.startAt)}` : ""}
                </td>

                <td className="max-w-[180px] px-4 py-3 text-muted-foreground">
                  {s.location ? (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5 shrink-0" />
                      <span className="truncate">{s.location}</span>
                    </span>
                  ) : (
                    "—"
                  )}
                </td>

                <td className="px-4 py-3 text-center text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <FileText className="size-3.5" />
                    {materials}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <StatusBadge label={meta.label} className={meta.className} />
                </td>

                <td className="px-4 py-3 text-right">
                  <ChevronRight
                    className={cn(
                      "inline size-4 text-muted-foreground transition-transform",
                      "group-hover:translate-x-0.5 group-hover:text-emerald-600",
                    )}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

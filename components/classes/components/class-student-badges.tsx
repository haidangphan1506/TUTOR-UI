"use client";

import { useClassesCopy } from "@/hooks/useClassesCopy.hook";

type MiniClassStudent = {
  id: string;
  code?: string | null;
  userCode?: string | null;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};

const STUDENT_BADGE_COLORS = [
  { bg: "#E4F6EF", text: "#0B7A6D" },
  { bg: "#DBEAFE", text: "#1E40AF" },
  { bg: "#EDE9FE", text: "#6D28D9" },
  { bg: "#FFEDD5", text: "#C2410C" },
  { bg: "#FCE7F3", text: "#BE185D" },
  { bg: "#F3F4F6", text: "#374151" },
];

const MAX_STUDENT_BADGES = 4;

function studentLabel(s: MiniClassStudent, fallback: string) {
  return (
    `${s.firstName ?? ""} ${s.lastName ?? ""}`.trim() ||
    s.code ||
    s.userCode ||
    s.username ||
    fallback
  );
}

export function ClassStudentBadges({
  students = [],
}: {
  students?: MiniClassStudent[];
}) {
  const { list } = useClassesCopy();

  if (students.length === 0) {
    return (
      <span className="text-xs text-[#9AAEA9]">{list.table.noStudents}</span>
    );
  }

  const visible = students.slice(0, MAX_STUDENT_BADGES);
  const overflow = students.length - MAX_STUDENT_BADGES;

  return (
    <div className="flex flex-col gap-1">
      {visible.map((s, i) => {
        const c = STUDENT_BADGE_COLORS[i % STUDENT_BADGE_COLORS.length];
        return (
          <span
            key={s.id}
            className="inline-flex w-fit items-center rounded-full px-2 py-0.5 text-xs font-semibold"
            style={{ background: c.bg, color: c.text }}
          >
            {studentLabel(s, list.table.studentFallbackAbbr)}
          </span>
        );
      })}
      {overflow > 0 && (
        <span className="text-xs font-medium text-[#0E9F8E]">
          {list.table.studentOverflow(overflow)}
        </span>
      )}
    </div>
  );
}

import type { LucideIcon } from "lucide-react";

/** One label/value row inside a `SectionCard` on the student/parent class watch page. */
export const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-center justify-between gap-3 px-5 py-3">
    <span className="flex items-center gap-2 text-sm text-muted-foreground">
      <Icon className="size-3.5" />
      {label}
    </span>
    <span className="truncate text-sm font-semibold">{value}</span>
  </div>
);

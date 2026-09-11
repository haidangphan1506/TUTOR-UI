"use client";

import { useState } from "react";
import { CalendarClock, CheckCircle2, MoreVertical, PlayCircle } from "lucide-react";

import { Button } from "@/components/ui/button.ui";
import MenuPopover from "@/components/ui/menu-popover.ui";
import type { ClassStatus } from "@/types";

const ALL_CLASS_STATUSES: ClassStatus[] = ["OPEN", "UPCOMING", "CLOSED"];

const classStatusIcon: Record<ClassStatus, React.ElementType> = {
  OPEN: PlayCircle,
  UPCOMING: CalendarClock,
  CLOSED: CheckCircle2,
};

/** Header "change class status" menu — hidden once the class is `CLOSED` (finished). */
export const ClassStatusMenu = ({
  status,
  statusLabel,
  onChangeStatus,
  disabled,
  ariaLabel,
}: {
  status: ClassStatus;
  statusLabel: Record<ClassStatus, string>;
  onChangeStatus: (status: ClassStatus) => void;
  disabled?: boolean;
  ariaLabel: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <MenuPopover
      align="start"
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={ariaLabel}
          disabled={disabled}
        >
          <MoreVertical className="size-4" />
        </Button>
      }
    >
      <div className="flex flex-col gap-0.5">
        {ALL_CLASS_STATUSES.map((s) => {
          const Icon = classStatusIcon[s];
          const isCurrent = s === status;
          return (
            <Button
              key={s}
              type="button"
              variant="ghost"
              disabled={isCurrent || disabled}
              onClick={() => {
                onChangeStatus(s);
                setOpen(false);
              }}
              className="h-auto! w-full! justify-start! gap-2! px-2! py-1.5! text-sm! font-normal"
            >
              <Icon className="size-3.5" />
              {statusLabel[s]}
            </Button>
          );
        })}
      </div>
    </MenuPopover>
  );
};

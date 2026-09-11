"use client";

import { useState } from "react";
import {
  CalendarClock,
  CheckCircle2,
  MoreVertical,
  PauseCircle,
  PlayCircle,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button.ui";
import MenuPopover from "@/components/ui/menu-popover.ui";
import type { SessionDto, SessionStatus } from "@/types";

const sessionStatusIcon: Record<SessionStatus, React.ElementType> = {
  SCHEDULED: CalendarClock,
  ONGOING: PlayCircle,
  POSTPONED: PauseCircle,
  COMPLETED: CheckCircle2,
  CANCELLED: XCircle,
};

/** Per-row "change status" icon menu (upcoming sessions table only). */
export const SessionStatusMenu = ({
  session,
  statusOptions,
  onChangeStatus,
  disabled,
  ariaLabel,
}: {
  session: SessionDto;
  statusOptions: { value: string; label: string }[];
  onChangeStatus: (id: string, status: SessionStatus) => void;
  disabled?: boolean;
  ariaLabel: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <MenuPopover
      align="end"
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
        {statusOptions.map((opt) => {
          const Icon = sessionStatusIcon[opt.value as SessionStatus];
          const isCurrent = opt.value === session.status;
          return (
            <Button
              key={opt.value}
              type="button"
              variant="ghost"
              disabled={isCurrent || disabled}
              onClick={() => {
                onChangeStatus(session.id, opt.value as SessionStatus);
                setOpen(false);
              }}
              className="h-auto! w-full! justify-start! gap-2! px-2! py-1.5! text-sm! font-normal"
            >
              <Icon className="size-3.5" />
              {opt.label}
            </Button>
          );
        })}
      </div>
    </MenuPopover>
  );
};

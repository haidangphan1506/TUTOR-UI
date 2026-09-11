"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarClock,
  ClipboardList,
  ExternalLink,
  LayoutDashboard,
  RotateCcw,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useAiChat } from "@/hooks/useAiChat.hook";
import { cn } from "@/lib/utils";

type AnalysisTask = {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  prompt: string;
};

const ANALYSIS_TASKS: AnalysisTask[] = [
  {
    id: "overview",
    label: "Tổng quan hôm nay",
    description: "Buổi học, bài tập và việc cần chú ý hôm nay",
    icon: LayoutDashboard,
    prompt:
      "Phân tích tổng quan hoạt động hôm nay: buổi học, bài tập chờ chấm và việc cần chú ý.",
  },
  {
    id: "fees",
    label: "Phân tích học phí",
    description: "Tình hình thu học phí tháng này",
    icon: Wallet,
    prompt:
      "Phân tích tình hình học phí tháng này: đã thu, chưa thu, quá hạn và học sinh cần nhắc đóng phí.",
  },
  {
    id: "exercises",
    label: "Tiến độ bài tập",
    description: "Bài đã giao, chờ chấm và học sinh chưa nộp",
    icon: ClipboardList,
    prompt:
      "Phân tích tiến độ bài tập: số bài đã giao, đang chờ chấm và học sinh chưa nộp bài.",
  },
  {
    id: "schedule",
    label: "Lịch dạy tuần này",
    description: "Buổi học sắp tới và xung đột lịch (nếu có)",
    icon: CalendarClock,
    prompt:
      "Phân tích lịch dạy tuần này: các buổi học sắp tới và xung đột lịch nếu có.",
  },
];

export default function AiAnalysisWidget() {
  const [open, setOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<AnalysisTask | null>(null);
  const { messages, sendMessage, reset, isSending } = useAiChat();

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    resultRef.current?.scrollTo({
      top: resultRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const lastReply = [...messages].reverse().find((m) => m.role === "assistant");

  const runTask = async (task: AnalysisTask) => {
    setActiveTask(task);
    await sendMessage(task.prompt);
  };

  const backToMenu = () => setActiveTask(null);

  const close = () => {
    setOpen(false);
    setActiveTask(null);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className={cn(
            "flex h-[32rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden",
            "rounded-2xl border border-border bg-card text-card-foreground shadow-2xl",
            "animate-in fade-in slide-in-from-bottom-4 duration-200",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-2">
              {activeTask ? (
                <button
                  type="button"
                  onClick={backToMenu}
                  title="Chọn tác vụ khác"
                  className="rounded-md p-1 -ml-1 transition-colors hover:bg-white/15"
                >
                  <ArrowLeft className="size-4" />
                </button>
              ) : (
                <Sparkles className="size-5" />
              )}
              <span className="text-sm font-semibold">
                {activeTask ? activeTask.label : "Phân tích AI"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {activeTask && (
                <button
                  type="button"
                  onClick={() => void runTask(activeTask)}
                  title="Phân tích lại"
                  disabled={isSending}
                  className="rounded-md p-1.5 transition-colors hover:bg-white/15 disabled:opacity-50"
                >
                  <RotateCcw className="size-4" />
                </button>
              )}
              <button
                type="button"
                onClick={close}
                title="Đóng"
                className="rounded-md p-1.5 transition-colors hover:bg-white/15"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          {activeTask ? (
            <div
              ref={resultRef}
              className="flex-1 space-y-3 overflow-y-auto p-4"
            >
              {isSending && !lastReply?.content ? (
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-muted px-3.5 py-3 w-fit">
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
                </div>
              ) : (
                <div className="whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-muted px-3.5 py-2.5 text-sm text-foreground">
                  {lastReply?.content}
                </div>
              )}

              <Link
                href="/ai-chat"
                onClick={() => reset()}
                className="flex w-fit items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                Hỏi tiếp trong Trợ lý AI
                <ExternalLink className="size-3" />
              </Link>
            </div>
          ) : (
            <div className="flex-1 space-y-2 overflow-y-auto p-3">
              {ANALYSIS_TASKS.map((task) => {
                const Icon = task.icon;
                return (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => void runTask(task)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl border border-border bg-background p-3 text-left",
                      "transition-colors hover:border-primary/50 hover:bg-muted",
                    )}
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-[18px]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {task.label}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {task.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Floating toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title={open ? "Đóng phân tích AI" : "Phân tích AI"}
        className={cn(
          "flex size-14 items-center justify-center rounded-full shadow-lg",
          "bg-primary text-primary-foreground transition-all hover:scale-105 hover:bg-primary/90",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        )}
      >
        {open ? <X className="size-6" /> : <Sparkles className="size-6" />}
      </button>
    </div>
  );
}

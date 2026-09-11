import type { Language } from "@/types";

export type StudentSessionsDictionary = {
  header: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  stats: {
    total: { label: string; hint: string };
    scheduled: { label: string; hint: string };
    ongoing: { label: string; hint: string };
    completed: { label: string; hint: string };
  };
  filters: {
    all: string;
    scheduled: string;
    ongoing: string;
    completed: string;
  };
  list: {
    loading: string;
    loadErrorFallback: string;
    emptyTitle: string;
    emptyHint: string;
  };
  table: {
    session: string;
    sessionNumberPrefix: (n: number) => string;
    time: string;
    location: string;
    locationFallback: string;
    status: string;
    actions: string;
    viewDetail: string;
  };
};

const vi: StudentSessionsDictionary = {
  header: {
    eyebrow: "Buổi học của tôi",
    title: "Buổi học",
    subtitle:
      "Xem lịch các buổi học, tải tài liệu bài giảng và nộp bài tập để gia sư chấm điểm.",
  },
  stats: {
    total: { label: "Tổng buổi học", hint: "Trên tất cả lớp đang tham gia" },
    scheduled: { label: "Sắp diễn ra", hint: "Đã lên lịch" },
    ongoing: { label: "Đang diễn ra", hint: "Hiện tại" },
    completed: { label: "Đã kết thúc", hint: "Đã hoàn thành" },
  },
  filters: {
    all: "Tất cả",
    scheduled: "Sắp diễn ra",
    ongoing: "Đang diễn ra",
    completed: "Đã kết thúc",
  },
  list: {
    loading: "Đang tải buổi học…",
    loadErrorFallback: "Không tải được danh sách buổi học",
    emptyTitle: "Chưa có buổi học nào",
    emptyHint: "Các buổi học của lớp bạn tham gia sẽ hiển thị ở đây.",
  },
  table: {
    session: "Buổi học",
    sessionNumberPrefix: (n) => `Buổi ${n}`,
    time: "Thời gian",
    location: "Địa điểm",
    locationFallback: "—",
    status: "Trạng thái",
    actions: "Thao tác",
    viewDetail: "Xem chi tiết",
  },
};

const en: StudentSessionsDictionary = {
  header: {
    eyebrow: "My sessions",
    title: "Sessions",
    subtitle:
      "View your class schedule, download lecture materials, and submit exercises for grading.",
  },
  stats: {
    total: { label: "Total sessions", hint: "Across all enrolled classes" },
    scheduled: { label: "Upcoming", hint: "Scheduled" },
    ongoing: { label: "Ongoing", hint: "Happening now" },
    completed: { label: "Completed", hint: "Finished" },
  },
  filters: {
    all: "All",
    scheduled: "Upcoming",
    ongoing: "Ongoing",
    completed: "Completed",
  },
  list: {
    loading: "Loading sessions…",
    loadErrorFallback: "Failed to load sessions",
    emptyTitle: "No sessions yet",
    emptyHint: "Sessions from your enrolled classes will show up here.",
  },
  table: {
    session: "Session",
    sessionNumberPrefix: (n) => `Session ${n}`,
    time: "Time",
    location: "Location",
    locationFallback: "—",
    status: "Status",
    actions: "Actions",
    viewDetail: "View detail",
  },
};

export const studentSessionsDictionary: Record<
  Language,
  StudentSessionsDictionary
> = { vi, en };

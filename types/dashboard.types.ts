export type DashboardNotificationType =
  "SYSTEM" | "TUITION" | "STUDENT" | "TUTOR";

export type DashboardNotification = {
  id: string;
  type: DashboardNotificationType;
  title: string;
  content: string;
  subContent?: string | null;
  redirectUrl?: string | null;
  actionLabel?: string | null;
  isRead: boolean;
  createdAt: string;
};

export type DashboardScheduleItem = {
  id: string;
  startAt: string;
  endAt: string;
  title: string | null;
  className: string;
  subject: string;
  format: string;
  location: string | null;
};

export type DashboardMonthly = {
  month: number; // 1..12
  revenue: number;
  sessions: number;
};

export type DashboardStats = {
  classesCount: number;
  studentsCount: number;
  sessionsThisWeek: number;
  sessionsCompletedThisWeek: number;
  revenueThisMonth: number;
  overdueTuitionCount: number;
  unpaidTuitionAmount: number;
};

export type DashboardOverview = {
  role: "ADMIN" | "TUTOR" | "STUDENT" | "PARENT" | string;
  stats: DashboardStats;
  todaySchedule: DashboardScheduleItem[];
  monthly: DashboardMonthly[];
  recentNotifications: DashboardNotification[];
};

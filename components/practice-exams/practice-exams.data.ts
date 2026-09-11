import type {
  ExamDifficulty,
  ExamMode,
  ExamSubjectCode,
  PracticeExam,
} from "@/types/practice-exam.types";

export const PracticeExamsPageCopy = {
  title: "Ôn tập & Thi thử",
  heading: "Luyện đề & kiểm tra nhanh",
  subheading: "Chọn đề thi thử có tính giờ hoặc bài ôn tập tự do theo môn học của bạn.",
  countSuffix: "đề",
  startAction: "Bắt đầu",
  bestScoreLabel: "Điểm cao nhất",
  emptyState: "Không tìm thấy đề phù hợp.",
  footer: "© 2026 TUTOR VN — Hệ thống quản lý học thuật chuyên nghiệp.",
} as const;

export const MODE_FILTERS: { key: "ALL" | ExamMode; label: string }[] = [
  { key: "ALL", label: "Tất cả" },
  { key: "TIMED", label: "Thi thử có giờ" },
  { key: "FREE", label: "Ôn tập tự do" },
];

export const SUBJECT_FILTERS: { key: "ALL" | ExamSubjectCode; label: string }[] = [
  { key: "ALL", label: "Tất cả môn" },
  { key: "TO", label: "Toán" },
  { key: "LY", label: "Lý" },
  { key: "HOA", label: "Hóa" },
  { key: "EN", label: "Tiếng Anh" },
];

export const SUBJECT_META: Record<
  ExamSubjectCode,
  { label: string; badgeClass: string }
> = {
  TO: {
    label: "TO",
    badgeClass:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  LY: {
    label: "LÝ",
    badgeClass:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  },
  HOA: {
    label: "HÓA",
    badgeClass:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  EN: {
    label: "EN",
    badgeClass:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
};

export const MODE_META: Record<ExamMode, { label: string; badgeClass: string }> = {
  TIMED: {
    label: "Có giờ",
    badgeClass:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
  FREE: {
    label: "Tự do",
    badgeClass:
      "bg-muted text-muted-foreground",
  },
};

export const DIFFICULTY_META: Record<ExamDifficulty, { label: string }> = {
  EASY: { label: "Dễ" },
  MEDIUM: { label: "Trung bình" },
  HARD: { label: "Khó" },
};

export const MOCK_PRACTICE_EXAMS: PracticeExam[] = [
  {
    id: "1",
    subject: "TO",
    mode: "TIMED",
    title: "Đề thi thử: Đạo hàm & Ứng dụng",
    questionCount: 10,
    durationMinutes: 25,
    difficulty: "MEDIUM",
    bestScore: 8,
  },
  {
    id: "2",
    subject: "TO",
    mode: "FREE",
    title: "Ôn tập nhanh: Hàm số bậc hai",
    questionCount: 8,
    durationMinutes: 15,
    difficulty: "EASY",
    bestScore: null,
  },
  {
    id: "3",
    subject: "LY",
    mode: "TIMED",
    title: "Thi thử giữa kỳ: Dao động cơ",
    questionCount: 12,
    durationMinutes: 30,
    difficulty: "HARD",
    bestScore: null,
  },
  {
    id: "4",
    subject: "LY",
    mode: "FREE",
    title: "Ôn tập: Định luật Newton",
    questionCount: 6,
    durationMinutes: 12,
    difficulty: "MEDIUM",
    bestScore: 7,
  },
  {
    id: "5",
    subject: "HOA",
    mode: "TIMED",
    title: "Thi thử: Este – Lipit",
    questionCount: 10,
    durationMinutes: 20,
    difficulty: "MEDIUM",
    bestScore: null,
  },
  {
    id: "6",
    subject: "HOA",
    mode: "FREE",
    title: "Ôn tập nhanh: Bảng tuần hoàn",
    questionCount: 6,
    durationMinutes: 10,
    difficulty: "EASY",
    bestScore: 9,
  },
  {
    id: "7",
    subject: "EN",
    mode: "TIMED",
    title: "Thi thử: Ngữ pháp thì động từ",
    questionCount: 15,
    durationMinutes: 25,
    difficulty: "MEDIUM",
    bestScore: null,
  },
  {
    id: "8",
    subject: "EN",
    mode: "FREE",
    title: "Ôn tập từ vựng: Chủ đề Môi trường",
    questionCount: 8,
    durationMinutes: 12,
    difficulty: "EASY",
    bestScore: null,
  },
  {
    id: "9",
    subject: "TO",
    mode: "TIMED",
    title: "Thi thử tổng hợp: Chương Hàm số",
    questionCount: 14,
    durationMinutes: 35,
    difficulty: "HARD",
    bestScore: 6,
  },
];

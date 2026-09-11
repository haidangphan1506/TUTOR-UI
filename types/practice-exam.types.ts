export type ExamSubjectCode = "TO" | "LY" | "HOA" | "EN";

export type ExamMode = "TIMED" | "FREE";

export type ExamDifficulty = "EASY" | "MEDIUM" | "HARD";

export type PracticeExam = {
  id: string;
  subject: ExamSubjectCode;
  mode: ExamMode;
  title: string;
  questionCount: number;
  durationMinutes: number;
  difficulty: ExamDifficulty;
  bestScore: number | null;
};

export type QuizQuestionType = "MULTIPLE_CHOICE";

export type QuizOption = {
  key: "A" | "B" | "C" | "D";
  text: string;
};

export type QuizQuestion = {
  id: string;
  type: QuizQuestionType;
  text: string;
  options: QuizOption[];
};

export type ExamResultBadge = "Xuất sắc" | "Giỏi" | "Khá" | "Trung bình" | "Yếu";

export type ExamResultSummary = {
  examId: string;
  examTitle: string;
  score: number;
  maxScore: number;
  badge: ExamResultBadge;
  correctCount: number;
  totalCount: number;
  timeSpent: string;
  classRank: number;
  classSize: number;
  classAverage: number;
};

export type ExamResultQuestion = {
  id: string;
  index: number;
  isCorrect: boolean;
  text: string;
  userAnswerLabel: string;
  correctAnswerLabel?: string;
  explanation: string;
};

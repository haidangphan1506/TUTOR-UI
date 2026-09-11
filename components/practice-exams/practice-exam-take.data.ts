import type { QuizQuestion } from "@/types/practice-exam.types";

export const PracticeExamTakeCopy = {
  typeLabel: {
    MULTIPLE_CHOICE: "TRẮC NGHIỆM",
  },
  markAction: "Đánh dấu",
  prevAction: "Câu trước",
  nextAction: "Câu tiếp",
  submitAction: "Nộp bài",
} as const;

export const MOCK_QUIZ_QUESTIONS: Record<string, QuizQuestion[]> = {
  "1": [
    {
      id: "q1",
      type: "MULTIPLE_CHOICE",
      text: "Đạo hàm của hàm số f(x) = x³ − 3x² + 2 tại x = 1 bằng bao nhiêu?",
      options: [
        { key: "A", text: "-3" },
        { key: "B", text: "-1" },
        { key: "C", text: "0" },
        { key: "D", text: "3" },
      ],
    },
    {
      id: "q2",
      type: "MULTIPLE_CHOICE",
      text: "Cho hàm số f(x) = 2x³ − 3x² + 1. Số điểm cực trị của hàm số là bao nhiêu?",
      options: [
        { key: "A", text: "0" },
        { key: "B", text: "1" },
        { key: "C", text: "2" },
        { key: "D", text: "3" },
      ],
    },
    {
      id: "q3",
      type: "MULTIPLE_CHOICE",
      text: "Đạo hàm của hàm số y = sin(2x) bằng biểu thức nào sau đây?",
      options: [
        { key: "A", text: "cos(2x)" },
        { key: "B", text: "2cos(2x)" },
        { key: "C", text: "-2cos(2x)" },
        { key: "D", text: "-cos(2x)" },
      ],
    },
  ],
};

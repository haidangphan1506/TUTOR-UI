import type { SessionFile } from "./session.types";

/** Lesson row belonging to a curriculum, used when listing lessons under a class. */
export type LessonDto = {
  id: string;
  title: string;
  order: number;
  theoryUrls: SessionFile[];
  exerciseUrls: SessionFile[];
  createdAt?: string;
};

export type CurriculumFramework = {
  id: string;
  userId: string;
  gradesId: string | null;
  subject: string;
  code: string;
  grade: string;
  courseTime: string;
  description: string;
  chapterCount: number;
  lessonCount: number;
  createdAt: string;
  updatedAt: string;
};

export type CurriculumFrameworksApiPayload = {
  curriculums: CurriculumFramework[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type CreateCurriculumPayload = {
  subject: string;
  code: string;
  grade: string;
  courseTime: string;
  description?: string;
};

export type UpdateCurriculumPayload = Partial<CreateCurriculumPayload>;

/* ─── Detail page types ─────────────────────────────────── */

export type CurriculumLessonFile = { name: string; url: string; key: string };

export type CurriculumLesson = {
  id: string;
  curriculumId: string;
  chapterId: string;
  title: string;
  description: string;
  theoryUrls: CurriculumLessonFile[];
  exerciseUrls: CurriculumLessonFile[];
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type CurriculumChapter = {
  id: string;
  curriculumId: string;
  title: string;
  description: string;
  order: number;
  lessons: CurriculumLesson[];
  createdAt: string;
  updatedAt: string;
};

/** Full curriculum framework with nested chapters/lessons (GET /curriculum/:id). */
export type CurriculumDetail = {
  id: string;
  userId: string;
  gradesId: string | null;
  subject: string;
  code: string;
  grade: string;
  courseTime: string;
  description: string;
  chapters: CurriculumChapter[];
  createdAt: string;
  updatedAt: string;
};

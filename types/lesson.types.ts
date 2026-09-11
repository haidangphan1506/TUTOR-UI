/** Bài học (lesson) trong khung chương trình — backed by `/curriculum/lessons` on the API. */

/** BE row shape isn't fully documented yet — kept as an open record, not `unknown`. */
export type LessonItem = Record<string, unknown>;

export type CreateLessonPayload = {
  name: string;
  content?: string;
  order?: number;
  lessonType?: string;
};

export type UpdateLessonPayload = {
  name?: string;
  content?: string;
  order?: number;
  lessonType?: string;
};

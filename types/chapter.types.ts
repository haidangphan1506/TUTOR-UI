/** Chương (chapter) trong khung chương trình — backed by `/chapter` on the API. */

/** BE row shape isn't fully documented yet — kept as an open record, not `unknown`. */
export type ChapterItem = Record<string, unknown>;

export type CreateChapterPayload = {
  name: string;
  description?: string;
  order?: number;
};

export type UpdateChapterPayload = {
  name?: string;
  description?: string;
  order?: number;
};

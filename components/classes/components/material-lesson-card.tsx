import { MaterialFileRow, type MaterialFile } from "./material-file-row";

export type MaterialLesson = {
  id: string;
  title: string;
  description: string | null;
  order: number | null;
  chapterId: string | null;
  chapterTitle: string | null;
  theoryUrls: MaterialFile[] | null;
  exerciseUrls: MaterialFile[] | null;
};

/** One lesson + its theory/exercise files, on the class materials page. */
export const MaterialLessonCard = ({
  lesson,
  index,
  files,
}: {
  lesson: MaterialLesson;
  index: number;
  files: MaterialFile[];
}) => (
  <div className="rounded-xl border bg-card">
    <div className="flex items-start gap-3 border-b px-4 py-3">
      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <p className="font-medium leading-5">{lesson.title}</p>
        {lesson.chapterTitle && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            {lesson.chapterTitle}
          </p>
        )}
        {lesson.description && (
          <p className="mt-1 text-xs text-muted-foreground">
            {lesson.description}
          </p>
        )}
      </div>
      <span className="ml-auto shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
        {files.length} tệp
      </span>
    </div>
    <div className="flex flex-col gap-2 p-3">
      {files.map((f) => (
        <MaterialFileRow key={f.url} file={f} />
      ))}
    </div>
  </div>
);

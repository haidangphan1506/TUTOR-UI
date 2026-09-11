import {
  FileArchive,
  FileSpreadsheet,
  FileText,
  Presentation,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button.ui";
import { cn } from "@/lib/utils";
import { isImageFile } from "@/lib/file-utils";
import type { SessionFile } from "@/types";

const FILE_KIND: Record<
  string,
  { icon: React.ElementType; className: string }
> = {
  pdf: {
    icon: FileText,
    className:
      "bg-rose-50 text-rose-500 dark:bg-rose-950/30 dark:text-rose-400",
  },
  doc: {
    icon: FileText,
    className:
      "bg-blue-50 text-blue-500 dark:bg-blue-950/30 dark:text-blue-400",
  },
  docx: {
    icon: FileText,
    className:
      "bg-blue-50 text-blue-500 dark:bg-blue-950/30 dark:text-blue-400",
  },
  xls: {
    icon: FileSpreadsheet,
    className:
      "bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30 dark:text-emerald-400",
  },
  xlsx: {
    icon: FileSpreadsheet,
    className:
      "bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30 dark:text-emerald-400",
  },
  ppt: {
    icon: Presentation,
    className:
      "bg-amber-50 text-amber-500 dark:bg-amber-950/30 dark:text-amber-400",
  },
  pptx: {
    icon: Presentation,
    className:
      "bg-amber-50 text-amber-500 dark:bg-amber-950/30 dark:text-amber-400",
  },
  zip: {
    icon: FileArchive,
    className:
      "bg-violet-50 text-violet-500 dark:bg-violet-950/30 dark:text-violet-400",
  },
  rar: {
    icon: FileArchive,
    className:
      "bg-violet-50 text-violet-500 dark:bg-violet-950/30 dark:text-violet-400",
  },
};

const getFileKind = (name: string) => {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  return (
    FILE_KIND[ext] ?? {
      icon: FileText,
      className: "bg-muted text-muted-foreground",
    }
  );
};

const formatBytes = (bytes?: number) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

/** One staged (not-yet-submitted) file tile in the exercise submit page's upload grid. */
export const StagedFileTile = ({
  file,
  size,
  onPreview,
  onRemove,
}: {
  file: SessionFile;
  size?: number;
  onPreview: () => void;
  onRemove: () => void;
}) => {
  const isImage = isImageFile(file.name);
  const kind = getFileKind(file.name);
  const KindIcon = kind.icon;

  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg border border-border/60 bg-card">
      {isImage ? (
        <>
          <Button
            type="button"
            variant="ghost"
            onClick={onPreview}
            className="size-full! w-full! h-full! rounded-none! border-0! bg-transparent! p-0!"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={file.url}
              alt={file.name}
              className="size-full object-cover"
            />
          </Button>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent px-1.5 pb-1 pt-4">
            <p className="truncate text-[9px] font-medium text-white">
              {file.name}
            </p>
            {size && (
              <p className="text-[8px] text-white/70">{formatBytes(size)}</p>
            )}
          </div>
        </>
      ) : (
        <div
          className={cn(
            "flex size-full flex-col items-center justify-center gap-1.5 px-2 text-center",
            kind.className,
          )}
        >
          <KindIcon className="size-6" />
          <span className="line-clamp-2 text-[10px] font-medium leading-tight">
            {file.name}
          </span>
          {size && <span className="text-[9px] opacity-70">{formatBytes(size)}</span>}
        </div>
      )}
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label="Bỏ tệp"
        onClick={onRemove}
        className="absolute right-1 top-1 size-5! rounded-full! bg-black/60! text-white opacity-80 transition-opacity hover:bg-rose-600! sm:opacity-0 sm:group-hover:opacity-100"
      >
        <X className="size-3" />
      </Button>
    </div>
  );
};

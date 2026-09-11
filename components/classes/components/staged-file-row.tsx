import { Paperclip, X } from "lucide-react";

import { isImageFile } from "@/lib/file-utils";
import type { SessionFile } from "@/types";

/** One not-yet-submitted file, staged for upload on the session watch/submit pages. */
export const StagedFileRow = ({
  file,
  onRemove,
  onPreview,
}: {
  file: SessionFile;
  onRemove: () => void;
  onPreview: () => void;
}) => {
  const isImage = isImageFile(file.name);

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card px-3 py-2.5">
      {isImage ? (
        <button
          type="button"
          onClick={onPreview}
          className="size-10 shrink-0 overflow-hidden rounded-md border"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={file.url}
            alt={file.name}
            className="size-full object-cover"
          />
        </button>
      ) : (
        <Paperclip className="size-4 shrink-0 text-emerald-600" />
      )}
      {isImage ? (
        <button
          type="button"
          onClick={onPreview}
          className="min-w-0 flex-1 truncate text-sm hover:underline"
        >
          {file.name}
        </button>
      ) : (
        <span className="min-w-0 flex-1 truncate text-sm">{file.name}</span>
      )}
      <button
        type="button"
        aria-label="Bỏ tệp"
        onClick={onRemove}
        className="text-muted-foreground hover:text-rose-500"
      >
        <X className="size-4" />
      </button>
    </div>
  );
};

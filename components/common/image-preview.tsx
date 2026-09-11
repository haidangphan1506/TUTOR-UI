"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Download, Loader2 } from "lucide-react";

type ImagePreviewProps = {
  src: string;
  name: string;
  onClose: () => void;
  onDownload?: () => void;
  downloading?: boolean;
};

export function ImagePreview({
  src,
  name,
  onClose,
  onDownload,
  downloading,
}: ImagePreviewProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-10 right-0 flex gap-2">
          {onDownload && (
            <button
              type="button"
              onClick={onDownload}
              disabled={downloading}
              className="flex size-8 items-center justify-center rounded-lg bg-white/20 text-white hover:bg-white/40 disabled:opacity-50"
            >
              {downloading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Download className="size-4" />
              )}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg bg-white/20 text-white hover:bg-white/40"
          >
            <X className="size-4" />
          </button>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={name}
          className="max-h-[80vh] max-w-[85vw] rounded-lg object-contain shadow-2xl"
        />
        <p className="mt-3 max-w-full truncate text-sm text-white/80">{name}</p>
      </div>
    </div>,
    document.body,
  );
}

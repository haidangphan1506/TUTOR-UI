import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

import { ApiError } from "@/types";
import { getErrorMessage, getValidationMessages } from "./api-error";

export function handleFormApiError<TFieldValues extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TFieldValues>,
  fallbackMessage: string,
) {
  if (!(error instanceof ApiError) || error.statusCode !== 422) {
    toast.error(getErrorMessage(error, fallbackMessage));
    return;
  }

  const nestErrors = error.data?.errors ?? [];
  const issues = error.data?.issues ?? [];
  let mappedFieldCount = 0;

  nestErrors.forEach((entry) => {
    const field = entry.field;
    const message = entry.message;
    if (!field || typeof message !== "string") {
      return;
    }
    mappedFieldCount += 1;
    setError(field as Path<TFieldValues>, {
      type: "server",
      message,
    });
  });

  issues.forEach((issue) => {
    const field = issue.path;
    const message = issue.message;

    if (!field || typeof message !== "string") {
      return;
    }

    mappedFieldCount += 1;
    setError(field as Path<TFieldValues>, {
      type: "server",
      message,
    });
  });

  if (mappedFieldCount === 0) {
    const fallbackValidationMessage =
      getValidationMessages(error)[0] || "Validation failed";

    setError("root.serverError" as Path<TFieldValues>, {
      type: "server",
      message: fallbackValidationMessage,
    });
  }
}

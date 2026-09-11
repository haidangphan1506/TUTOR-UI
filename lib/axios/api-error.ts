import { ApiError } from "@/types";

export function getErrorMessage(
  error: unknown,
  fallback = "Unexpected error",
): string {
  if (error instanceof ApiError) {
    return error.message || fallback;
  }
  if (error instanceof Error) {
    return error.message || fallback;
  }
  return fallback;
}

export function getValidationMessages(error: unknown): string[] {
  if (!(error instanceof ApiError) || error.statusCode !== 422) {
    return [];
  }

  const fromErrors =
    error.data?.errors
      ?.map((e) => e.message)
      .filter((m): m is string => typeof m === "string") ?? [];

  if (fromErrors.length > 0) {
    return fromErrors;
  }

  const fromIssues =
    error.data?.issues
      ?.map((i) => i.message)
      .filter((m): m is string => typeof m === "string") ?? [];

  if (fromIssues.length > 0) {
    return fromIssues;
  }

  const rawMessage = error.data?.message;
  if (Array.isArray(rawMessage)) {
    return rawMessage.filter(
      (item): item is string => typeof item === "string",
    );
  }
  if (typeof rawMessage === "string") {
    return [rawMessage];
  }
  return [];
}

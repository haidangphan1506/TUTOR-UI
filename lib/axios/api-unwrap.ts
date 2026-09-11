/** Bỏ lớp bọ `{ data: T }` từ `ResponseInterceptor` Nest. */
export function unwrapApiData<T>(body: unknown): T {
  if (
    body !== null &&
    typeof body === "object" &&
    "data" in body &&
    (body as { data: unknown }).data !== undefined &&
    (body as { data: unknown }).data !== null
  ) {
    return (body as { data: T }).data;
  }
  return body as T;
}

import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:8888";

export type RefreshedTokens = {
  accessToken: string;
  refreshToken: string;
};

export const unwrapNestPayload = <T extends Record<string, unknown>>(
  body: unknown,
): T | undefined => {
  if (!body || typeof body !== "object") {
    return undefined;
  }
  const o = body as Record<string, unknown>;
  if ("data" in o && o.data && typeof o.data === "object") {
    return o.data as T;
  }
  return body as T;
};

/** Không dùng `axiosInstance` để tránh gắn Bearer access (có thể đã hết hạn). */
export async function postAuthRefresh(
  refreshToken: string,
): Promise<RefreshedTokens> {
  const res = await axios.post<unknown>(
    `${API_BASE_URL}/auth/refresh`,
    { refreshToken },
    {
      headers: { "Content-Type": "application/json" },
      timeout: 10_000,
    },
  );
  const inner = unwrapNestPayload<{
    accessToken?: string;
    refreshToken?: string;
  }>(res.data);
  const accessToken = inner?.accessToken;
  const nextRefresh = inner?.refreshToken;
  if (typeof accessToken !== "string" || typeof nextRefresh !== "string") {
    throw new Error("Invalid refresh response");
  }
  return { accessToken, refreshToken: nextRefresh };
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:8888";

/** Full-page navigation into the backend's Google OAuth flow (must leave the SPA). */
export function startGoogleOAuth(): void {
  window.location.href = `${API_BASE_URL}/auth/google`;
}

/** Full-page navigation into the backend's Facebook OAuth flow. */
export function startFacebookOAuth(): void {
  window.location.href = `${API_BASE_URL}/auth/facebook`;
}

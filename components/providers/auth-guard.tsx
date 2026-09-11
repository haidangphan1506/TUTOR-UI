"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/providers/auth.provider";

/**
 * Protects the authenticated `(app)` route group.
 *
 * - Renders the app shell optimistically as soon as an `accessToken` exists, so
 *   the UI is never blocked behind a background session-verify round-trip (which
 *   would hang on a slow or unreachable backend).
 * - Session validity is verified in the background by `AuthProvider`; the axios
 *   401 interceptor clears auth and redirects when the token is actually invalid.
 * - With no token at all (once `isAuthReady`), redirect to `/login`.
 */
export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { accessToken, isAuthReady } = useAuth();

  useEffect(() => {
    if (isAuthReady && !accessToken) {
      router.replace("/login");
    }
  }, [isAuthReady, accessToken, router]);

  if (!accessToken) {
    return (
      <div
        className="flex min-h-screen w-full items-center justify-center bg-background"
        role="status"
        aria-live="polite"
      >
        <span className="sr-only">Checking your session…</span>
        <span className="size-6 animate-spin rounded-full border-2 border-muted border-t-primary" />
      </div>
    );
  }

  return <>{children}</>;
};

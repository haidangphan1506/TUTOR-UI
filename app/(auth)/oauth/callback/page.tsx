import { Suspense } from "react";

import { OAuthCallback } from "@/components/auth/oauth-callback";
import { AuthScreen } from "@/components/auth/auth-ui";

export const metadata = {
  title: "Đang đăng nhập… | Tutor Pro",
  description: "Hoàn tất đăng nhập",
};

export default function OAuthCallbackPage() {
  return (
    <AuthScreen>
      <Suspense
        fallback={
          <div className="relative z-10 h-72 w-full max-w-[26.5rem] animate-pulse rounded-3xl bg-white/90 shadow-2xl shadow-emerald-950/40" />
        }
      >
        <OAuthCallback />
      </Suspense>
    </AuthScreen>
  );
}

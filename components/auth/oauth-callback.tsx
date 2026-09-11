"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/components/providers/auth.provider";
import { useAuthCopy } from "@/hooks/useAuthCopy.hook";
import { AuthCardShell } from "./auth-ui";

export function OAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuthTokens } = useAuth();
  const { oauthCallback: t } = useAuthCopy();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) {
      return;
    }
    handled.current = true;

    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (!accessToken) {
      router.replace("/login?error=oauth_failed");
      return;
    }

    setAuthTokens({ accessToken, refreshToken });
    router.replace("/");
  }, [searchParams, setAuthTokens, router]);

  return (
    <AuthCardShell
      icon={<Loader2 className="size-6 animate-spin" aria-hidden />}
      title={t.title}
      subtitle={t.subtitle}
      showBadge={false}
    >
      <p className="py-4 text-center text-sm text-slate-500">
        {t.waitMessage}
      </p>
    </AuthCardShell>
  );
}

export default OAuthCallback;

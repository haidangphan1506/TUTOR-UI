"use client";

import Link from "next/link";

import { useAuthCopy } from "@/hooks/useAuthCopy.hook";

export function LoginTopRight() {
  const { login: t } = useAuthCopy();

  return (
    <p className="text-sm text-muted-foreground">
      {t.noAccount}{" "}
      <Link
        href="/register"
        className="font-semibold text-primary hover:text-primary-hover"
      >
        {t.registerNow}
      </Link>
    </p>
  );
}

export function RegisterTopRight() {
  const { register: t } = useAuthCopy();

  return (
    <p className="text-sm text-muted-foreground">
      {t.haveAccount}{" "}
      <Link
        href="/login"
        className="font-semibold text-primary hover:text-primary-hover"
      >
        {t.signIn}
      </Link>
    </p>
  );
}

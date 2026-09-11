import type { ComponentProps, ReactNode } from "react";

import { Card, CardContent } from "@/components/ui";
import { cn } from "@/lib/utils";

export function AuthPageShell({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("auth-page", className)} {...props}>
      <AuthWaveBackground />
      {children}
    </div>
  );
}

export function AuthWaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <svg
        className="absolute bottom-0 h-[min(80vh,560px)] w-full min-h-[420px] text-auth-wave-tint"
        preserveAspectRatio="none"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,144C672,107,768,53,864,53.3C960,53,1056,107,1152,117.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="currentColor"
          fillOpacity={0.4}
        />
        <path
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,202.7C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="var(--auth-wave-mid)"
          fillOpacity={0.55}
        />
        <path
          d="M0,256L48,256C96,256,192,256,288,240C384,224,480,192,576,192C672,192,768,224,864,229.3C960,235,1056,213,1152,197.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="var(--auth-wave-deep)"
          fillOpacity={0.75}
        />
      </svg>
    </div>
  );
}

type AuthFormFrameProps = ComponentProps<"div"> & {
  wide?: boolean;
};

export function AuthFormFrame({
  wide,
  className,
  ...props
}: AuthFormFrameProps) {
  return (
    <div
      className={cn(
        wide ? "auth-form-frame-wide" : "auth-form-frame",
        className,
      )}
      {...props}
    />
  );
}

export function AuthCard({ className, ...props }: ComponentProps<typeof Card>) {
  return <Card className={cn("auth-card", className)} {...props} />;
}

export function AuthCardContent({
  className,
  ...props
}: ComponentProps<typeof CardContent>) {
  return (
    <CardContent className={cn("auth-card-content", className)} {...props} />
  );
}

type AuthCardHeaderProps = {
  icon: ReactNode;
  title: string;
  description?: ReactNode;
  compact?: boolean;
  descriptionClassName?: string;
};

export function AuthCardHeader({
  icon,
  title,
  description,
  compact,
  descriptionClassName,
}: AuthCardHeaderProps) {
  return (
    <div className={compact ? "auth-card-header-compact" : "auth-card-header"}>
      <div className="auth-icon-badge">{icon}</div>
      <h1 className="auth-title">{title}</h1>
      {description ? (
        <p className={cn("auth-description", descriptionClassName)}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function AuthCardSkeleton({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div className={cn("auth-card-skeleton", className)} {...props} />;
}

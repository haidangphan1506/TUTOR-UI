import { AuthGuard } from "@/components/providers/auth-guard";
import { RoleGuard } from "@/components/providers/role-guard";

export default function FlowRequestsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthGuard>
      <RoleGuard allow={["ADMIN"]}>
        <div className="min-h-screen w-full bg-[#020617]">{children}</div>
      </RoleGuard>
    </AuthGuard>
  );
}

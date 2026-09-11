import Link from "next/link";

const SidebarHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-start h-[54px] gap-2 w-64 py-[6px] px-3">
      {children}
    </div>
  );
};

const SidebarContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-1 px-2">{children}</div>;
};

const SidebarItem = ({
  children,
  href,
  isActive = false,
}: {
  children: React.ReactNode;
  href: string;
  isActive?: boolean;
}) => {
  return (
    <Link
      className={`flex h-9 w-full items-center gap-2 rounded-lg px-2 text-[13px] transition-colors ${
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground font-normal"
      }`}
      href={href}
    >
      {children}
    </Link>
  );
};

const SidebarSubItem = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return <Link href={href}>{children}</Link>;
};

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside className="flex h-screen w-64 flex-col overflow-hidden bg-sidebar">
      {children}
    </aside>
  );
};

export {
  SidebarHeader,
  SidebarContent,
  SidebarItem,
  SidebarSubItem,
  SidebarProvider,
};

import type { Metadata } from "next";

import { AccountsPage } from "@/components/accounts";

export const metadata: Metadata = {
  title: "Accounts",
};

export default function Page() {
  return <AccountsPage />;
}

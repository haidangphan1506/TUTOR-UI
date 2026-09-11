"use client";

import { useMemo, useState } from "react";
import {
  Banknote,
  CreditCard,
  Landmark,
  Plus,
  Smartphone,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

import { StatCard } from "@/components/dashboard";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { Button } from "@/components/ui/button.ui";
import { useAccountsCopy } from "@/hooks/useAccountsCopy.hook";
import { AccountDetailCard } from "./account-detail-card";
import {
  formatBalance,
  isSameMonth,
  MOCK_ACCOUNTS,
  MOCK_TRANSACTIONS,
  WALLET_TYPE_COLOR,
  WALLET_TYPES,
  type Account,
  type AccountFormValues,
  type ApiTransaction,
  type WalletApiType,
} from "./accounts.data";
import { WalletFormDialog } from "./wallet-form-dialog";
import { DeleteWalletDialog } from "./delete-wallet-dialog";
import UsageGuides, {
  type UsageGuideStep,
} from "@/components/ui/usage-guide.ui";

// ── Helpers ───────────────────────────────────────────────────────────────────

const TYPE_ICON: Record<WalletApiType, typeof Wallet> = {
  CASH: Wallet,
  BANK: Landmark,
  E_WALLET: Smartphone,
  CREDIT: CreditCard,
};

// ── Constants ─────────────────────────────────────────────────────────────────

type TypeFilter = "All" | WalletApiType;
const TYPE_FILTERS: TypeFilter[] = ["All", ...WALLET_TYPES];

type FormState = {
  open: boolean;
  mode: "add" | "edit";
  account: Account | null;
};

const USAGE_GUIDE_STEPS: UsageGuideStep[] = [
  {
    n: 1,
    title: "Thêm ví / tài khoản",
    body: (
      <>
        Nhấn nút <span className="font-semibold">+ Thêm</span> ở góc trên để
        tạo ví mới: chọn loại, số dư ban đầu, đơn vị tiền tệ.
      </>
    ),
  },
  {
    n: 2,
    title: "Lọc theo loại",
    body: "Dùng các nút Tiền mặt / Ngân hàng / Ví điện tử / Thẻ tín dụng để thu hẹp danh sách ví hiển thị.",
  },
  {
    n: 3,
    title: "Sửa hoặc xoá ví",
    body: "Mỗi thẻ ví có biểu tượng sửa/xoá riêng — sửa để cập nhật số dư, tên, ghi chú; xoá để gỡ ví khỏi danh sách.",
  },
  {
    n: 4,
    title: "Phân bổ số dư",
    body: "Xem tỉ lệ số dư giữa các ví ở mục Phân bổ số dư cuối trang; ví đang âm (nợ) được highlight riêng.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export const AccountsPage = () => {
  const copy = useAccountsCopy();
  const [accounts, setAccounts] = useState<Account[]>(MOCK_ACCOUNTS);
  const [transactions] = useState<ApiTransaction[]>(MOCK_TRANSACTIONS);

  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [form, setForm] = useState<FormState>({
    open: false,
    mode: "add",
    account: null,
  });
  const [deleteTarget, setDeleteTarget] = useState<Account | null>(null);

  const transactionsByWallet = useMemo(() => {
    const map = new Map<string, ApiTransaction[]>();
    for (const tx of transactions) {
      const list = map.get(tx.walletId);
      if (list) {
        list.push(tx);
      } else {
        map.set(tx.walletId, [tx]);
      }
    }
    for (const list of map.values()) {
      list.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }
    return map;
  }, [transactions]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const openAdd = () => setForm({ open: true, mode: "add", account: null });
  const openEdit = (account: Account) =>
    setForm({ open: true, mode: "edit", account });
  const closeForm = () => setForm((prev) => ({ ...prev, open: false }));

  const handleSubmit = (values: AccountFormValues) => {
    if (form.mode === "edit" && form.account) {
      const id = form.account.id;
      setAccounts((prev) =>
        prev.map((a) =>
          a.id === id
            ? {
                ...a,
                name: values.name,
                type: values.type,
                balance: values.balance,
                currency: values.currency,
                note: values.note || undefined,
                isDefault: values.isDefault,
              }
            : a,
        ),
      );
      toast.success(copy.toasts.updated(values.name));
    } else {
      const newAccount: Account = {
        id: `acc-${Date.now()}`,
        name: values.name,
        type: values.type,
        balance: values.balance,
        currency: values.currency,
        note: values.note || undefined,
        isDefault: values.isDefault,
        isActive: true,
      };
      setAccounts((prev) => [...prev, newAccount]);
      toast.success(copy.toasts.created(values.name));
    }
    closeForm();
  };

  const handleDelete = (account: Account) => {
    setAccounts((prev) => prev.filter((a) => a.id !== account.id));
    toast.success(copy.toasts.deleted);
    setDeleteTarget(null);
  };

  // ── Derived state ─────────────────────────────────────────────────────────

  const filtered = useMemo(
    () => accounts.filter((a) => typeFilter === "All" || a.type === typeFilter),
    [accounts, typeFilter],
  );

  const stats = useMemo(() => {
    const assets = accounts
      .filter((a) => a.balance >= 0)
      .reduce((s, a) => s + a.balance, 0);
    const debt = accounts
      .filter((a) => a.balance < 0)
      .reduce((s, a) => s + a.balance, 0);
    const creditAccounts = accounts.filter((a) => a.balance < 0);
    const totalAbsBalance = accounts.reduce(
      (s, a) => s + Math.abs(a.balance),
      0,
    );
    return {
      net: assets + debt,
      assets,
      debt,
      creditAccounts,
      totalAbsBalance,
    };
  }, [accounts]);

  const now = useMemo(() => new Date(), []);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-4 pb-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="page-title">{copy.page.heading}</h1>
          <p className="page-description">{copy.page.description}</p>
        </div>
        <Button size="default" className="w-auto gap-2 px-4" onClick={openAdd}>
          <Plus className="size-4" />
          {copy.page.addAccount}
        </Button>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          title={copy.stats.totalAssets}
          value={formatBalance(stats.assets, "USD")}
          change={copy.stats.accountsCount(accounts.length)}
          icon={<Banknote className="size-4" />}
          captionOnly
        />
        <StatCard
          title={copy.stats.totalDebt}
          value={formatBalance(stats.debt, "USD")}
          change={copy.stats.creditAccountsCount(stats.creditAccounts.length)}
          icon={<TrendingDown className="size-4" />}
          captionOnly
        />
        <StatCard
          title={copy.stats.netWorth}
          value={formatBalance(stats.net, "USD")}
          change={copy.stats.netWorthChange}
          icon={<Wallet className="size-4" />}
          positive
        />
      </section>

      <div className="flex flex-wrap items-center gap-2">
        {TYPE_FILTERS.map((filter) => {
          const active = typeFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setTypeFilter(filter)}
              className={`inline-flex h-8 items-center rounded-full px-3 text-xs font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "border text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {filter === "All" ? copy.filters.all : copy.walletTypes[filter]}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          {copy.emptyState.noAccountsMatch}
        </p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((account) => {
            const walletTx = transactionsByWallet.get(account.id) ?? [];
            const monthTx = walletTx.filter((tx) =>
              isSameMonth(tx.createdAt, now),
            );
            const monthlyIncome = monthTx
              .filter((tx) => tx.type === "INCOME")
              .reduce((s, tx) => s + Number(tx.amount), 0);
            const monthlyExpense = monthTx
              .filter((tx) => tx.type === "EXPENSE")
              .reduce((s, tx) => s + Number(tx.amount), 0);

            return (
              <AccountDetailCard
                key={account.id}
                account={account}
                icon={TYPE_ICON[account.type]}
                transactionCountThisMonth={monthTx.length}
                monthlyIncome={monthlyIncome}
                monthlyExpense={monthlyExpense}
                recentTransactions={walletTx.slice(0, 4)}
                onEdit={openEdit}
                onDelete={setDeleteTarget}
              />
            );
          })}
        </div>
      )}

      {accounts.length > 0 ? (
        <DashboardSection
          title={copy.balanceDistribution.title}
          subtitle={copy.balanceDistribution.subtitle}
        >
          <div className="space-y-3">
            {accounts.map((account) => {
              const color = WALLET_TYPE_COLOR[account.type];
              const percent =
                stats.totalAbsBalance > 0
                  ? (Math.abs(account.balance) / stats.totalAbsBalance) * 100
                  : 0;
              return (
                <div key={account.id} className="flex items-center gap-3">
                  <span className="flex w-28 shrink-0 items-center gap-2 text-sm">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="truncate">{account.name}</span>
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${percent}%`, backgroundColor: color }}
                    />
                  </div>
                  <span className="w-10 shrink-0 text-right text-xs text-muted-foreground tabular-nums">
                    {percent.toFixed(0)}%
                  </span>
                  <span className="w-24 shrink-0 text-right text-sm font-medium tabular-nums">
                    {formatBalance(account.balance, account.currency)}
                  </span>
                </div>
              );
            })}
          </div>

          {stats.creditAccounts.length > 0 ? (
            <div className="mt-4 space-y-2">
              {stats.creditAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between rounded-lg bg-negative/10 px-4 py-3"
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-negative">
                    <TrendingDown className="size-4" />
                    {account.name} {copy.balanceDistribution.debtSuffix}
                  </span>
                  <span className="text-sm font-semibold text-negative tabular-nums">
                    {formatBalance(account.balance, account.currency)}{" "}
                    {copy.balanceDistribution.outstandingBalanceSuffix}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </DashboardSection>
      ) : null}

      {form.open ? (
        <WalletFormDialog
          key={form.account?.id ?? "new"}
          open={form.open}
          mode={form.mode}
          initial={form.account}
          onClose={closeForm}
          onSubmit={handleSubmit}
        />
      ) : null}

      <DeleteWalletDialog
        account={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />

      <UsageGuides steps={USAGE_GUIDE_STEPS} />
    </div>
  );
};

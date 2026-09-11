export type WalletApiType = "CASH" | "BANK" | "E_WALLET" | "CREDIT";

export const WALLET_TYPES: WalletApiType[] = [
  "CASH",
  "BANK",
  "E_WALLET",
  "CREDIT",
];

export const WALLET_TYPE_LABEL: Record<WalletApiType, string> = {
  CASH: "Cash",
  BANK: "Bank",
  E_WALLET: "E-Wallet",
  CREDIT: "Credit",
};

export const WALLET_TYPE_COLOR: Record<WalletApiType, string> = {
  CASH: "#f59e0b",
  BANK: "#3b82f6",
  E_WALLET: "#8b5cf6",
  CREDIT: "#f43f5e",
};

export type Account = {
  id: string;
  name: string;
  type: WalletApiType;
  balance: number;
  currency: string;
  note?: string;
  isDefault?: boolean;
  isActive?: boolean;
};

export type AccountFormValues = {
  name: string;
  type: WalletApiType;
  balance: number;
  currency: string;
  note: string;
  isDefault: boolean;
};

export const DEFAULT_ACCOUNT_FORM: AccountFormValues = {
  name: "",
  type: "BANK",
  balance: 0,
  currency: "VND",
  note: "",
  isDefault: false,
};

export function formatBalance(value: number, currency: string): string {
  try {
    return new Intl.NumberFormat(currency === "VND" ? "vi-VN" : "en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${value.toLocaleString()} ${currency}`;
  }
}

export type TransactionApiType = "INCOME" | "EXPENSE";

export type ApiTransaction = {
  id: string;
  name: string;
  userId: string;
  walletId: string;
  categoryId: string;
  amount: string;
  note: string | null;
  type: TransactionApiType;
  status: string;
  createdAt: string;
  updatedAt: string;
  category: { id: string; name: string; type: string };
  wallet: { id: string; name: string };
};

export function formatSignedAmount(
  amount: number,
  type: TransactionApiType,
  currency: string,
): string {
  const sign = type === "INCOME" ? "+" : "-";
  return `${sign}${formatBalance(Math.abs(amount), currency)}`;
}

export function isSameMonth(iso: string, reference: Date): boolean {
  const d = new Date(iso);
  return (
    d.getFullYear() === reference.getFullYear() &&
    d.getMonth() === reference.getMonth()
  );
}

// ── Mock data ─────────────────────────────────────────────────────────────────

export const MOCK_ACCOUNTS: Account[] = [
  {
    id: "acc-checking",
    name: "Checking",
    type: "BANK",
    balance: 12480,
    currency: "USD",
    isDefault: true,
    isActive: true,
  },
  {
    id: "acc-savings",
    name: "Savings",
    type: "BANK",
    balance: 9870,
    currency: "USD",
    isDefault: false,
    isActive: true,
  },
  {
    id: "acc-credit",
    name: "Credit Card",
    type: "CREDIT",
    balance: -2500,
    currency: "USD",
    isDefault: false,
    isActive: true,
  },
  {
    id: "acc-cash",
    name: "Cash",
    type: "CASH",
    balance: 500,
    currency: "USD",
    isDefault: false,
    isActive: true,
  },
];

function mockTx(
  id: string,
  walletId: string,
  walletName: string,
  name: string,
  categoryName: string,
  amount: number,
  type: TransactionApiType,
  day: number,
): ApiTransaction {
  const createdAt = new Date(2026, 5, day).toISOString();
  return {
    id,
    name,
    userId: "mock-user",
    walletId,
    categoryId: `cat-${categoryName.toLowerCase().replace(/\s+/g, "-")}`,
    amount: String(amount),
    note: null,
    type,
    status: "COMPLETED",
    createdAt,
    updatedAt: createdAt,
    category: {
      id: `cat-${categoryName.toLowerCase().replace(/\s+/g, "-")}`,
      name: categoryName,
      type,
    },
    wallet: { id: walletId, name: walletName },
  };
}

export const MOCK_TRANSACTIONS: ApiTransaction[] = [
  mockTx(
    "tx-1",
    "acc-checking",
    "Checking",
    "Monthly Salary",
    "Salary",
    6500,
    "INCOME",
    28,
  ),
  mockTx(
    "tx-2",
    "acc-checking",
    "Checking",
    "Airbnb Design Work",
    "Freelance",
    1200,
    "INCOME",
    27,
  ),
  mockTx(
    "tx-3",
    "acc-checking",
    "Checking",
    "Rent Payment",
    "Housing",
    1200,
    "EXPENSE",
    25,
  ),
  mockTx(
    "tx-4",
    "acc-checking",
    "Checking",
    "Electric Bill",
    "Utilities",
    92,
    "EXPENSE",
    17,
  ),
  mockTx(
    "tx-4b",
    "acc-checking",
    "Checking",
    "Bonus",
    "Salary",
    800,
    "INCOME",
    15,
  ),
  mockTx(
    "tx-4c",
    "acc-checking",
    "Checking",
    "Bank Fee",
    "Fees",
    65,
    "EXPENSE",
    10,
  ),
  mockTx(
    "tx-4d",
    "acc-checking",
    "Checking",
    "Interest",
    "Investments",
    350,
    "INCOME",
    5,
  ),

  mockTx(
    "tx-5",
    "acc-savings",
    "Savings",
    "Dividend Payment",
    "Investments",
    500,
    "INCOME",
    21,
  ),

  mockTx(
    "tx-6",
    "acc-credit",
    "Credit Card",
    "Whole Foods Market",
    "Groceries",
    187,
    "EXPENSE",
    26,
  ),
  mockTx(
    "tx-7",
    "acc-credit",
    "Credit Card",
    "Uber Ride",
    "Transport",
    28,
    "EXPENSE",
    24,
  ),
  mockTx(
    "tx-8",
    "acc-credit",
    "Credit Card",
    "Netflix Subscription",
    "Entertainment",
    18,
    "EXPENSE",
    23,
  ),
  mockTx(
    "tx-9",
    "acc-credit",
    "Credit Card",
    "Zara Online",
    "Shopping",
    145,
    "EXPENSE",
    22,
  ),
  mockTx(
    "tx-9b",
    "acc-credit",
    "Credit Card",
    "Gas Station",
    "Transport",
    90,
    "EXPENSE",
    21,
  ),
  mockTx(
    "tx-9c",
    "acc-credit",
    "Credit Card",
    "Gym Membership",
    "Health",
    75,
    "EXPENSE",
    20,
  ),
  mockTx(
    "tx-9d",
    "acc-credit",
    "Credit Card",
    "Amazon Purchase",
    "Shopping",
    60,
    "EXPENSE",
    19,
  ),
  mockTx(
    "tx-9e",
    "acc-credit",
    "Credit Card",
    "Spotify",
    "Entertainment",
    55,
    "EXPENSE",
    18,
  ),
  mockTx(
    "tx-9f",
    "acc-credit",
    "Credit Card",
    "Restaurant",
    "Dining",
    70,
    "EXPENSE",
    16,
  ),
  mockTx(
    "tx-9g",
    "acc-credit",
    "Credit Card",
    "Drugstore",
    "Health",
    65,
    "EXPENSE",
    14,
  ),
  mockTx(
    "tx-9h",
    "acc-credit",
    "Credit Card",
    "Parking",
    "Transport",
    50,
    "EXPENSE",
    12,
  ),
  mockTx(
    "tx-9i",
    "acc-credit",
    "Credit Card",
    "Online Course",
    "Education",
    65,
    "EXPENSE",
    10,
  ),
  mockTx(
    "tx-9j",
    "acc-credit",
    "Credit Card",
    "Hardware Store",
    "Shopping",
    80,
    "EXPENSE",
    8,
  ),
  mockTx(
    "tx-9k",
    "acc-credit",
    "Credit Card",
    "Bookstore",
    "Shopping",
    50,
    "EXPENSE",
    5,
  ),

  mockTx("tx-10", "acc-cash", "Cash", "Chipotle", "Dining", 14, "EXPENSE", 20),
  mockTx("tx-11", "acc-cash", "Cash", "Pharmacy", "Health", 34, "EXPENSE", 12),
  mockTx(
    "tx-12",
    "acc-cash",
    "Cash",
    "Coffee Shop",
    "Dining",
    22,
    "EXPENSE",
    8,
  ),
  mockTx(
    "tx-13",
    "acc-cash",
    "Cash",
    "Bus Pass",
    "Transport",
    80,
    "EXPENSE",
    7,
  ),
  mockTx(
    "tx-13b",
    "acc-cash",
    "Cash",
    "Vending Machine",
    "Dining",
    32,
    "EXPENSE",
    5,
  ),
  mockTx("tx-13c", "acc-cash", "Cash", "Tip", "Other", 25, "EXPENSE", 3),
];

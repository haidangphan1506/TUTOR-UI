import type { Language } from "@/types";

export type AccountsDictionary = {
  page: {
    heading: string;
    description: string;
    addAccount: string;
  };
  stats: {
    totalAssets: string;
    totalDebt: string;
    netWorth: string;
    netWorthChange: string;
    accountsCount: (count: number) => string;
    creditAccountsCount: (count: number) => string;
  };
  filters: {
    all: string;
  };
  walletTypes: {
    CASH: string;
    BANK: string;
    E_WALLET: string;
    CREDIT: string;
  };
  emptyState: {
    noAccountsMatch: string;
  };
  balanceDistribution: {
    title: string;
    subtitle: string;
    debtSuffix: string;
    outstandingBalanceSuffix: string;
  };
  card: {
    transactionsThisMonth: (count: number) => string;
    currentBalance: string;
    income: string;
    expenses: string;
    recentTransactions: string;
    noTransactionsYet: string;
    editAria: (name: string) => string;
    deleteAria: (name: string) => string;
  };
  form: {
    addTitle: string;
    editTitle: string;
    addSubtitle: string;
    editSubtitle: string;
    saving: string;
    saveChanges: string;
    nameLabel: string;
    namePlaceholder: string;
    typeLabel: string;
    balanceLabel: string;
    currencyLabel: string;
    noteLabel: string;
    noteOptional: string;
    notePlaceholder: string;
    setDefault: string;
    errors: {
      nameRequired: string;
      balanceNegative: string;
      currencyInvalid: string;
    };
  };
  deleteDialog: {
    title: string;
    subtitle: string;
    deleting: string;
    confirmPrefix: string;
    confirmSuffix: string;
  };
  toasts: {
    updated: (name: string) => string;
    created: (name: string) => string;
    deleted: string;
  };
};

const vi: AccountsDictionary = {
  page: {
    heading: "Tài khoản",
    description: "Toàn bộ ví, tài khoản ngân hàng và thẻ tín dụng của bạn tại một nơi.",
    addAccount: "Thêm tài khoản",
  },
  stats: {
    totalAssets: "Tổng tài sản",
    totalDebt: "Tổng nợ",
    netWorth: "Tài sản ròng",
    netWorthChange: "+12.4% so với tháng trước",
    accountsCount: (count) => `${count} tài khoản`,
    creditAccountsCount: (count) => `${count} tài khoản tín dụng`,
  },
  filters: {
    all: "Tất cả",
  },
  walletTypes: {
    CASH: "Tiền mặt",
    BANK: "Ngân hàng",
    E_WALLET: "Ví điện tử",
    CREDIT: "Tín dụng",
  },
  emptyState: {
    noAccountsMatch: "Không có tài khoản nào khớp với bộ lọc này.",
  },
  balanceDistribution: {
    title: "Phân bổ số dư",
    subtitle: "Tỷ trọng danh mục theo từng tài khoản",
    debtSuffix: "nợ",
    outstandingBalanceSuffix: "dư nợ",
  },
  card: {
    transactionsThisMonth: (count) => `${count} giao dịch trong tháng này`,
    currentBalance: "Số dư hiện tại",
    income: "Thu nhập",
    expenses: "Chi tiêu",
    recentTransactions: "Giao dịch gần đây",
    noTransactionsYet: "Chưa có giao dịch nào.",
    editAria: (name) => `Chỉnh sửa ${name}`,
    deleteAria: (name) => `Xóa ${name}`,
  },
  form: {
    addTitle: "Tài khoản mới",
    editTitle: "Chỉnh sửa tài khoản",
    addSubtitle: "Thêm ví hoặc tài khoản ngân hàng để theo dõi số dư.",
    editSubtitle: "Cập nhật thông tin tài khoản của bạn.",
    saving: "Đang lưu…",
    saveChanges: "Lưu thay đổi",
    nameLabel: "Tên tài khoản",
    namePlaceholder: "vd. Tài khoản ngân hàng chính",
    typeLabel: "Loại tài khoản",
    balanceLabel: "Số dư",
    currencyLabel: "Đơn vị tiền tệ",
    noteLabel: "Ghi chú",
    noteOptional: "(không bắt buộc)",
    notePlaceholder: "Ghi chú về tài khoản này…",
    setDefault: "Đặt làm tài khoản mặc định",
    errors: {
      nameRequired: "Vui lòng nhập tên tài khoản.",
      balanceNegative: "Số dư không được nhỏ hơn 0.",
      currencyInvalid: "Đơn vị tiền tệ phải gồm 3 ký tự (vd. VND, USD).",
    },
  },
  deleteDialog: {
    title: "Xóa tài khoản",
    subtitle: "Hành động này không thể hoàn tác.",
    deleting: "Đang xóa…",
    confirmPrefix: "Bạn có chắc chắn muốn xóa",
    confirmSuffix:
      "? Các giao dịch liên kết với tài khoản này có thể bị ảnh hưởng.",
  },
  toasts: {
    updated: (name) => `Đã cập nhật "${name}"`,
    created: (name) => `Đã tạo "${name}"`,
    deleted: "Đã xóa tài khoản",
  },
};

const en: AccountsDictionary = {
  page: {
    heading: "Accounts",
    description: "All your wallets, bank and credit accounts in one place.",
    addAccount: "Add account",
  },
  stats: {
    totalAssets: "Total Assets",
    totalDebt: "Total Debt",
    netWorth: "Net Worth",
    netWorthChange: "+12.4% vs last month",
    accountsCount: (count) => `${count} account${count === 1 ? "" : "s"}`,
    creditAccountsCount: (count) =>
      `${count} credit account${count === 1 ? "" : "s"}`,
  },
  filters: {
    all: "All",
  },
  walletTypes: {
    CASH: "Cash",
    BANK: "Bank",
    E_WALLET: "E-Wallet",
    CREDIT: "Credit",
  },
  emptyState: {
    noAccountsMatch: "No accounts match this filter.",
  },
  balanceDistribution: {
    title: "Balance Distribution",
    subtitle: "Portfolio allocation across accounts",
    debtSuffix: "debt",
    outstandingBalanceSuffix: "outstanding balance",
  },
  card: {
    transactionsThisMonth: (count) =>
      `${count} transaction${count === 1 ? "" : "s"} this month`,
    currentBalance: "Current balance",
    income: "Income",
    expenses: "Expenses",
    recentTransactions: "Recent transactions",
    noTransactionsYet: "No transactions yet.",
    editAria: (name) => `Edit ${name}`,
    deleteAria: (name) => `Delete ${name}`,
  },
  form: {
    addTitle: "New account",
    editTitle: "Edit account",
    addSubtitle: "Add a wallet or bank account to track your balance.",
    editSubtitle: "Update your account details.",
    saving: "Saving…",
    saveChanges: "Save changes",
    nameLabel: "Name",
    namePlaceholder: "e.g. Main Bank Account",
    typeLabel: "Type",
    balanceLabel: "Balance",
    currencyLabel: "Currency",
    noteLabel: "Note",
    noteOptional: "(optional)",
    notePlaceholder: "Any notes about this account…",
    setDefault: "Set as default account",
    errors: {
      nameRequired: "Account name is required.",
      balanceNegative: "Balance cannot be negative.",
      currencyInvalid: "Currency must be a 3-letter code (e.g. VND, USD).",
    },
  },
  deleteDialog: {
    title: "Delete account",
    subtitle: "This action cannot be undone.",
    deleting: "Deleting…",
    confirmPrefix: "Are you sure you want to delete",
    confirmSuffix:
      "? All transactions linked to this account may be affected.",
  },
  toasts: {
    updated: (name) => `Updated "${name}"`,
    created: (name) => `Created "${name}"`,
    deleted: "Account deleted",
  },
};

export const accountsDictionary: Record<Language, AccountsDictionary> = {
  vi,
  en,
};

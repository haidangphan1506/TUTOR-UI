import type { Language } from "@/types";

export type TransactionsDictionary = {
  stats: {
    totalIncome: string;
    totalExpenses: string;
    netCashFlow: string;
    transactions: string;
    incomeCount: (count: number) => string;
    expenseCount: (count: number) => string;
    thisMonth: string;
    totalRecorded: string;
  };
  section: {
    title: string;
  };
  toolbar: {
    searchPlaceholder: string;
    filter: string;
  };
  table: {
    selectAll: string;
    transaction: string;
    category: string;
    account: string;
    type: string;
    amount: string;
    typeIncome: string;
    typeExpense: string;
    selectRow: (name: string) => string;
    noMatch: string;
  };
  pagination: {
    showing: (from: number, to: number, total: number) => string;
    perPage: string;
    firstPage: string;
    previousPage: string;
    nextPage: string;
    lastPage: string;
    pageOf: (current: number, total: number) => string;
  };
};

const vi: TransactionsDictionary = {
  stats: {
    totalIncome: "Tổng thu nhập",
    totalExpenses: "Tổng chi tiêu",
    netCashFlow: "Dòng tiền ròng",
    transactions: "Giao dịch",
    incomeCount: (count) => `${count} giao dịch`,
    expenseCount: (count) => `${count} giao dịch`,
    thisMonth: "Tháng này",
    totalRecorded: "Tổng số đã ghi nhận",
  },
  section: {
    title: "Giao dịch",
  },
  toolbar: {
    searchPlaceholder: "Tìm kiếm giao dịch...",
    filter: "Bộ lọc",
  },
  table: {
    selectAll: "Chọn tất cả giao dịch",
    transaction: "Giao dịch",
    category: "Danh mục",
    account: "Tài khoản",
    type: "Loại",
    amount: "Số tiền",
    typeIncome: "Thu nhập",
    typeExpense: "Chi tiêu",
    selectRow: (name) => `Chọn ${name}`,
    noMatch: "Không có giao dịch nào khớp với bộ lọc của bạn.",
  },
  pagination: {
    showing: (from, to, total) => `Hiển thị ${from}–${to} trong ${total}`,
    perPage: "Số dòng / trang",
    firstPage: "Trang đầu",
    previousPage: "Trang trước",
    nextPage: "Trang sau",
    lastPage: "Trang cuối",
    pageOf: (current, total) => `${current} / ${total}`,
  },
};

const en: TransactionsDictionary = {
  stats: {
    totalIncome: "Total Income",
    totalExpenses: "Total Expenses",
    netCashFlow: "Net Cash Flow",
    transactions: "Transactions",
    incomeCount: (count) => `${count} transactions`,
    expenseCount: (count) => `${count} transactions`,
    thisMonth: "This month",
    totalRecorded: "Total recorded",
  },
  section: {
    title: "Transactions",
  },
  toolbar: {
    searchPlaceholder: "Search transactions...",
    filter: "Filter",
  },
  table: {
    selectAll: "Select all transactions",
    transaction: "Transaction",
    category: "Category",
    account: "Account",
    type: "Type",
    amount: "Amount",
    typeIncome: "Income",
    typeExpense: "Expense",
    selectRow: (name) => `Select ${name}`,
    noMatch: "No transactions match your filters.",
  },
  pagination: {
    showing: (from, to, total) => `Showing ${from}–${to} of ${total}`,
    perPage: "Per page",
    firstPage: "First page",
    previousPage: "Previous page",
    nextPage: "Next page",
    lastPage: "Last page",
    pageOf: (current, total) => `${current} / ${total}`,
  },
};

export const transactionsDictionary: Record<Language, TransactionsDictionary> = {
  vi,
  en,
};

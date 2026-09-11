export type CategoryType = "Income" | "Expense";

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: CategoryType;
  parent?: string;
  txCount: number;
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Salary",
    icon: "💼",
    color: "#22c55e",
    type: "Income",
    txCount: 12,
  },
  {
    id: "2",
    name: "Freelance",
    icon: "🧑‍💻",
    color: "#10b981",
    type: "Income",
    txCount: 8,
  },
  {
    id: "3",
    name: "Investments",
    icon: "📈",
    color: "#14b8a6",
    type: "Income",
    txCount: 5,
  },
  {
    id: "4",
    name: "Food & Dining",
    icon: "🍽️",
    color: "#e8743b",
    type: "Expense",
    txCount: 64,
  },
  {
    id: "5",
    name: "Restaurants",
    icon: "🍜",
    color: "#f97316",
    type: "Expense",
    parent: "Food & Dining",
    txCount: 21,
  },
  {
    id: "6",
    name: "Groceries",
    icon: "🛒",
    color: "#fb923c",
    type: "Expense",
    parent: "Food & Dining",
    txCount: 43,
  },
  {
    id: "7",
    name: "Housing",
    icon: "🏠",
    color: "#3b82f6",
    type: "Expense",
    txCount: 6,
  },
  {
    id: "8",
    name: "Transport",
    icon: "🚗",
    color: "#06b6d4",
    type: "Expense",
    txCount: 29,
  },
  {
    id: "9",
    name: "Shopping",
    icon: "🛍️",
    color: "#8b5cf6",
    type: "Expense",
    txCount: 18,
  },
  {
    id: "10",
    name: "Entertainment",
    icon: "🎬",
    color: "#22c55e",
    type: "Expense",
    txCount: 14,
  },
  {
    id: "11",
    name: "Health",
    icon: "💊",
    color: "#f43f5e",
    type: "Expense",
    txCount: 9,
  },
  {
    id: "12",
    name: "Utilities",
    icon: "💡",
    color: "#7dd3fc",
    type: "Expense",
    txCount: 11,
  },
];

export const CATEGORY_COLORS = [
  "#22c55e",
  "#10b981",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#e8743b",
  "#f97316",
  "#f43f5e",
  "#eab308",
  "#94a3b8",
];

export const CATEGORY_ICONS = [
  "💼",
  "🧑‍💻",
  "📈",
  "🍽️",
  "🛒",
  "🏠",
  "🚗",
  "🛍️",
  "🎬",
  "💊",
  "💡",
  "✈️",
  "📚",
  "🎁",
  "💰",
];

/** Form payload (no id / derived fields). */
export type CategoryFormValues = {
  name: string;
  type: CategoryType;
  icon: string;
  color: string;
  parent?: string;
};

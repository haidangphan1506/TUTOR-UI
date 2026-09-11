import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Props as DotProps } from "recharts/types/cartesian/Line";

import { useDashboardCopy } from "@/hooks/useDashboardCopy.hook";

const DATA = [
  { month: "Jan", income: 7800, expense: 3200 },
  { month: "Feb", income: 8100, expense: 3500 },
  { month: "Mar", income: 7500, expense: 4100 },
  { month: "Apr", income: 8600, expense: 3800 },
  { month: "May", income: 9000, expense: 3600 },
  { month: "Jun", income: 8200, expense: 3400 },
  { month: "Jul", income: 8700, expense: 3900 },
  { month: "Aug", income: 9200, expense: 3700 },
  { month: "Sep", income: 8400, expense: 4000 },
  { month: "Oct", income: 9100, expense: 3500 },
  { month: "Nov", income: 8800, expense: 3300 },
  { month: "Dec", income: 9500, expense: 3600 },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);

const CustomDot = (color: string) => {
  const Dot = (props: DotProps) => {
    const { cx, cy } = props;
    if (cx == null || cy == null) return null;
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="#fff"
          stroke={color}
          strokeWidth={2}
        />
        <circle cx={cx} cy={cy} r={3} fill={color} />
      </g>
    );
  };
  Dot.displayName = "CustomDot";
  return Dot;
};

const CustomActiveDot = (color: string) => {
  const ActiveDot = (props: DotProps) => {
    const { cx, cy } = props;
    if (cx == null || cy == null) return null;
    return (
      <g>
        <circle cx={cx} cy={cy} r={10} fill={color} fillOpacity={0.2} />
        <circle
          cx={cx}
          cy={cy}
          r={7}
          fill="#fff"
          stroke={color}
          strokeWidth={2.5}
        />
        <circle cx={cx} cy={cy} r={4} fill={color} />
      </g>
    );
  };
  ActiveDot.displayName = "CustomActiveDot";
  return ActiveDot;
};

export const IncomeExpenseChartCard = () => {
  const copy = useDashboardCopy();

  return (
    <section className="rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h2 className="text-sm font-semibold">
          {copy.incomeExpenseChart.title}
        </h2>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-[#2563eb]" />
            {copy.incomeExpenseChart.income}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-[#ef4444]" />
            {copy.incomeExpenseChart.expenses}
          </span>
        </div>
      </div>

      <div className="p-5">
        {/* <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={DATA}
          margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid hsl(var(--border))",
              background: "hsl(var(--card))",
              fontSize: 12,
            }}
            formatter={(value, name) => [
              formatCurrency(Number(value)),
              name === "income" ? "Income" : "Expenses",
            ]}
          />
          <Legend
            verticalAlign="bottom"
            iconType="rect"
            iconSize={10}
            formatter={(value: string) => (
              <span
                style={{ color: "hsl(var(--muted-foreground))", fontSize: 12 }}
              >
                {value === "income" ? "Income" : "Expenses"}
              </span>
            )}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#2563eb"
            strokeWidth={3}
            dot={CustomDot("#2563eb")}
            activeDot={CustomActiveDot("#2563eb")}
            name="income"
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={3}
            dot={CustomDot("#ef4444")}
            activeDot={CustomActiveDot("#ef4444")}
            name="expense"
          />
        </LineChart>
      </ResponsiveContainer> */}
      </div>
    </section>
  );
};

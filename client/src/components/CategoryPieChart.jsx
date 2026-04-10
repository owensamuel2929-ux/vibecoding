import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#3b82f6", "#ec4899", "#14b8a6", "#f97316"];

export default function CategoryPieChart({ data }) {
  if (!data?.length) return null;

  return (
    <div className="bg-slate-800 rounded-xl p-5 mb-6">
      <h2 className="text-slate-300 font-semibold mb-4">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
            labelLine={{ stroke: "#475569" }}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: 8 }}
            formatter={(value) => [`$${value.toLocaleString()}`, "Amount"]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

export default function SpendingChart({ data }) {
  if (!data?.length) {
    return (
      <div className="bg-slate-800 rounded-xl p-5 mb-6 flex items-center justify-center h-64">
        <p className="text-slate-500">No data yet — upload a CSV to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl p-5 mb-6">
      <h2 className="text-slate-300 font-semibold mb-4">Monthly Overview</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} tickFormatter={(v) => `$${v.toLocaleString()}`} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: 8 }}
            formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
          />
          <Legend wrapperStyle={{ color: "#94a3b8" }} />
          <Bar dataKey="income" fill="#34d399" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

import { useState } from "react";
import { updateCategory } from "../api";

const CATEGORIES = [
  "Groceries", "Dining & Restaurants", "Transport", "Entertainment",
  "Health & Fitness", "Utilities", "Shopping", "Travel",
  "Rent & Housing", "Income", "Uncategorized",
];

export default function TransactionTable({ transactions, onRefresh }) {
  const [editingId, setEditingId] = useState(null);

  async function handleCategoryChange(id, category) {
    await updateCategory(id, category);
    setEditingId(null);
    onRefresh();
  }

  if (!transactions?.length) {
    return <p className="text-slate-500 text-sm">No transactions found.</p>;
  }

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700">
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
              <td className="px-4 py-3 text-slate-400">{tx.date}</td>
              <td className="px-4 py-3 text-slate-200 max-w-xs truncate">{tx.description}</td>
              <td className="px-4 py-3">
                {editingId === tx.id ? (
                  <select
                    autoFocus
                    defaultValue={tx.category}
                    onChange={(e) => handleCategoryChange(tx.id, e.target.value)}
                    onBlur={() => setEditingId(null)}
                    className="bg-slate-700 text-slate-200 rounded px-2 py-1 text-xs"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                ) : (
                  <span
                    onClick={() => setEditingId(tx.id)}
                    className="text-slate-300 cursor-pointer hover:text-white text-xs bg-slate-700 px-2 py-1 rounded"
                  >
                    {tx.category}
                  </span>
                )}
              </td>
              <td className={`px-4 py-3 text-right font-medium ${tx.type === "income" ? "text-green-400" : "text-red-400"}`}>
                {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

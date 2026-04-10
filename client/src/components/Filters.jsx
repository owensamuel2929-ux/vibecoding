const CATEGORIES = [
  "", "Groceries", "Dining & Restaurants", "Transport", "Entertainment",
  "Health & Fitness", "Utilities", "Shopping", "Travel", "Rent & Housing", "Income", "Uncategorized",
];

export default function Filters({ filters, onChange }) {
  return (
    <div className="flex gap-3 mb-4 flex-wrap">
      <input
        type="month"
        value={filters.month || ""}
        onChange={(e) => onChange({ ...filters, month: e.target.value })}
        className="bg-slate-700 text-slate-200 rounded-lg px-3 py-2 text-sm"
      />
      <select
        value={filters.category || ""}
        onChange={(e) => onChange({ ...filters, category: e.target.value })}
        className="bg-slate-700 text-slate-200 rounded-lg px-3 py-2 text-sm"
      >
        <option value="">All Categories</option>
        {CATEGORIES.filter(Boolean).map((c) => <option key={c}>{c}</option>)}
      </select>
      <select
        value={filters.type || ""}
        onChange={(e) => onChange({ ...filters, type: e.target.value })}
        className="bg-slate-700 text-slate-200 rounded-lg px-3 py-2 text-sm"
      >
        <option value="">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      {(filters.month || filters.category || filters.type) && (
        <button
          onClick={() => onChange({})}
          className="text-slate-400 hover:text-white text-sm px-2"
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default function SummaryCards({ summary }) {
  const cards = [
    { label: "Income", value: summary?.income ?? 0, color: "text-green-400" },
    { label: "Expenses", value: summary?.expenses ?? 0, color: "text-red-400" },
    { label: "Net Savings", value: summary?.net ?? 0, color: summary?.net >= 0 ? "text-blue-400" : "text-orange-400" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {cards.map((card) => (
        <div key={card.label} className="bg-slate-800 rounded-xl p-5">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{card.label}</p>
          <p className={`text-2xl font-bold ${card.color}`}>
            ${Math.abs(card.value).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
      ))}
    </div>
  );
}

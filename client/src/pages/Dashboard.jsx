import { useEffect, useState } from "react";
import UploadCSV from "../components/UploadCSV";
import SummaryCards from "../components/SummaryCards";
import SpendingChart from "../components/SpendingChart";
import CategoryPieChart from "../components/CategoryPieChart";
import TransactionTable from "../components/TransactionTable";
import GoalsPanel from "../components/GoalsPanel";
import Filters from "../components/Filters";
import { getSummary, getByMonth, getByCategory, getTransactions, getGoals } from "../api";

const TABS = ["Overview", "Transactions", "Goals"];

export default function Dashboard() {
  const [tab, setTab] = useState("Overview");
  const [filters, setFilters] = useState({});
  const [summary, setSummary] = useState(null);
  const [byMonth, setByMonth] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);

  async function loadAll() {
    const [s, m, c, t, g] = await Promise.all([
      getSummary(filters.month),
      getByMonth(),
      getByCategory(filters.month),
      getTransactions(filters),
      getGoals(),
    ]);
    setSummary(s);
    setByMonth(m);
    setByCategory(c);
    setTransactions(t);
    setGoals(g);
  }

  useEffect(() => { loadAll(); }, [filters]);

  return (
    <div className="min-h-screen bg-slate-900 p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Finance Dashboard</h1>
        <div className="flex gap-1 bg-slate-800 rounded-lg p-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-md text-sm transition-colors
                ${tab === t ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <UploadCSV onUpload={loadAll} />

      {tab === "Overview" && (
        <>
          <SummaryCards summary={summary} />
          <SpendingChart data={byMonth} />
          <CategoryPieChart data={byCategory} />
        </>
      )}

      {tab === "Transactions" && (
        <>
          <Filters filters={filters} onChange={setFilters} />
          <SummaryCards summary={summary} />
          <TransactionTable transactions={transactions} onRefresh={loadAll} />
        </>
      )}

      {tab === "Goals" && (
        <GoalsPanel goals={goals} onRefresh={loadAll} />
      )}
    </div>
  );
}

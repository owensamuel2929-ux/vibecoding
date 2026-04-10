import { useState } from "react";
import { createGoal, updateGoal, deleteGoal } from "../api";

export default function GoalsPanel({ goals, onRefresh }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", target_amount: "", current_amount: "", deadline: "" });

  async function handleCreate(e) {
    e.preventDefault();
    await createGoal({
      name: form.name,
      target_amount: parseFloat(form.target_amount),
      current_amount: parseFloat(form.current_amount) || 0,
      deadline: form.deadline || null,
    });
    setForm({ name: "", target_amount: "", current_amount: "", deadline: "" });
    setShowForm(false);
    onRefresh();
  }

  async function handleDelete(id) {
    await deleteGoal(id);
    onRefresh();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-slate-300 font-semibold">Savings Goals</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors"
        >
          + New Goal
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-slate-700 rounded-xl p-4 mb-4 grid grid-cols-2 gap-3">
          <input
            required placeholder="Goal name"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-slate-600 text-slate-200 rounded px-3 py-2 text-sm col-span-2"
          />
          <input
            required type="number" placeholder="Target amount"
            value={form.target_amount} onChange={(e) => setForm({ ...form, target_amount: e.target.value })}
            className="bg-slate-600 text-slate-200 rounded px-3 py-2 text-sm"
          />
          <input
            type="number" placeholder="Already saved"
            value={form.current_amount} onChange={(e) => setForm({ ...form, current_amount: e.target.value })}
            className="bg-slate-600 text-slate-200 rounded px-3 py-2 text-sm"
          />
          <input
            type="date" placeholder="Deadline (optional)"
            value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            className="bg-slate-600 text-slate-200 rounded px-3 py-2 text-sm"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white rounded px-3 py-2 text-sm transition-colors">
            Save Goal
          </button>
        </form>
      )}

      <div className="space-y-3">
        {goals?.length === 0 && <p className="text-slate-500 text-sm">No goals yet. Create one to get started.</p>}
        {goals?.map((goal) => {
          const pct = Math.min((goal.current_amount / goal.target_amount) * 100, 100);
          return (
            <div key={goal.id} className="bg-slate-800 rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-slate-200 font-medium">{goal.name}</p>
                  {goal.deadline && <p className="text-slate-500 text-xs">by {goal.deadline}</p>}
                </div>
                <button onClick={() => handleDelete(goal.id)} className="text-slate-600 hover:text-red-400 text-xs transition-colors">
                  Delete
                </button>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 mb-1">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-slate-400 text-xs">
                ${goal.current_amount.toLocaleString()} / ${goal.target_amount.toLocaleString()}
                <span className="ml-2 text-slate-500">({pct.toFixed(0)}%)</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

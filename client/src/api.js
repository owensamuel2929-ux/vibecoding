const BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function uploadCSV(file) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${BASE}/upload`, { method: "POST", body: form });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getSummary(month) {
  const params = month ? `?month=${month}` : "";
  const res = await fetch(`${BASE}/transactions/summary${params}`);
  return res.json();
}

export async function getByMonth() {
  const res = await fetch(`${BASE}/transactions/by-month`);
  return res.json();
}

export async function getByCategory(month) {
  const params = month ? `?month=${month}` : "";
  const res = await fetch(`${BASE}/transactions/by-category${params}`);
  return res.json();
}

export async function getTransactions(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE}/transactions${params ? "?" + params : ""}`);
  return res.json();
}

export async function updateCategory(id, category) {
  const res = await fetch(`${BASE}/transactions/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category }),
  });
  return res.json();
}

export async function getGoals() {
  const res = await fetch(`${BASE}/goals`);
  return res.json();
}

export async function createGoal(goal) {
  const res = await fetch(`${BASE}/goals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  });
  return res.json();
}

export async function updateGoal(id, data) {
  const res = await fetch(`${BASE}/goals/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteGoal(id) {
  const res = await fetch(`${BASE}/goals/${id}`, { method: "DELETE" });
  return res.json();
}

const express = require("express");
const { read, write } = require("../db");

const router = express.Router();

function toYearMonth(dateStr) {
  // handles YYYY-MM-DD or MM/DD/YYYY
  if (!dateStr) return "";
  if (dateStr.includes("-")) return dateStr.slice(0, 7);
  const parts = dateStr.split("/");
  if (parts.length === 3) return `${parts[2]}-${parts[0].padStart(2, "0")}`;
  return "";
}

// GET /transactions?month=2026-03&category=Groceries&type=expense
router.get("/", (req, res) => {
  const { month, category, type } = req.query;
  let rows = read().transactions;

  if (month) rows = rows.filter((t) => toYearMonth(t.date) === month);
  if (category) rows = rows.filter((t) => t.category === category);
  if (type) rows = rows.filter((t) => t.type === type);

  rows.sort((a, b) => (b.date > a.date ? 1 : -1));
  res.json(rows);
});

// GET /transactions/summary?month=2026-03
router.get("/summary", (req, res) => {
  const { month } = req.query;
  let rows = read().transactions;
  if (month) rows = rows.filter((t) => toYearMonth(t.date) === month);

  const income = rows.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = rows.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  res.json({
    income: parseFloat(income.toFixed(2)),
    expenses: parseFloat(expenses.toFixed(2)),
    net: parseFloat((income - expenses).toFixed(2)),
  });
});

// GET /transactions/by-month
router.get("/by-month", (req, res) => {
  const rows = read().transactions;
  const map = {};

  for (const t of rows) {
    const month = toYearMonth(t.date);
    if (!month) continue;
    if (!map[month]) map[month] = { month, income: 0, expenses: 0 };
    if (t.type === "income") map[month].income += t.amount;
    else map[month].expenses += t.amount;
  }

  const result = Object.values(map)
    .sort((a, b) => (a.month > b.month ? 1 : -1))
    .map((m) => ({
      month: m.month,
      income: parseFloat(m.income.toFixed(2)),
      expenses: parseFloat(m.expenses.toFixed(2)),
    }));

  res.json(result);
});

// GET /transactions/by-category?month=2026-03
router.get("/by-category", (req, res) => {
  const { month } = req.query;
  let rows = read().transactions.filter((t) => t.type === "expense");
  if (month) rows = rows.filter((t) => toYearMonth(t.date) === month);

  const map = {};
  for (const t of rows) {
    map[t.category] = (map[t.category] || 0) + t.amount;
  }

  const result = Object.entries(map)
    .map(([category, total]) => ({ category, total: parseFloat(total.toFixed(2)) }))
    .sort((a, b) => b.total - a.total);

  res.json(result);
});

// PATCH /transactions/:id
router.patch("/:id", (req, res) => {
  const { category } = req.body;
  if (!category) return res.status(400).json({ error: "category required" });

  const db = read();
  const tx = db.transactions.find((t) => t.id === req.params.id);
  if (!tx) return res.status(404).json({ error: "Not found" });

  tx.category = category;
  write(db);
  res.json({ success: true });
});

module.exports = router;

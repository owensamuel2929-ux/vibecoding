const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { read, write } = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(read().goals);
});

router.post("/", (req, res) => {
  const { name, target_amount, current_amount = 0, deadline } = req.body;
  if (!name || !target_amount) {
    return res.status(400).json({ error: "name and target_amount required" });
  }

  const goal = { id: uuidv4(), name, target_amount, current_amount, deadline: deadline || null };
  const db = read();
  db.goals.unshift(goal);
  write(db);

  res.json({ id: goal.id });
});

router.patch("/:id", (req, res) => {
  const db = read();
  const goal = db.goals.find((g) => g.id === req.params.id);
  if (!goal) return res.status(404).json({ error: "Goal not found" });

  const { name, target_amount, current_amount, deadline } = req.body;
  if (name !== undefined) goal.name = name;
  if (target_amount !== undefined) goal.target_amount = target_amount;
  if (current_amount !== undefined) goal.current_amount = current_amount;
  if (deadline !== undefined) goal.deadline = deadline;

  write(db);
  res.json({ success: true });
});

router.delete("/:id", (req, res) => {
  const db = read();
  db.goals = db.goals.filter((g) => g.id !== req.params.id);
  write(db);
  res.json({ success: true });
});

module.exports = router;

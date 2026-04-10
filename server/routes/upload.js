const express = require("express");
const multer = require("multer");
const Papa = require("papaparse");
const { v4: uuidv4 } = require("uuid");
const { read, write } = require("../db");
const { normalizeRows } = require("../utils/parser");
const { categorize } = require("../utils/categorize");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const csvText = req.file.buffer.toString("utf8");
  const { data, errors } = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  if (errors.length && !data.length) {
    return res.status(400).json({ error: "Failed to parse CSV" });
  }

  const normalized = normalizeRows(data);
  if (!normalized.length) {
    return res.status(400).json({ error: "No valid transactions found in CSV" });
  }

  const db = read();

  for (const row of normalized) {
    db.transactions.push({
      id: uuidv4(),
      date: row.date,
      description: row.description,
      amount: row.amount,
      type: row.type,
      category: row.type === "income" ? "Income" : categorize(row.description),
      source_file: req.file.originalname,
    });
  }

  write(db);

  res.json({ count: normalized.length, filename: req.file.originalname });
});

module.exports = router;

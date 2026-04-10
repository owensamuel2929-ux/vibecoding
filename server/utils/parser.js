// Maps different bank CSV formats to a normalized shape
const BANK_FORMATS = {
  chase: {
    date: "Transaction Date",
    description: "Description",
    amount: "Amount",
  },
  bofa: {
    date: "Date",
    description: "Payee",
    amount: "Amount",
  },
  generic: {
    date: "Date",
    description: "Description",
    amount: "Amount",
  },
};

function detectFormat(headers) {
  if (headers.includes("Transaction Date")) return "chase";
  if (headers.includes("Payee")) return "bofa";
  return "generic";
}

function normalizeRows(rows) {
  if (!rows.length) return [];

  const headers = Object.keys(rows[0]);
  const format = detectFormat(headers);
  const map = BANK_FORMATS[format];

  return rows
    .filter((row) => row[map.date] && row[map.amount])
    .map((row) => {
      const rawAmount = parseFloat(
        String(row[map.amount]).replace(/[^0-9.\-]/g, "")
      );
      if (isNaN(rawAmount)) return null;

      return {
        date: row[map.date].trim(),
        description: row[map.description]?.trim() || "Unknown",
        amount: Math.abs(rawAmount),
        type: rawAmount < 0 ? "expense" : "income",
      };
    })
    .filter(Boolean);
}

module.exports = { normalizeRows };

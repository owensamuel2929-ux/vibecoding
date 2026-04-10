const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "db.json");

const EMPTY = { transactions: [], goals: [] };

function read() {
  if (!fs.existsSync(DB_PATH)) return structuredClone(EMPTY);
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
  } catch {
    return structuredClone(EMPTY);
  }
}

function write(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
}

module.exports = { read, write };

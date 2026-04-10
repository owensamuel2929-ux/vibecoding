const express = require("express");
const cors = require("cors");

const uploadRoute = require("./routes/upload");
const transactionsRoute = require("./routes/transactions");
const goalsRoute = require("./routes/goals");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.use("/upload", uploadRoute);
app.use("/transactions", transactionsRoute);
app.use("/goals", goalsRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

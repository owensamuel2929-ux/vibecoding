const RULES = [
  { category: "Rent & Housing", keywords: ["rent", "mortgage", "hoa", "apartment"] },
  { category: "Groceries", keywords: ["whole foods", "trader joe", "kroger", "safeway", "aldi", "publix", "costco", "walmart", "target", "sprouts"] },
  { category: "Dining & Restaurants", keywords: ["mcdonald", "starbucks", "chipotle", "doordash", "ubereats", "grubhub", "restaurant", "pizza", "sushi", "cafe", "diner"] },
  { category: "Transport", keywords: ["uber", "lyft", "gas", "shell", "chevron", "bp", "exxon", "parking", "metro", "transit", "toll"] },
  { category: "Entertainment", keywords: ["netflix", "spotify", "hulu", "disney", "apple tv", "youtube", "cinema", "movie", "steam", "xbox", "playstation"] },
  { category: "Health & Fitness", keywords: ["gym", "fitness", "cvs", "walgreens", "pharmacy", "doctor", "dental", "hospital", "clinic"] },
  { category: "Utilities", keywords: ["electric", "water", "gas bill", "internet", "comcast", "att", "verizon", "t-mobile", "phone"] },
  { category: "Shopping", keywords: ["amazon", "ebay", "etsy", "zara", "h&m", "gap", "nike", "adidas"] },
  { category: "Travel", keywords: ["airbnb", "hotel", "airline", "delta", "united", "southwest", "expedia", "booking.com"] },
  { category: "Income", keywords: ["payroll", "salary", "deposit", "direct dep", "transfer in", "zelle", "venmo credit"] },
];

function categorize(description) {
  const lower = description.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.category;
    }
  }
  return "Uncategorized";
}

module.exports = { categorize };

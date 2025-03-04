export interface TableToken {
  tokenCode: string;
  propertyLocation: string;
  propertyType: "commercial" | "residential" | "agricultural" | "recreational";
  boughtDate: string;
  amount: number;
  profitLoss: number;
  tokenPrice: number;
  costPrice: number; // Added costPrice
  dailyPrices: number[];
}

function generateDailyPrices(basePrice: number): number[] {
  const dailyPrices = [];
  for (let i = 0; i < 29; i++) {
    // Generate 29 random prices
    const dailyPriceChange = basePrice * (1 + (Math.random() * 0.2 - 0.1));
    dailyPrices.push(parseFloat(dailyPriceChange.toFixed(2)));
  }
  dailyPrices.push(basePrice); // Set the last price as tokenPrice
  return dailyPrices;
}

export const tokens: TableToken[] = [
  {
    tokenCode: "KTM-1154W5",
    propertyLocation: "Kathmandu Ward 1",
    propertyType: "commercial",
    boughtDate: "2023-01-01",
    amount: 10,
    costPrice: 950, // Assume a costPrice
    tokenPrice: 1000,
    profitLoss: 0, // Will be recalculated
    dailyPrices: generateDailyPrices(1000),
  },
  {
    tokenCode: "KTM-1154W6",
    propertyLocation: "Kathmandu Ward 2",
    propertyType: "residential",
    boughtDate: "2023-02-01",
    amount: 20,
    costPrice: 530, // Assume a costPrice
    tokenPrice: 500,
    profitLoss: 0, // Will be recalculated
    dailyPrices: generateDailyPrices(500),
  },
  {
    tokenCode: "KTM-1154W7",
    propertyLocation: "Kathmandu Ward 2",
    propertyType: "residential",
    boughtDate: "2023-02-01",
    amount: 20,
    costPrice: 680, // Assume a costPrice
    tokenPrice: 700,
    profitLoss: 0, // Will be recalculated
    dailyPrices: generateDailyPrices(700),
  },
  {
    tokenCode: "KTM-1154W8",
    propertyLocation: "Kathmandu Ward 8",
    propertyType: "residential",
    boughtDate: "2023-02-01",
    amount: 20,
    costPrice: 490, // Assume a costPrice
    tokenPrice: 500,
    profitLoss: 0, // Will be recalculated
    dailyPrices: generateDailyPrices(500),
  },
  {
    tokenCode: "KTM-1154W9",
    propertyLocation: "Kathmandu Ward 9",
    propertyType: "residential",
    boughtDate: "2023-02-01",
    amount: 20,
    costPrice: 810, // Assume a costPrice
    tokenPrice: 800,
    profitLoss: 0, // Will be recalculated
    dailyPrices: generateDailyPrices(800),
  },
];

// Update profitLoss for each token based on costPrice and tokenPrice
tokens.forEach((token) => {
  token.profitLoss = (
    ((token.tokenPrice - token.costPrice) / token.costPrice) *
    100
  ).toFixed(2);
});

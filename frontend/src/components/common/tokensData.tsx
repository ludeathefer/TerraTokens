import { ChartDataPoint } from "./Graphs";

export interface LatLang {
  latitude: string;
  longitude: string;
}

export interface TableToken {
  tokenCode: string;
  propertyLocation: string;
  propertyType: "commercial" | "residential" | "agricultural" | "recreational";
  boughtDate: string | Date;
  amount: number;
  profitLoss: number;
  tokenPrice: number;
  costPrice: number; // Added costPrice
  dailyPrices: number[];
  size: number;
  chartData: ChartDataPoint[];
  latLang: LatLang;
}

function generateRandomLatLang() {
  // Latitude range for Kathmandu (approximately)
  const latMin = 27.5;
  const latMax = 27.8;
  // Longitude range for Kathmandu (approximately)
  const lngMin = 85.2;
  const lngMax = 85.4;

  const latitude = (Math.random() * (latMax - latMin) + latMin).toFixed(2); // Random latitude
  const longitude = (Math.random() * (lngMax - lngMin) + lngMin).toFixed(2); // Random longitude

  return { latitude, longitude };
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
function generateChartData(basePrice: number): ChartDataPoint[] {
  const chartData = [];
  const dailyPrice = generateDailyPrices(basePrice);
  for (let i = 0; i < 29; i++) {
    chartData.push({ day: `Day ${i + 1}`, value: dailyPrice[i] });
  }
  return chartData;
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
    size: 4,
    chartData: generateChartData(1000),
    latLang: generateRandomLatLang(),
  },
  {
    tokenCode: "KTM-1154W6",
    propertyLocation: "Kathmandu Ward 2",
    propertyType: "residential",
    boughtDate: "2025-03-02",
    amount: 20,
    costPrice: 530, // Assume a costPrice
    tokenPrice: 500,
    profitLoss: 0, // Will be recalculated
    dailyPrices: generateDailyPrices(500),
    size: 4,
    chartData: generateChartData(500),
    latLang: generateRandomLatLang(),
  },
  {
    tokenCode: "KTM-1154W7",
    propertyLocation: "Kathmandu Ward 2",
    propertyType: "residential",
    boughtDate: "2025-03-01",
    amount: 20,
    costPrice: 680, // Assume a costPrice
    tokenPrice: 700,
    profitLoss: 0, // Will be recalculated
    dailyPrices: generateDailyPrices(700),
    size: 4,
    chartData: generateChartData(700),
    latLang: generateRandomLatLang(),
  },
  {
    tokenCode: "KTM-1154W8",
    propertyLocation: "Kathmandu Ward 8",
    propertyType: "residential",
    boughtDate: "2025-03-03",
    amount: 20,
    costPrice: 490, // Assume a costPrice
    tokenPrice: 500,
    profitLoss: 0, // Will be recalculated
    dailyPrices: generateDailyPrices(500),
    size: 4,
    chartData: generateChartData(500),
    latLang: generateRandomLatLang(),
  },
  {
    tokenCode: "KTM-1154W9",
    propertyLocation: "Kathmandu Ward 9",
    propertyType: "residential",
    boughtDate: "2025-03-02",
    amount: 20,
    costPrice: 810, // Assume a costPrice
    tokenPrice: 800,
    profitLoss: 0, // Will be recalculated
    dailyPrices: generateDailyPrices(800),
    size: 4,
    chartData: generateChartData(800),
    latLang: generateRandomLatLang(),
  },
  {
    tokenCode: "KTM-1154W52",
    propertyLocation: "Kathmandu Ward 2",
    propertyType: "residential",
    boughtDate: "2025-03-02",
    amount: 20,
    costPrice: 530, // Assume a costPrice
    tokenPrice: 500,
    profitLoss: 0, // Will be recalculated
    dailyPrices: generateDailyPrices(500),
    size: 4,
    chartData: generateChartData(500),
    latLang: generateRandomLatLang(),
  },
  {
    tokenCode: "KTM-1154W53",
    propertyLocation: "Kathmandu Ward 2",
    propertyType: "residential",
    boughtDate: "2025-03-01",
    amount: 20,
    costPrice: 680, // Assume a costPrice
    tokenPrice: 700,
    profitLoss: 0, // Will be recalculated
    dailyPrices: generateDailyPrices(700),
    size: 4,
    chartData: generateChartData(700),
    latLang: generateRandomLatLang(),
  },
  {
    tokenCode: "KTM-1154W54",
    propertyLocation: "Kathmandu Ward 8",
    propertyType: "residential",
    boughtDate: "2025-03-03",
    amount: 20,
    costPrice: 490, // Assume a costPrice
    tokenPrice: 500,
    profitLoss: 0, // Will be recalculated
    dailyPrices: generateDailyPrices(500),
    size: 4,
    chartData: generateChartData(500),
    latLang: generateRandomLatLang(),
  },
  {
    tokenCode: "KTM-1154W55",
    propertyLocation: "Kathmandu Ward 9",
    propertyType: "residential",
    boughtDate: "2025-03-02",
    amount: 20,
    costPrice: 810, // Assume a costPrice
    tokenPrice: 800,
    profitLoss: 0, // Will be recalculated
    dailyPrices: generateDailyPrices(800),
    size: 4,
    chartData: generateChartData(800),
    latLang: generateRandomLatLang(),
  },
];

// Update profitLoss for each token based on costPrice and tokenPrice
tokens.forEach((token) => {
  token.profitLoss = (
    ((token.tokenPrice - token.costPrice) / token.costPrice) *
    100
  ).toFixed(2);
});

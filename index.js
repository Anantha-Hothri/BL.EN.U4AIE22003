// File: Q1/index.js

const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;
const TEST_API_BASE = "http://20.244.56.144/evaluation-service";
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const headers = { Authorization: `Bearer ${AUTH_TOKEN}` };

app.use(cors());

const cache = new Map();

function calculateAverage(prices) {
  const total = prices.reduce((sum, entry) => sum + entry.price, 0);
  return total / prices.length;
}

function stdDev(values) {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

function pearsonCorrelation(x, y) {
  const n = x.length;
  const meanX = x.reduce((a, b) => a + b) / n;
  const meanY = y.reduce((a, b) => a + b) / n;
  const numerator = x.reduce((sum, xi, i) => sum + (xi - meanX) * (y[i] - meanY), 0);
  const denominator = Math.sqrt(
    x.reduce((sum, xi) => sum + (xi - meanX) ** 2, 0) *
    y.reduce((sum, yi) => sum + (yi - meanY) ** 2, 0)
  );
  return numerator / denominator;
}

async function getPriceHistory(ticker, minutes) {
  const cacheKey = `${ticker}_${minutes}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);
  const url = `${TEST_API_BASE}/stocks/${ticker}?minutes=${minutes}`;
  const response = await axios.get(url, { headers });
  cache.set(cacheKey, response.data);
  return response.data;
}

app.get("/stocks/:ticker", async (req, res) => {
  try {
    const { ticker } = req.params;
    const { minutes, aggregation } = req.query;
    if (!minutes || aggregation !== "average") return res.status(400).json({ message: "Invalid query" });

    const priceHistory = await getPriceHistory(ticker, minutes);
    const averageStockPrice = calculateAverage(priceHistory);

    res.json({ averageStockPrice, priceHistory });
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/stockcorrelation", async (req, res) => {
  try {
    const { minutes, ticker } = req.query;
    if (!minutes || !ticker || ticker.length !== 2) {
      return res.status(400).json({ message: "Provide exactly 2 tickers" });
    }
    const [tickerA, tickerB] = ticker;
    const historyA = await getPriceHistory(tickerA, minutes);
    const historyB = await getPriceHistory(tickerB, minutes);

    const minLen = Math.min(historyA.length, historyB.length);
    const x = historyA.slice(0, minLen).map((p) => p.price);
    const y = historyB.slice(0, minLen).map((p) => p.price);

    const correlation = pearsonCorrelation(x, y);

    res.json({
      correlation,
      stocks: {
        [tickerA]: {
          averagePrice: calculateAverage(x),
          priceHistory: historyA
        },
        [tickerB]: {
          averagePrice: calculateAverage(y),
          priceHistory: historyB
        }
      }
    });
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Q1 Backend running at http://localhost:${PORT}`);
});

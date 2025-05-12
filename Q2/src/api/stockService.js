// Q2/src/api/stockService.js
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const fetchStockData = (ticker, minutes) =>
  axios.get(`${BASE_URL}/stocks/${ticker}`, {
    params: { minutes, aggregation: "average" },
  });

export const fetchStockCorrelation = (ticker1, ticker2, minutes) =>
  axios.get(`${BASE_URL}/stockcorrelation`, {
    params: { minutes, ticker: [ticker1, ticker2] },
  });
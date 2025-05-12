// Q2/src/pages/StockPage.jsx
import React, { useState, useEffect } from "react";
import { fetchStockData } from "../api/stockService";
import StockChart from "../components/StockChart";
import TimeSelector from "../components/TimeSelector";
import { Container, Typography, TextField } from "@mui/material";

export default function StockPage() {
  const [ticker, setTicker] = useState("AAPL");
  const [minutes, setMinutes] = useState(10);
  const [data, setData] = useState([]);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    fetchStockData(ticker, minutes).then((res) => {
      setData(res.data.priceHistory);
      setAvg(res.data.averageStockPrice);
    });
  }, [ticker, minutes]);

  return (
    <Container>
      <Typography variant="h4">Stock Viewer</Typography>
      <TextField label="Ticker" value={ticker} onChange={(e) => setTicker(e.target.value)} />
      <TimeSelector value={minutes} onChange={(e) => setMinutes(e.target.value)} />
      <StockChart data={data} average={avg} />
    </Container>
  );
}

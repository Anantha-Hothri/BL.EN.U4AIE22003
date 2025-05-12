// Q2/src/pages/CorrelationPage.jsx
import React, { useState, useEffect } from "react";
import { fetchStockCorrelation } from "../api/stockService";
import CorrelationHeatmap from "../components/CorrelationHeatmap";
import TimeSelector from "../components/TimeSelector";
import { Container, Typography } from "@mui/material";

const tickers = ["AAPL", "MSFT", "GOOG", "AMZN", "TSLA"];

export default function CorrelationPage() {
  const [minutes, setMinutes] = useState(10);
  const [matrix, setMatrix] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const mtx = [];
    const newStats = {};

    const loadData = async () => {
      for (let i = 0; i < tickers.length; i++) {
        mtx[i] = [];
        for (let j = 0; j < tickers.length; j++) {
          if (i === j) {
            mtx[i][j] = 1;
          } else {
            const res = await fetchStockCorrelation(tickers[i], tickers[j], minutes);
            mtx[i][j] = res.data.pearsonCoefficient;
            newStats[tickers[i]] = {
              avg: res.data.average1,
              std: res.data.std1,
            };
            newStats[tickers[j]] = {
              avg: res.data.average2,
              std: res.data.std2,
            };
          }
        }
      }
      setMatrix(mtx);
      setStats(newStats);
    };

    loadData();
  }, [minutes]);

  return (
    <Container>
      <Typography variant="h4">Correlation Heatmap</Typography>
      <TimeSelector value={minutes} onChange={(e) => setMinutes(e.target.value)} />
      <CorrelationHeatmap tickers={tickers} matrix={matrix} stats={stats} />
    </Container>
  );
}
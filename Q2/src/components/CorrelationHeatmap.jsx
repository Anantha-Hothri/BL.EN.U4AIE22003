// Q2/src/components/CorrelationHeatmap.jsx
import React from "react";
import { Table, TableBody, TableCell, TableRow, TableHead, Tooltip } from "@mui/material";

export default function CorrelationHeatmap({ tickers, matrix, stats }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {tickers.map((t) => (
              <Tooltip title={`Avg: ${stats[t].avg}, StdDev: ${stats[t].std}`} key={t}>
                <TableCell>{t}</TableCell>
              </Tooltip>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tickers.map((rowTicker, i) => (
            <TableRow key={rowTicker}>
              <Tooltip title={`Avg: ${stats[rowTicker].avg}, StdDev: ${stats[rowTicker].std}`}>
                <TableCell>{rowTicker}</TableCell>
              </Tooltip>
              {tickers.map((colTicker, j) => (
                <TableCell
                  key={j}
                  style={{
                    backgroundColor: `rgba(0, 255, 0, ${matrix[i][j]})`,
                    color: "#000",
                  }}
                >
                  {matrix[i][j].toFixed(2)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

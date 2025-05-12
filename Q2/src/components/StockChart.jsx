// Q2/src/components/StockChart.jsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

export default function StockChart({ data, average }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Stock Price Chart</Typography>
        <LineChart width={800} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" name="Price" />
          <Line
            type="monotone"
            dataKey={() => average}
            stroke="#FF0000"
            dot={false}
            name="Average"
          />
        </LineChart>
      </CardContent>
    </Card>
  );
}
// Q2/src/components/TimeSelector.jsx
import React from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function TimeSelector({ value, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel>Time (minutes)</InputLabel>
      <Select value={value} label="Time (minutes)" onChange={onChange}>
        {[5, 10, 15, 30, 60].map((min) => (
          <MenuItem key={min} value={min}>{min}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
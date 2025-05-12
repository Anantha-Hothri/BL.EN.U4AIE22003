// Q2/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StockPage from "./pages/StockPage";
import CorrelationPage from "./pages/CorrelationPage";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Stock</Button>
          <Button color="inherit" component={Link} to="/correlation">Correlation</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<StockPage />} />
        <Route path="/correlation" element={<CorrelationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
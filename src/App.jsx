import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Claim from "./pages/Claim";
import USDebtInfoPage from "./pages/USDebtInfoPage";
import DebtCoinInfoPage from "./pages/USDebtCoinInfoPage";
import LegalInfoPage from "./pages/LegalInfoPage";
import Donate from "./pages/Donate";

export default function App() {
  return (
    <Router>
      <Header />

      <main className="p-6 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/claim" element={<Claim />} />
          <Route path="/debt-info" element={<USDebtInfoPage />} />
          <Route path="/debt-coin" element={<DebtCoinInfoPage />} />
          <Route path="/legal" element={<LegalInfoPage />} />
          <Route path="/donate" element={<Donate />} />
          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

function NotFound() {
  return <h2 className="text-red-500 font-bold">404: Page Not Found</h2>;
}

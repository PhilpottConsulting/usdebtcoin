import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import USDebtInfoPage from "./pages/USDebtInfoPage";
import DebtCoinInfoPage from "./pages/DebtCoinInfoPage";
import LegalInfoPage from "./pages/LegalInfoPage";

export default function App() {
  return (
    <Router>
      <Header />

      <main className="p-6 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/debt-info" element={<USDebtInfoPage />} />
          <Route path="/debt-coin" element={<DebtCoinInfoPage />} />
          <Route path="/legal" element={<LegalInfoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

function NotFound() {
  return <h2 className="text-red-500 font-bold">404: Page Not Found</h2>;
}

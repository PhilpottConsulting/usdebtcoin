// src/pages/Donate.jsx
import React from "react";
import DonatePanel from "../components/DonatePanel.jsx";

export default function Donate() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white py-12 px-6">
      <h1 className="text-4xl font-bold mb-12 text-center">Donate to USDebtCoin</h1>
      <div className="mb-10 flex justify-center"> <appkit-button />
      </div>
      <DonatePanel />
    </main>
  );
}

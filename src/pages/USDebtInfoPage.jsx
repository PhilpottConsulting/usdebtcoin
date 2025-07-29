import React from 'react';
import { debtData } from '../data/debtData';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts';

export default function USDebtInfoPage() {
  const sortedData = [...debtData].sort((a, b) => a.year - b.year);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Distinct Header Bar */}
      <header className="bg-gray-900 text-white py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">US Debt Data Information</h1>
          <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
            Explore U.S. debt trends, net position, and the ~$4T accrued gap rarely covered in the media.
          </p>
        </div>
      </header>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-16">
        {/* Table + Insight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Insight */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Debt Data Overview</h2>
            <p className="text-gray-700">
              Debt has risen consistently while the net position remains negative — the gap reflects
              the ~$4T accrual often overlooked.
            </p>
          </div>

          {/* Scrollable Table */}
          {/* Scrollable Table */}
<div className="space-y-2">
  <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-sm max-h-96 overflow-y-scroll">
    <table className="min-w-full text-sm text-gray-900">
      <thead className="bg-gray-900 text-white sticky top-0">
        <tr>
          <th className="px-3 py-2 text-left">Year</th>
          <th className="px-3 py-2 text-right">Debt ($B)</th>
          <th className="px-3 py-2 text-right">Net Position ($B)</th>
          <th className="px-3 py-2 text-right">Difference ($B)</th>
        </tr>
      </thead>
      <tbody>
        {[...sortedData].reverse().map(({ year, debt, netPosition, difference }, i) => {
          const highlight = year >= 2021; // last 4 years
          return (
            <tr
              key={year}
              className={`${
                i % 2 === 0 ? "bg-gray-50" : "bg-white"
              } ${highlight ? "bg-red-50 font-semibold" : ""}`}
            >
              <td className="px-3 py-1">{year}</td>
              <td className="px-3 py-1 text-right">{debt.toLocaleString()}</td>
              <td className="px-3 py-1 text-right">{netPosition.toLocaleString()}</td>
              <td className={`px-3 py-1 text-right ${highlight ? "text-red-600" : ""}`}>
                {difference.toLocaleString()}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
  {/* Source Card */}
  <div className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-xs text-gray-600">
    Source: U.S. Treasury Financial Reports
  </div>
</div>

        </div>

        {/* Line Chart + Insight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Debt vs Net Position</h2>
            <p className="text-gray-700">
              While GDP expanded, the net position fell further — showing the widening structural gap.
            </p>
          </div>
          <div className="space-y-2">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sortedData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="debt" stroke="#2563eb" name="Debt Outstanding" />
                <Line type="monotone" dataKey="netPosition" stroke="#16a34a" name="Net Position" />
              </LineChart>
            </ResponsiveContainer>
            <div className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-xs text-gray-600">
              Source: U.S. Treasury Historical Debt Data
            </div>
          </div>
        </div>

        {/* Bar Chart + Insight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Accrued Debt Difference</h2>
            <p className="text-gray-700">
              The ~$4T in accrued obligations is not tracked in headline debt figures — DEBT coin highlights
              this transparency gap.
            </p>
          </div>
          <div className="space-y-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sortedData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="difference" fill="#ef4444" name="Difference" />
              </BarChart>
            </ResponsiveContainer>
            <div className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-xs text-gray-600">
              Source: Treasury & GAO Financial Reports
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

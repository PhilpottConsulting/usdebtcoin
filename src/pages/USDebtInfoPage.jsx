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
          <h1 className="text-4xl font-extrabold tracking-tight">United States "Debt"</h1>
          <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
            Explore U.S. debt trends vs US net position, and the ~$4.5T accrued gap rarely covered in the media.
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
              The Debt Reported has historically tracked the US "net postion" fairly well, with a net position higher than the reported debt as recently as 2020. 
              However, in the past 5 years, the gap between the figures has widened signifigantly.  This is real growth in US liabilities, owed to real people in the US.  Veterans and other federal employes.
              This widening ~$4.5T shouldn't be ignored in our debt discussions and thus we have chosen to track the US Net Position, rather than the public facing debt.
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
              We all know the US National Debt is a bit out of control, but there is worse news.  The US Net Position has declined significantly faster than the more often reported Public Debt.
              This means our real liabilities is sort of growing faster than we are telling ourselves and that can create dangerous situations and unknown consequences.
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
              Although the primary function of USDebtCoin is to explain the debt in terms of what one US "person" owes (about $117,000 in 2024), we also want to highlight the ~$4.5T increase in obligations on the balance sheet.
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

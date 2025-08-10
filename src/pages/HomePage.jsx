// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

/**
 * CONFIG - edit as needed
 */
const CONTRACT_ADDRESS = "0xF9744F470247B695A31C7dca737612aCB8Db8512"; // <-- confirm this
const SHARE_VALUE_USD = 117_000; // USD per 1 token/claim
const ALCHEMY_RPC_URL = `https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`;
const BALANCE_SHEET_DEBT = 39_883_800_000_000; // hardcoded example

export default function HomePage() {
  // contract-derived values
  const [totalClaims, setTotalClaims] = useState(null); // integer count
  const [remainingTokens, setRemainingTokens] = useState(null); // tokens remaining in faucet (human units)
  const [fundedTotalTokens, setFundedTotalTokens] = useState(null); // remaining + claimed

  // treasury / static
  const [usDebtToday, setUsDebtToday] = useState(null);

  // ===== read contract values (public RPC, works without wallet) =====
  useEffect(() => {
    let mounted = true;
    const client = createPublicClient({
      chain: mainnet,
      transport: http(ALCHEMY_RPC_URL),
    });

    async function fetchOnChain() {
      try {
        // read totalClaims (uint256)
        const totalClaimsBn = await client.readContract({
          address: CONTRACT_ADDRESS,
          abi: [
            {
              name: "totalClaims",
              type: "function",
              stateMutability: "view",
              inputs: [],
              outputs: [{ type: "uint256" }],
            },
          ],
          functionName: "totalClaims",
        });

        // read balanceOf(contract) to get tokens still in faucet
        const balanceBn = await client.readContract({
          address: CONTRACT_ADDRESS,
          abi: [
            {
              name: "balanceOf",
              type: "function",
              stateMutability: "view",
              inputs: [{ type: "address" }],
              outputs: [{ type: "uint256" }],
            },
          ],
          functionName: "balanceOf",
          args: [CONTRACT_ADDRESS],
        });

        // convert BigInt-like results to human numbers (token units are 1e18)
        const claimedCount = Number(totalClaimsBn); // each claim increments this by 1
        const remaining = Number(balanceBn) / 1e18; // tokens left (human-readable)

        if (!mounted) return;
        setTotalClaims(claimedCount);
        setRemainingTokens(remaining);
        setFundedTotalTokens(remaining + claimedCount);
      } catch (err) {
        console.error("Error reading contract data:", err);
        if (!mounted) return;
        setTotalClaims(null);
        setRemainingTokens(null);
        setFundedTotalTokens(null);
      }
    }

    fetchOnChain();
    return () => {
      mounted = false;
    };
  }, []);

  // ===== get a robust U.S. debt value (Treasury API with simple fallback) =====
  useEffect(() => {
    let mounted = true;
    async function fetchDebt() {
      try {
        const res = await fetch(
          "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny"
        );
        const json = await res.json();
        const record = json?.data?.find((r) => r.tot_pub_debt_out_amt) || json?.data?.[0];
        const amt = record?.tot_pub_debt_out_amt;
        if (mounted) setUsDebtToday(amt ? Number(amt) : null);
      } catch (err) {
        console.error("Treasury API failed:", err);
        if (mounted) setUsDebtToday(null);
      }
    }
    fetchDebt();
    return () => (mounted = false);
  }, []);

  // derived USD numbers
  const usdLeftToClaim =
    remainingTokens !== null ? Number((remainingTokens * SHARE_VALUE_USD).toFixed(0)) : null;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-5xl mx-auto">

  {/* Claim Button */}
  <div className="text-center mt-6 mb-10">
    <Link
      to="/claim"
      className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
    >
      CLAIM YOUR USDebtCoin!
    </Link>
  </div>

        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">USDebtCoin — Live Overview</h1>
          <p className="text-gray-300 mt-2">
            On-chain claim statuses and remaining faucet balances shown below.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Claimed (on-chain)</h3>
            <div className="text-2xl font-bold">
              {totalClaims !== null ? totalClaims.toLocaleString() : "Loading..."}
            </div>
            <div className="text-sm text-gray-400 mt-2">
              Number of successful claims (each claim = 1 token)
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Remaining in Faucet</h3>
            <div className="text-2xl font-bold">
              {remainingTokens !== null ? remainingTokens.toLocaleString() + " DEBT" : "Loading..."}
            </div>
            <div className="text-sm text-gray-400 mt-2">
              USDBT left to claim:{" "}
              {usdLeftToClaim !== null ? `$${usdLeftToClaim.toLocaleString()}` : "Loading..."}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Faucet Funded (approx.)</h3>
            <div className="text-2xl font-bold">
              {fundedTotalTokens !== null ? fundedTotalTokens.toLocaleString() + " shares" : "Loading..."}
            </div>
            <div className="text-sm text-gray-400 mt-2">
              Calculated as remaining + claimed (reflects current funded supply)
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h4 className="font-semibold">U.S. Debt Today</h4>
            <div className="text-xl mt-2">
              {usDebtToday ? `$${usDebtToday.toLocaleString()}` : "Unavailable"}
            </div>
            <p className="text-sm text-gray-400 mt-2">From Treasury API (inaccurate at the moment)</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h4 className="font-semibold">Balance Sheet Debt</h4>
            <div className="text-xl mt-2">${BALANCE_SHEET_DEBT.toLocaleString()}</div>
            <p className="text-sm text-gray-400 mt-2">Static reference updated annually (FY 2024 current)</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h4 className="font-semibold">Share Value</h4>
            <div className="text-xl mt-2">${SHARE_VALUE_USD.toLocaleString()}</div>
            <p className="text-sm text-gray-400 mt-2">Estimate for now, Edit SHARE_VALUE_USD in code to change</p>
          </div>
        </section>
      </div>
    
  



      {/* Comments Table */}
      <section className="w-full max-w-4xl px-6 pb-16 mt-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          What People Are Saying
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-xl overflow-hidden">
            <tbody>
              {[
                {
                  text: "I didn’t think I would get so much. Yikes.",
                  author: "Anonymous Holder",
                },
                {
                  text: "I'm not clicking on that!.",
                  author: "Bubba Locklear, Lumbee Nation",
                },
                {
                  text: "That was stupid.",
                  author: "Skeptical Trader",
                },
                {
                  text: "Finally, a coin that makes sense.",
                  author: "Early Adopter",
                },
              ].map((c, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-700 ${
                    idx % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                  }`}
                >
                  <td className="px-6 py-4 italic text-gray-300">{`"${c.text}"`}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm text-right">
                    — {c.author}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}



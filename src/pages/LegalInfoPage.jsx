import React from "react";

export default function Legal() {
  return (
    <div className="bg-gray-800 text-gray-300 py-12 px-6">
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        Legal & Disclaimers
      </h2>

      <div className="max-w-4xl mx-auto space-y-6 text-sm leading-relaxed">
        <p>
          <span className="font-semibold text-blue-400">USDebtCoin (USDBT)</span> 
          is a community experiment — part meme coin, part financial tracker. 
          It is designed to symbolize the U.S. national debt in an educational, and somewhat speculative way.
          Don't worry, you probably won't have to pay this back.
        </p>

        <p>
          One share of USDBT is intended to represent{" "}
          <span className="font-semibold text-white">one share of U.S. Debt</span>. 
          Based on current government balance sheets, this may be calculated using 
          either the{" "}
          <span className="italic">
            total outstanding Treasury obligations (~$35T)
          </span>{" "}
          or the{" "}
          <span className="italic">
            broader U.S. net position (~$40T)
          </span>. 
          We do not guarantee which metric or metrics are “correct” — this debate is part of 
          the project itself.
        </p>

        <p>
          Claims are limited to{" "}
          <span className="font-semibold text-white">one wallet = one share</span>. 
          Gas fees apply, and anyone attempting to farm large numbers of wallets 
          must bear that cost. This mechanism creates a natural filter: 
          mass-claiming is certinaly possible, but not free.
        </p>

        <p className="text-red-400">
          ⚠️ USDebtCoin has no intrinsic value. It is not backed by the U.S. 
          government or any institution. Early liquidity, if any, will be 
          experimental and subject to extreme volatility. Participants should 
          expect the possibility of total loss.
        </p>

        <p>
          By interacting with the smart contract or claiming tokens, you acknowledge 
          that this is an experimental project. The developers provide no warranties 
          and accept no liability. Participate only if you understand these risks.
        </p>
      </div>
    </div>
  );
}

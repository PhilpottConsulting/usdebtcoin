// src/components/DonatePanel.jsx
import React, { useState, useEffect } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";

const DEV_WALLET = "0x7D8c25784C9B28B525BA085283efe01C81830F3b"; // Replace with actual dev wallet address
const LIQUIDITY_WALLET = "0x198F7C84CC7E3485E325734aFAE0F270e4e80515"; // Replace with actual liquidity wallet address

export default function DonatePanel() {
  const { address, isConnected } = useAccount();

  const [amountEth, setAmountEth] = useState("");
  const [txStatus, setTxStatus] = useState(null); // "pending", "success", "error"
  const [txError, setTxError] = useState("");
  const [lastTxHash, setLastTxHash] = useState(null);

  const { sendTransaction, isLoading, data, error } = useSendTransaction();

  useEffect(() => {
    if (data?.hash) {
      setTxStatus("pending");
      setLastTxHash(data.hash);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setTxStatus("error");
      setTxError(error?.message || "Transaction failed");
    }
  }, [error]);

  // This example won't track confirmation status, but you could expand with wagmi's useWaitForTransaction

  const donate = (toAddress) => {
    setTxStatus(null);
    setTxError("");

          {!isConnected && (
        <div className="flex justify-center">
          <appkit-button />
        </div>
      )}


    if (!amountEth || isNaN(amountEth) || Number(amountEth) <= 0) {
      setTxError("Please enter a valid donation amount in ETH.");
      return;
    }

    try {
      sendTransaction({
        request: {
          to: toAddress,
          value: parseEther(amountEth),
        },
      });
    } catch (e) {
      setTxStatus("error");
      setTxError(e.message || "Failed to send transaction");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg text-gray-900 space-y-6">
      <h2 className="text-2xl font-bold text-center">Support US Debt Coin</h2>

      {!isConnected && (
        <p className="text-center text-red-600 font-semibold">
          Please connect your wallet to donate.
        </p>
      )}

      <label className="block font-semibold mb-2" htmlFor="amountEth">
        Donation Amount (ETH)
      </label>
      <input
        id="amountEth"
        type="number"
        min="0"
        step="0.0001"
        value={amountEth}
        onChange={(e) => setAmountEth(e.target.value)}
        placeholder="0.01"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />

      <div className="space-y-4">
        <div>
          <button
            onClick={() => donate(DEV_WALLET)}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
          >
            Donate to Dev Wallet (Tip Jar)
          </button>
          <p className="mt-1 text-sm text-gray-600 italic">
            Support the developers keeping this project alive.
          </p>
        </div>

        <div>
          <button
            onClick={() => donate(LIQUIDITY_WALLET)}
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
          >
            Donate to Liquidity Wallet
          </button>
          <p className="mt-1 text-sm text-gray-600 italic">
            Help us build liquidity for USDebtCoin.{" "}
            <a
              href="/liquidity"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 hover:text-blue-800"
            >
              Learn more
            </a>
          </p>
        </div>
      </div>

      {txStatus === "pending" && (
        <p className="text-center text-yellow-600 font-semibold">
          Transaction pending... Tx Hash:{" "}
          <a
            href={`https://etherscan.io/tx/${lastTxHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {lastTxHash.slice(0, 10)}...
          </a>
        </p>
      )}
      {txStatus === "success" && (
        <p className="text-center text-green-600 font-semibold">
          Thank you for your donation!
        </p>
      )}
      {txStatus === "error" && (
        <p className="text-center text-red-600 font-semibold break-words">
          Error: {txError}
        </p>
      )}
    </div>
  );
}

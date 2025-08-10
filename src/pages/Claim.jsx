import React, { useEffect, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { Link } from "react-router-dom";

const CONTRACT_ADDRESS = "0xF9744F470247B695A31C7dca737612aCB8Db8512";
const ABI = [
  "function claim() external",
  "function hasClaimed(address) view returns (bool)",
];

export default function Claim() {
  const { address, isConnected } = useAccount();

  const [hasClaimed, setHasClaimed] = useState(false);
  const [txError, setTxError] = useState(null);
  const [txSuccessMsg, setTxSuccessMsg] = useState(null);

  // Set up hooks:
  const readContract = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "hasClaimed",
    args: address ? [address] : undefined,
    query: { enabled: false }, // disable on load; call manually
  });

  const { writeContract, isLoading: isClaiming, isSuccess, error } = useWriteContract();

  // Refetch hasClaimed when wallet connects or address changes:
  useEffect(() => {
    if (isConnected && address) {
      readContract
        .refetch()
        .then(({ data }) => {
          setHasClaimed(Boolean(data));
        })
        .catch((e) => {
          console.error("refetch hasClaimed error", e);
          setHasClaimed(false);
        });
    } else {
      setHasClaimed(false);
    }
  }, [isConnected, address]);

  // Show success or error after claim tx:
  useEffect(() => {
    if (isSuccess) {
      setTxSuccessMsg("✅ Claim successful — refresh or check your wallet/token balance.");
      // Refresh claim status:
      readContract.refetch().then(({ data }) => setHasClaimed(Boolean(data)));
    } else if (error) {
      const reason =
        error?.shortMessage || error?.message || (error?.cause && error.cause.message) || String(error);
      setTxError(reason);
      console.error("Claim transaction error:", error);
    }
  }, [isSuccess, error]);

  // Handler to call claim:
  const handleClaim = () => {
    setTxError(null);
    setTxSuccessMsg(null);

    if (!isConnected) {
      setTxError("Connect your wallet first.");
      return;
    }
    if (hasClaimed) {
      setTxError("Address has already claimed.");
      return;
    }

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "claim",
      args: [],
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-12">
      <div className="max-w-3xl mx-auto px-6 space-y-6">
        {/* Card 1 - Connect */}
        <div className="bg-white text-gray-900 rounded-xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Step 1 — Connect your wallet</h3>
            <p className="text-sm text-gray-600">
              Click the button below to open the wallet modal and connect (MetaMask, Coinbase, or email signup with Reown).
              Once connected, you will see your wallet number below with your ETH amount. Then you can claim your USDebtCoin!
            </p>
          </div>
          <div className="mt-6 flex justify-center">
            <appkit-button />
          </div>
        </div>

        {/* Card 2 - Claim */}
        <div className="bg-white text-gray-900 rounded-xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Step 2 — Claim your USDebtCoin</h3>
            <p className="text-sm text-gray-600 mb-3">
              After connecting, click "Claim" to submit the transaction. 
              Gas will be required — make sure your wallet has ETH on the selected network or the transaction will fail.
              Your connected wallet and claim eligibility will be shown below.
            </p>

            <div className="space-y-2">
              <div>
                <strong>Connected:</strong>{" "}
                <span className="font-mono">{isConnected ? address : "Not connected"}</span>
              </div>
              <div>
                <strong>Eligibility:</strong>{" "}
                <span>{hasClaimed ? "Already claimed" : isConnected ? "Eligible (not claimed)" : "Unknown"}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center">
            <button
              onClick={handleClaim}
              disabled={!isConnected || hasClaimed || isClaiming}
              className={`w-full md:w-2/3 px-5 py-3 rounded-lg font-semibold transition ${
                !isConnected || hasClaimed
                  ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isClaiming ? "Waiting for wallet..." : hasClaimed ? "Already claimed" : "Claim USDebtCoin"}
            </button>

            {/* Error / success */}
            {txError && (
              <div className="mt-4 text-sm text-red-600 text-center break-words">
                <strong>Error:</strong> {txError}
                <div className="mt-1 text-xs text-gray-500">
                  Common causes: insufficient gas (add testnet ETH), wrong network, or revert from contract.
                </div>
              </div>
            )}

            {txSuccessMsg && (
              <div className="mt-4 text-sm text-green-600 text-center">{txSuccessMsg}</div>
            )}
          </div>
        </div>

        {/* Card 3 - Share & Donate */}
        <div className="bg-white text-gray-900 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Step 3 — Share & Support</h3>
          <p className="text-sm text-gray-600 mb-4">
            Tell your friends! Support the project through donations to our liquidity wallet, or tip the developers with ETH or even 
            your newly acquired USDBT. Use the links below to share or donate! Thank you for participating!
          </p>

          <div className="flex flex-wrap gap-3 mb-4">
            {/* Twitter / X */}
            <a
              className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600"
              href="https://twitter.com/intent/tweet?text=I%20just%20claimed%20my%20USDebtCoin!"
              target="_blank"
              rel="noreferrer"
            >
              Share on X
            </a>

            {/* Facebook */}
            <a
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fusdebtcoin.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              Share on Facebook
            </a>

            {/* LinkedIn */}
            <a
              className="px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800"
              href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fusdebtcoin.vercel.app&title=USDebtCoin%20Claimed!&summary=I%20just%20claimed%20my%20USDebtCoin!"
              target="_blank"
              rel="noreferrer"
            >
              Share on LinkedIn
            </a>

            {/* Instagram (No direct share URL, so linking to your Instagram page as placeholder) */}
            <a
              className="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700"
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>

            {/* Donate page link */}
            <Link
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              to="/donate"
            >
            Donate to Liquidity or Tip our Developers!
            </Link>     
            
          
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";

export default function HomePage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [claimed, setClaimed] = useState(452138); // starting claimed coins
  const [usDebt, setUsDebt] = useState(35464673930000); // ~$35T in cents (example)

  // Fake wallet connect
  const handleConnectWallet = () => {
    setWalletConnected(true);
    setWalletAddress("0x1234...abcd");
  };

  // Rolling claimed tracker
  useEffect(() => {
    const interval = setInterval(() => {
      setClaimed((c) => c + Math.floor(Math.random() * 10)); // +0-9 coins every tick
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // US Debt live ticker (adds ~$10k/second for demo)
  useEffect(() => {
    const interval = setInterval(() => {
      setUsDebt((d) => d + 10000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center py-16 px-6 max-w-3xl">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
          Claim Your Share of the Debt
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          The U.S. debt keeps growing. Don’t just watch it climb —
          <span className="text-accent font-semibold"> claim your piece</span> of history
          with <span className="text-blue-700">DEBT Coin</span>.
        </p>
        <a
          href="#tutorial"
          className="px-8 py-4 rounded-lg bg-blue-700 text-white font-bold text-lg shadow hover:bg-accent hover:text-gray-900 transition"
        >
          Start Tutorial
        </a>
      </section>

      {/* Live Trackers */}
      <section className="w-full max-w-4xl px-6 pb-12 text-center grid gap-8 md:grid-cols-2">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Total DEBT Claimed</h3>
          <p className="text-3xl font-bold text-accent">
            {claimed.toLocaleString()} DEBT
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-2">U.S. Debt Tracker</h3>
          <p className="text-2xl font-bold text-red-400">
            ${usDebt.toLocaleString()}
          </p>
          <p className="text-gray-400 text-sm">Updated live</p>
        </div>
      </section>

      {/* Tutorial Section */}
      <section id="tutorial" className="w-full max-w-4xl px-6 pb-16 space-y-12">
        <h2 className="text-3xl font-bold text-center mb-8">How to Claim DEBT Coin</h2>

        {/* Step Cards */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Step 1: Install a Wallet</h3>
          <p className="text-gray-400">
            Download{" "}
            <a href="https://metamask.io/download.html" target="_blank" rel="noreferrer" className="text-blue-500 underline">
              MetaMask
            </a>{" "}
            (or another wallet) to store your DEBT coins.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Step 2: Connect Your Wallet</h3>
          {walletConnected ? (
            <p className="text-green-400 font-semibold">
              ✅ Connected: {walletAddress}
            </p>
          ) : (
            <button
              onClick={handleConnectWallet}
              className="px-6 py-3 rounded-lg bg-blue-700 text-white font-bold hover:bg-accent hover:text-gray-900 transition"
            >
              Connect Wallet
            </button>
          )}
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Step 3: Claim DEBT Coin</h3>
          {walletConnected ? (
            <button className="px-6 py-3 rounded-lg bg-accent text-gray-900 font-bold hover:bg-blue-700 hover:text-white transition">
              Claim DEBT
            </button>
          ) : (
            <p className="text-gray-400">Connect your wallet first.</p>
          )}
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Step 4: Verify Your Balance</h3>
          <p className="text-gray-400">
            After claiming, check your DEBT balance in your wallet or on a block explorer.
          </p>
          <a
            href="https://etherscan.io/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline"
          >
            View on Explorer →
          </a>
        </div>
      </section>

      {/* Endorsements */}
      <section className="w-full max-w-4xl px-6 pb-16">
        <h2 className="text-3xl font-bold text-center mb-8">What People Are Saying</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <p className="italic text-gray-300">"I didn’t think I would get so much. Yikes."</p>
            <span className="text-gray-500 text-sm">— Anonymous Holder</span>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <p className="italic text-gray-300">"That was stupid."</p>
            <span className="text-gray-500 text-sm">— Skeptical Trader</span>
          </div>
        </div>
      </section>
    </div>
  );
}

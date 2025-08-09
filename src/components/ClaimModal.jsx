// src/components/ClaimModal.jsx
import React from "react";
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";

export default function ClaimModal() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();

  return (
    <div className="p-4 border rounded-md text-center">
      {!isConnected ? (
        <button
          className="btn btn-primary w-full"
          onClick={() => open()}
          aria-label="Connect Wallet"
        >
          Connect Wallet
        </button>
      ) : (
        <p className="text-sm font-medium">Connected: {address}</p>
      )}
    </div>
  );
}

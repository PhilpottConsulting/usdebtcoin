// src/ReownProvider.jsx
import React from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { createAppKit, AppKitProvider } from "@reown/appkit/react";
import { mainnet, arbitrum } from "@reown/appkit/networks";

const queryClient = new QueryClient();

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;

const metadata = {
  name: "US Debt Coin",
  description: "Claim your US Debt Coin rewards",
  url: "https://usdebtcoin.vercel.app",
  icons: ["https://usdebtcoin.vercel.app/assets/us-debt-coin.png"],
};

const networks = [mainnet, arbitrum];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// Call createAppKit ONCE, OUTSIDE the React component:
const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
  },
});

export default function ReownProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppKitProvider config={appKit.appkitConfig} wagmiConfig={appKit.wagmiConfig}>
          {children}
        </AppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

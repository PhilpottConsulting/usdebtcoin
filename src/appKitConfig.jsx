// src/appKitConfig.jsx
import React from 'react';
import { WagmiProvider } from 'wagmi';
import { createAppKit } from '@reown/appkit';
import { mainnet, sepolia } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
  
import { AppKitProvider as ReownAppKitProvider } from '@reown/appkit/react';

//0. Setup query client
const queryClient = new QueryClient();

//1. Get project ID from environment variables
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;

if (!projectId) {
  console.error('❌ Missing VITE_REOWN_PROJECT_ID in environment variables.');
}

//2. Create a metadata object for the app
const metadata = {
  name: 'USDebtCoin',
  description: 'Claim your share of US National Debt',
  url: 'https://usdebtcoin.vercel.app/',
  icons: ['https://usdebtcoin.vercel.app/assets/usdebtcoin.png'],
};

//3. Define the networks to be used
const networks = [mainnet, sepolia]

//4. Create the Wami Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

//5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
});

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

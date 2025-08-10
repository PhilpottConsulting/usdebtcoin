import React from 'react';
import { createAppKit } from '@reown/appkit';
import { mainnet, sepolia } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';


const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;
console.log('DEBUG: projectId from env:', projectId);  // <-- check if projectId loaded

const metadata = {
  name: 'USDebtCoin',
  description: 'Claim your share of US National Debt',
  url: 'https://usdebtcoin.vercel.app/',
  icons: ['https://usdebtcoin.vercel.app/assets/usdebtcoin.png'],
};

const networks = [mainnet, sepolia];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});
console.log('DEBUG: wagmiAdapter created:', wagmiAdapter);

export const appKitProvider = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
  },
});
console.log('DEBUG: appKit created:', appKitProvider);

const queryClient = new QueryClient();
console.log('DEBUG: queryClient created:', queryClient);

export function AppKitProvider({ children }) {
  console.log('DEBUG: Rendering AppKitProvider');
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}


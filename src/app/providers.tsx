// app/providers.tsx

"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "@/app/dashboard/auth/AuthContext";
import { BlockchainProvider } from "@/context/BlockchainContext";

const config = getDefaultConfig({
  appName: "Phoenix Shinobi",
  projectId: "9ddcb68482bc223eb1614b0a7d353e57",
  chains: [sepolia],
  ssr: true
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <BlockchainProvider>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <AuthProvider>{children}</AuthProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </BlockchainProvider>
    </WagmiProvider>
  );
}

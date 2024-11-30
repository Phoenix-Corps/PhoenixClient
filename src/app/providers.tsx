// app/providers.tsx

"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BlockchainProvider } from "@/context/BlockchainContext";
import { DashboardProvider } from "@/context/DashboardContext";

const config = getDefaultConfig({
  appName: "Phoenix",
  projectId: "9ddcb68482bc223eb1614b0a7d353e57",
  chains: [base],
  ssr: true
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BlockchainProvider>
          <DashboardProvider>
            <RainbowKitProvider>{children}</RainbowKitProvider>
          </DashboardProvider>
        </BlockchainProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

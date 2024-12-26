"use client";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { FloatingPortal } from "@floating-ui/react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BlockchainProvider } from "@/components/context/BlockchainContext";
import { DashboardProvider } from "@/components/context/DashboardContext";
import { TransactionHandlerProvider } from "./TransactionHandlerContext";

import { wagmiConfig } from "@/config/wagmi";

import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <BlockchainProvider>
          <DashboardProvider>
            <RainbowKitProvider>
              <TransactionHandlerProvider>
                <FloatingPortal>{children}</FloatingPortal>
              </TransactionHandlerProvider>
            </RainbowKitProvider>
          </DashboardProvider>
        </BlockchainProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

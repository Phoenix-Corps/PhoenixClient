"use client";

import React from "react";

import { Logo } from "@/components/Logo";
import { useAccount, useDisconnect } from "wagmi";

export const Header = () => {
  const acc = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="p-10">
      <div className="absolute top-10 left-10">
        <Logo width={162} />
      </div>

      {acc.isConnected && (
        <button
          onClick={() => disconnect()}
          className="walletConnect-button absolute top-0 right-3 w-[100px] h-[40px] text-xs p-1"
        >
          Disconnect Wallet
        </button>
      )}
    </div>
  );
};

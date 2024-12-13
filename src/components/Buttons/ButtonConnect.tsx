"use client";

import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { formatAddress } from "@/utils/format";

export const ButtonConnect = (props: { showAddress?: boolean }) => {
  const acc = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  return (
    <button
      onClick={acc.isConnected ? openAccountModal : openConnectModal}
      className="walletConnect-button absolute top-0 right-3 w-[100px] h-[40px] text-xs p-1"
    >
      {acc.isConnected
        ? !!props.showAddress
          ? formatAddress(acc.address!)
          : "Disconnect"
        : "Connect"}{" "}
      Wallet
    </button>
  );
};

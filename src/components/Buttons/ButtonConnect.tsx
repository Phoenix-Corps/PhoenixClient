"use client";

import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { formatAddress } from "@/utils/format";

export const ButtonConnect = (props: {
  showAddress?: boolean;
  className?: string;
}) => {
  const acc = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  return (
    <button
      onClick={acc.isConnected ? openAccountModal : openConnectModal}
      className={`walletConnect-button w-[100px] h-[40px] text-xs p-1 ${
        props.className ?? ""
      }`}
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

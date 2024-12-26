"use client";

import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { formatAddress } from "@/utils/format";

import Icon_Wallet from "@public/icons/wallet.svg";

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
      className={`menu-button h-[40px] text-xs p-3 flex items-center justify-center gap-2 stroke_textAccent ${
        props.className ?? ""
      }`}
    >
      <Icon_Wallet />
      <div className="menu-button-text color_textAccent aeroport">
        {acc.isConnected
          ? !!props.showAddress
            ? formatAddress(acc.address!)
            : "Disconnect Wallet"
          : "Connect Wallet"}
      </div>
    </button>
  );
};

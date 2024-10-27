"use client";

import { addWalletToUser } from "@/app/dashboard/actions";
import { Button } from "@radix-ui/themes";
import { useAccount, useSignMessage } from "wagmi";

export default function VerifyWalletButton() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  async function handleVerifyWallet() {
    if (!address || !isConnected) return;


    const message =
      "Sign this message to verify your wallet\nnonce: " +
      Math.random() * 1000000;
    const signature = await signMessageAsync({ message });

    try {
      await addWalletToUser({
        message,
        signature,
        address
      });

      alert("Wallet verified");
    } catch (error) {
      alert((error as Error).message);
    }
  }

  return (
    <>
      {isConnected && (
        <Button onClick={handleVerifyWallet}>Verify Wallet</Button>
      )}
    </>
  );
}

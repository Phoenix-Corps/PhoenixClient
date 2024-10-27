"use client";

import { Button } from "@radix-ui/themes";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSignMessage } from "wagmi";
import { createClient } from "@/app/dashboard/utils/supabase/client";
import { signInWithWallet } from "@/app/dashboard/actions";
import { useRouter } from "next/navigation";

const supabase = createClient();

export default function LoginWithWalletButton() {
  const { push } = useRouter();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  async function handleLoginWithWallet() {
    if (!address || !isConnected) return;

    const message =
      "Sign this message to verify your wallet\nnonce: " +
      Math.random() * 1000000;
    const signature = await signMessageAsync({ message });

    const token = await signInWithWallet({ message, signature, address });

    supabase.functions.setAuth(token);
    supabase.realtime.setAuth(token);
    (supabase as any).rest.headers.Authorization = `Bearer ${token}`;

    await supabase.auth.setSession({
      access_token: token,
      refresh_token: token
    });

    push("/");
  }

  return (
    <>
      <ConnectButton />

      {isConnected && (
        <Button onClick={handleLoginWithWallet}>Login with wallet</Button>
      )}
    </>
  );
}

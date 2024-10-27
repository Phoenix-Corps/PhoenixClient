"use server";

import { createAdminClient } from "./utils/supabase/admin";

interface BuyTransaction {
  code: string;
  txHash: string;
  token: string;
  amount: number;
  walletAddress: `0x${string}`;
  price: number;
  poolId: number;
  currentRound: number;
}

export const registerBuyTransaction = async (
  buyTransaction: BuyTransaction
) => {
  const supabase = await createAdminClient();

  const { data, error } = await supabase.from("transaction").insert({
    code: buyTransaction.code,
    tx_hash: buyTransaction.txHash,
    token: buyTransaction.token,
    amount: buyTransaction.amount,
    wallet_address: buyTransaction.walletAddress,
    price: buyTransaction.price,
    pool_id: buyTransaction.poolId,
    current_round: buyTransaction.currentRound,
    type: "buy",
  });

  if (error) {
    console.error("Error registering buy transaction:", error);
  }
};

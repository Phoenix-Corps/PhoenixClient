// transactionsActions.ts

import { createClient } from "@/app/dashboard/utils/supabase/client";

export interface Transaction {
  id: number;
  created_at: string;
  code: string;
  tx_hash: string;
  wallet_address: string;
  price: string;
  amount: string;
  payment: string;
  paid: string;
  pool_id: number;
  // Add any other fields as necessary
}

export const fetchUserTransactions = async (
  walletAddress: string
): Promise<Transaction[]> => {
  const supabaseClient = createClient();
  const { data, error } = await supabaseClient
    .from("transaction")
    .select("*")
    .eq("wallet_address", walletAddress);

  if (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }

  return data as Transaction[];
};

export const fetchUserTransactionsByCode = async (
  referralCode: string
): Promise<Transaction[]> => {

  const supabaseClient = createClient();
  const { data, error } = await supabaseClient
    .from("transaction")
    .select("*")
    .eq("code", referralCode);

  if (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }

  return data as Transaction[];
};

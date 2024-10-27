// Transactions.tsx

"use client";

import { useState, useEffect } from "react";
import ARROW from "@/app/dashboard/public/Transactions/Next.svg";
import TransactionTable from "./TransactionTable";
import { useAuth } from "../auth/AuthContext";
import { fetchUserTransactionsByCode, Transaction } from "@/app/dashboard/lib/transactionActions";
import { zeroAddress } from "viem"; // Or define zeroAddress as "0x0000000000000000000000000000000000000000"
import { useReadContract } from "wagmi";
import { launchpadABI } from "@/app/dashboard/abis/launchpadABI";
import { LaunchpadAddress } from "@/app/dashboard/constants/contractAddresses";

const Transactions = () => {
  //@ts-ignore
  const { user } = useAuth();
  const [isExpanded, setExpand] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Explicitly type the state


  const {
    data: referralCode,
    error: referralError,
    isLoading: isReferralLoading,
  } = useReadContract({
    address: LaunchpadAddress,
    abi: launchpadABI,
    functionName: "userReferral",
    args: [user?.wallet_address as `0x${string}` || zeroAddress],
  });

  useEffect(() => {
    if (referralCode && !isReferralLoading) {
      fetchTransactions(referralCode as string);
    }
  }, [referralCode, isReferralLoading]);

  const fetchTransactions = async (code: string) => {
    const data = await fetchUserTransactionsByCode(code);
    setTransactions(data); // Now TypeScript knows 'transactions' is of type Transaction[]
  };

  return (
    <div className="mt-10 md:mt-20 lg:mt-36 px-4 md:px-20">
      {/* HEADING */}
      <h1 className="shadow-text text-white text-center text-3xl md:text-5xl lg:text-[54px] font-bold font-noto-serif uppercase">
        Transactions
      </h1>

      {/* PRIVATE SALES DROPDOWN */}
      <div className="rounded mt-6 mx-auto lg:ml-0 lg:mt-10 mb-4 flex flex-col gap-y-1 w-fit">
        <button
          className={`bg-[#182C4580] py-2 px-5 text-sm md:text-base lg:text-lg tracking-wide font-noto-serif uppercase text-white/90 flex justify-center items-center gap-x-3 transition-all ${
            isExpanded ? "rounded-t-3xl" : "rounded-3xl"
          }`}
          onClick={() => setExpand(!isExpanded)}
        >
          <span>All Privatesales</span>
          <ARROW className="rotate-90 fill-white/90" />
        </button>
        {isExpanded ? (
          <>
            <span className="bg-[#182C4589] py-2 px-5 tracking-wide font-noto-serif uppercase text-white/90">
              PST
            </span>
          </>
        ) : null}
      </div>

      {/* TABLE */}
      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default Transactions;

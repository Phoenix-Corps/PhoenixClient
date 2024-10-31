"use client";

import React, { useState } from "react";
import ARROW from "@/app/dashboard/public/Transactions/Next.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ClaimsTable from "./ClaimsTable";
import { useAuth } from "../auth/AuthContext";
import { useReadContracts, useAccount } from "wagmi";
import { paymentPluginTierABI } from "@/app/dashboard/abis/paymenPluginTierABI";
import { zeroAddress } from "viem";
import { PaymentPluginTierAddress } from "@/app/dashboard/constants/contractAddresses";

const Claims = () => {
  const { isConnected } = useAccount();
  const { user } = useAuth();
  const [isExpanded, setExpand] = useState(false);

  const poolIds = [0]; // Hardcoded for now, will be dynamic in the future

  //@TODO fetch claim data from supabase

  const contracts = poolIds.flatMap(poolId => [
    {
      address: PaymentPluginTierAddress as `0x${string}`,
      abi: paymentPluginTierABI,
      functionName: "getClaimablePayment",
      args: [poolId, user?.wallet_address || zeroAddress]
    },
    {
      address: PaymentPluginTierAddress,
      abi: paymentPluginTierABI,
      functionName: "getTotalPayment",
      args: [poolId, user?.wallet_address || zeroAddress]
    },
    {
      address: PaymentPluginTierAddress,
      abi: paymentPluginTierABI,
      functionName: "getClaimedPayment",
      args: [poolId, user?.wallet_address || zeroAddress]
    }
  ]);

  const {
    data: paymentsData,
    isLoading,
    error
  } = useReadContracts({
    //@ts-ignore
    contracts
  });

  // Organize the data per pool
  const paymentsByPool =
    paymentsData &&
    poolIds.map((poolId, index) => {
      const startIndex = index * 3;
      const claimablePayment = paymentsData[startIndex];
      const totalPayment = paymentsData[startIndex + 1];
      const claimedPayment = paymentsData[startIndex + 2];

      return {
        poolId,
        claimablePayment,
        totalPayment,
        claimedPayment
      };
    });

  return (
    <div className="p-4">
      {!isConnected ? (
        <div className="text-center items-center flex flex-col justify-center">
          <p className="mb-4  text-white">Connect your wallet to continue</p>
          <div className="z-20">
            <ConnectButton />
          </div>
        </div>
      ) : (
        <div className="mt-10 lg:mt-36 px-4 md:px-20">
          <h1 className="shadow-text text-white text-center text-3xl md:text-5xl lg:text-[54px] font-bold font-noto-serif uppercase">
            My Claims
          </h1>

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
                {poolIds.map(poolId => (
                  <span
                    key={poolId}
                    className="bg-[#182C4589] py-2 px-5 tracking-wide font-noto-serif uppercase text-white/90"
                  >
                    Sale {poolId}
                  </span>
                ))}
              </>
            ) : null}
          </div>

          <ClaimsTable />
        </div>
      )}
    </div>
  );
};

export default Claims;

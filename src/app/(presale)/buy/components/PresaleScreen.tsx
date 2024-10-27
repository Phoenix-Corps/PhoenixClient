"use client";

import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import RoundStatus from "./RoundStatus";
import BuyForm from "./BuyForm";
import { PoolInfo, RoundInfo } from "../types/types";

interface PresaleScreenProps {
  accessCode: string;
  poolInfo: PoolInfo | null;
  roundInfo: RoundInfo | null;
}

const PresaleScreen: React.FC<PresaleScreenProps> = ({
  accessCode,
  poolInfo,
  roundInfo,
}) => {
  const tokenInfo = {
    name: "Presale Token",
    symbol: "PST",
    logo: "/placeholder-logo.png", // Replace with actual logo path
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-900 rounded-2xl shadow-2xl">
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center space-x-4">
          <Image
            src={tokenInfo.logo}
            alt={tokenInfo.name}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">{tokenInfo.name}</h1>
            <p className="text-gray-400">{tokenInfo.symbol}</p>
          </div>
        </div>
        <ConnectButton />
      </div>

      {roundInfo && poolInfo ? (
        <>
          <RoundStatus roundInfo={roundInfo} />

          <div className="my-12 text-center">
            <h2 className="text-xl font-semibold text-gray-400 mb-2">
              Current Round Price
            </h2>
            <p className="text-4xl font-bold text-white break-words">
              ${roundInfo.voucherPrice} USD
            </p>
          </div>

          <BuyForm
            roundPrice={roundInfo.voucherPrice}
            tokenSymbol={tokenInfo.symbol}
            accessCode={accessCode}
            poolId={poolInfo.id}
            currentRound={poolInfo.currentRound}
          />
        </>
      ) : (
        <div className="my-12 text-center">
          <p className="text-2xl font-bold text-white">No active round</p>
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">
          Debug Information
        </h3>
        <p className="text-gray-300">Access Code: {accessCode}</p>
        <p className="text-gray-300">Pool ID: {poolInfo?.id}</p>
        <p className="text-gray-300">
          Current Round: {poolInfo?.currentRound}
        </p>
        <p className="text-gray-300">
          Total Payments: {poolInfo?.totalPayments}{" "}
        </p>
        <p className="text-gray-300">
          Pool Closed: {poolInfo?.closed ? "Yes" : "No"}
        </p>
        {roundInfo && (
          <>
            <p className="text-gray-300">Round Goal: {roundInfo.goal} </p>
            <p className="text-gray-300">Available: {roundInfo.available} </p>
            <p className="text-gray-300">Funding: {roundInfo.funding} </p>
            <p className="text-gray-300">
              Round Approved: {roundInfo.approved ? "Yes" : "No"}
            </p>
            <p className="text-gray-300">
              Round Start: {roundInfo.roundStart}{" "}
            </p>
            <p className="text-gray-300">Round End: {roundInfo.roundEnd} </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PresaleScreen;

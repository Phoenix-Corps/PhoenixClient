"use client";

import React, { useState, useEffect } from "react";
import { ethers, formatUnits } from "ethers";
import PresaleScreen from "./PresaleScreen";
import { LaunchpadContract } from "../constants/contracConfig";



interface PresaleContainerProps {
  accessCode: string;
}

interface PoolInfo {
  id: number;
  paymentToken: string;
  launchpadFeePercent: number;
  projectWallet: string;
  launchpadPlugin: string;
  paymentPlugin: string;
  voucherPlugin: string;
  currentRound: number;
  fundingBalance: string;
  totalPayments: string;
  closed: boolean;
}

interface RoundInfo {
  goal: string;
  voucherPrice: string;
  roundStart: number;
  roundEnd: number;
  available: string;
  collectedProtocolFees: string;
  funding: string;
  approved: boolean;
}

const PresaleContainer: React.FC<PresaleContainerProps> = ({ accessCode }) => {
  const [poolInfo, setPoolInfo] = useState<PoolInfo | null>(null);
  const [roundInfo, setRoundInfo] = useState<RoundInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
       

        const poolInfoRaw = await LaunchpadContract.getPoolInfo(0);
        const poolInfoFormatted: PoolInfo = {
          id: Number(poolInfoRaw.id),
          paymentToken: poolInfoRaw.paymentToken,
          launchpadFeePercent: Number(poolInfoRaw.launchpadFeePercent),
          projectWallet: poolInfoRaw.projectWallet,
          launchpadPlugin: poolInfoRaw.launchpadPlugin,
          paymentPlugin: poolInfoRaw.paymentPlugin,
          voucherPlugin: poolInfoRaw.voucherPlugin,
          currentRound: Number(poolInfoRaw.currentRound),
          fundingBalance: formatUnits(poolInfoRaw.fundingBalance, 0),
          totalPayments: formatUnits(poolInfoRaw.totalPayments, 0),
          closed: poolInfoRaw.closed
        };
        setPoolInfo(poolInfoFormatted);

        const roundInfoRaw = await LaunchpadContract.getRoundInfo(
          0,
          poolInfoFormatted.currentRound
        );
        const roundInfoFormatted: RoundInfo = {
          goal: formatUnits(roundInfoRaw.goal, 0),
          voucherPrice: formatUnits(roundInfoRaw.voucherPrice, 0),
          roundStart: Number(roundInfoRaw.roundStart),
          roundEnd: Number(roundInfoRaw.roundEnd),
          available: formatUnits(roundInfoRaw.available, 0),
          collectedProtocolFees: formatUnits(
            roundInfoRaw.collectedProtocolFees,
            0
          ),
          funding: formatUnits(roundInfoRaw.funding, 0),
          approved: roundInfoRaw.approved
        };
        setRoundInfo(roundInfoFormatted);

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch presale information");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading pool information...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PresaleScreen
      accessCode={accessCode}
      poolInfo={poolInfo}
      roundInfo={roundInfo}
    />
  );
};

export default PresaleContainer;

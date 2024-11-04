import { ethers } from "ethers";

import contracts from "../contracts/contracts.json";
import launchpadAbi from "../contracts/ABIs/Launchpad.json";
import paymentPluginAbi from "../contracts/ABIs/PaymentPlugin.json";

import rankToNameMapping from "../config/rankToNameMapping.json";
import poolToProjectMapping from "../config/poolToProjectMapping.json";
import tokenMapping from "../config/tokenMapping.json";
import { RoundInfo } from "@/types/types";

interface ProjectInfo {
  name: string;
  description: string;
  logo: string;
}

interface TokenInfo {
  name: string;
  symbol: string;
  logo: string;
}

// TODO: use same type everywhere
export interface PoolInfo {
  id: number;
  token: TokenInfo;
  projectInfo: ProjectInfo;
  currentRound: {
    roundStart: number;
    roundEnd: number;
    voucherPrice: number;
    goal: number;
    available: number;
  };
}

interface Rank {
  name: string;
  paymentPercent: number;
  requiredXP?: number;
}

interface UserInfo {
  address: string;
  referralCode: string;
  currentXP: number;
  currentRank: Rank;
  nextRank?: Rank;
}

export const getPoolInfo = async (
  provider: ethers.providers.Provider,
  poolId: number
) => {
  const launchpadContract = new ethers.Contract(
    contracts.launchpad,
    launchpadAbi,
    provider
  );
  const { pool, rounds } = await launchpadContract.getPoolInfoWithRounds(
    poolId
  );
  const currentRound = rounds.find(
    (round: RoundInfo) => round.roundEnd < Date.now()
  );
  const poolInfo = {
    id: poolId,
    projectInfo: poolToProjectMapping[poolId],
    token: tokenMapping[pool.paymentToken], // TODO: fix ts error
    currentRound: {
      roundStart: currentRound.roundStart,
      roundEnd: currentRound.roundEnd,
      voucherPrice: currentRound.voucherPrice,
      goal: currentRound.goal,
      available: currentRound.available
    }
  };
  console.log(poolInfo);
  return poolInfo;
};

export const getPoolList = async (provider: ethers.providers.Provider) => {
  const launchpadContract = new ethers.Contract(
    contracts.launchpad,
    launchpadAbi,
    provider
  );
  const poolCount = poolToProjectMapping.length;

  const poolPromises = Array.from({ length: poolCount }, (_, poolId) =>
    launchpadContract.getPoolInfoWithRounds(poolId)
  );

  const poolsData = await Promise.all(poolPromises);

  const poolConfigList: PoolInfo[] = poolsData.map(
    ({ pool, rounds }, poolId) => {
      const currentRound = rounds.find(
        (round: RoundInfo) => round.roundEnd < Date.now()
      );

      return {
        id: poolId,
        projectInfo: poolToProjectMapping[poolId],
        token: tokenMapping[pool.paymentToken], // TODO: fix ts error
        currentRound: {
          roundStart: currentRound.roundStart,
          roundEnd: currentRound.roundEnd,
          voucherPrice: currentRound.voucherPrice,
          goal: currentRound.goal,
          available: currentRound.available
        }
      };
    }
  );
  return poolConfigList;
};

export const getUserInfo = async (
  provider: ethers.providers.Provider,
  address: string
) => {
  const launchpadContract = new ethers.Contract(
    contracts.launchpad,
    launchpadAbi,
    provider
  );

  const paymentPluginContract = new ethers.Contract(
    contracts.paymentPlugin,
    paymentPluginAbi,
    provider
  );

  const [ranks, userTierInfo, referral] = await Promise.all([
    paymentPluginContract.getTiers(),
    paymentPluginContract.userTierInfo(address),
    launchpadContract.userReferral(address)
  ]);

  const isTeamUser = userTierInfo.team;
  const userRanks = isTeamUser ? ranks.team : ranks.solo;

  const currentRank = userRanks[userTierInfo.rank];

  const result: UserInfo = {
    address: address,
    referralCode: referral,
    currentXP: 120,
    // currentXP: userTierInfo.currentXP.toNumber(),
    currentRank: {
      name: rankToNameMapping[userTierInfo.rank],
      paymentPercent: currentRank.paymentPercent.toNumber(),
      requiredXP: 100
      // requiredXP: currentRank.requiredXP.toNumber()
    }
  };
  if (userTierInfo.rank + 1 < userRanks.length) {
    const nextRank = userRanks[userTierInfo.rank];
    result.nextRank = {
      name: rankToNameMapping[userTierInfo.rank + 1],
      paymentPercent: nextRank.paymentPercent.toNumber(),
      requiredXP: 200
      // requiredXP: nextRank.requiredXP.toNumber()
    };
  }

  return result;
};

export const getUserClaimInfo = async (
  provider: ethers.providers.Provider,
  address: string
) => {
  return [
    {
      totalPayment: 0,
      claimedPayment: 0,
      claimable: 100
    },
    {
      totalPayment: 200,
      claimedPayment: 200,
      claimable: 0
    },
    {
      totalPayment: 300,
      claimedPayment: 0,
      claimable: 0
    }
  ];
};

export const getVoucherBalance = async (
  provider: ethers.providers.Provider,
  address: string,
  pool: number
) => {
  return 0;
};

export const claim = async (
  signer: ethers.providers.JsonRpcSigner,
  address: string,
  id: number
) => {
  return;
};

export const upgradeRank = async (
  signer: ethers.providers.JsonRpcSigner,
  address: string
) => {
  return;
};

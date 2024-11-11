
import { ethers } from "ethers";

import contracts from "../contracts/contracts.json";
import launchpadAbi from "../contracts/ABIs/Launchpad.json";
import paymentPluginAbi from "../contracts/ABIs/PaymentPlugin.json";
import voucherPluginAbi from "../contracts/ABIs/VoucherPlugin.json";

import rankToNameMappingSolo from "../config/rankToNameMappingSolo.json";
import rankToNameMappingTeam from "../config/rankToNameMappingTeam.json";
import poolToProjectMapping from "../config/poolToProjectMapping.json";
import tokenMapping from "../config/tokenMapping.json";
import { RoundInfo } from "@/types/types";
import exp from "constants";

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
    id: number;
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

export interface UserInfo {
  address: string;
  referralCode: string;
  isTeamUser: boolean;
  currentXP: number;
  currentRank: Rank;
  nextRank?: Rank;
}
export interface ClaimInfo {
  totalPayment: number;
  claimedPayment: number;
  claimable: number;
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
      id: (rounds.indexOf(currentRound) ?? 0) + 1,
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
          id: (rounds.indexOf(currentRound) ?? 0) + 1,
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
  const rankMapping = isTeamUser ? rankToNameMappingTeam : rankToNameMappingSolo;

  const currentRank = userRanks[userTierInfo.rank];
  const result: UserInfo = {
    address: address,
    referralCode: referral,
    isTeamUser,
    currentXP: userTierInfo.currentXP.toNumber(),
    currentRank: {
      name: rankMapping[userTierInfo.rank.toNumber()],
      paymentPercent: currentRank.paymentPercent.toNumber(),
      requiredXP: currentRank.requiredXP.toNumber()
    }
  };
  if (userTierInfo.rank + 1 < userRanks.length) {
    const nextRank = userRanks[userTierInfo.rank.toNumber()];
    result.nextRank = {
      name: rankMapping[userTierInfo.rank.toNumber() + 1],
      paymentPercent: nextRank.paymentPercent.toNumber(),
      requiredXP: nextRank.requiredXP.toNumber()
    };
  }
// console.log(result)
  return result;
};

export const getUserClaimInfo = async (
  provider: ethers.providers.Provider,
  address: string
) => {
  const paymentPluginContract = new ethers.Contract(
    contracts.paymentPlugin,
    paymentPluginAbi,
    provider
  );

  let promiseList: Promise<BigInt>[] = [];
  for (let poolId = 0; poolId < poolToProjectMapping.length; poolId++) {
    promiseList = promiseList.concat([
      paymentPluginContract.getClaimablePayment(poolId, address),
      paymentPluginContract.getClaimedPayment(poolId, address),
      paymentPluginContract.getTotalPayment(poolId, address)
    ]);
  }

  const resultArray = await Promise.all(promiseList);

  const results = [];
  for (let poolId = 0; poolId < poolToProjectMapping.length; poolId++) {
    results.push({
      claimablePaiment: resultArray[3 * poolId],
      claimedPaiment: resultArray[3 * poolId + 1],
      totalPaiment: resultArray[3 * poolId + 2],
    })
  }

  return results;
};

export const getVoucherBalance = async (
  provider: ethers.providers.Provider,
  poolId: number,
  address: string,
) => {
  const voucherContract = new ethers.Contract(
    contracts.voucherPlugin,
    voucherPluginAbi,
    provider
  );
  const result = await voucherContract.getUserPoints(poolId, address);
  return result;
};

export const claim = async (
  signer: ethers.providers.JsonRpcSigner,
  id: number
) => {
  const launchpadContract = new ethers.Contract(
    contracts.launchpad,
    launchpadAbi,
    signer
  );
  await launchpadContract.claimPayment(id);
};

export const buy = async (
  signer: ethers.providers.JsonRpcSigner,
  poolId: number,
  amount: number,
  referralCode: string,
) => {
  const launchpadContract = new ethers.Contract(
    contracts.launchpad,
    launchpadAbi,
    signer
  );
  await launchpadContract.buy(poolId, amount, referralCode);
}

export const upgradeRank = async (
  signer: ethers.providers.JsonRpcSigner,
) => {
  const launchpadContract = new ethers.Contract(
    contracts.launchpad,
    launchpadAbi,
    signer
  );
  await launchpadContract.levelUp();
};

export const getDivision = async (
  provider: ethers.providers.Provider,
) => {
  return [];
};

export const recruit = async (
  recruit: string,
  rank: number,
  signer: ethers.providers.JsonRpcSigner,
) => {
  const paymentPluginContract = new ethers.Contract(
    contracts.paymentPlugin,
    paymentPluginAbi,
    signer
  );
  await paymentPluginContract.registerRecruit(recruit, rank);
};

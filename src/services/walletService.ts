import { BigNumber, ethers } from "ethers";
import Decimal from "decimal.js";

import contracts from "../contracts/contracts.json";
import launchpadAbi from "../contracts/ABIs/Launchpad.json";
import paymentPluginAbi from "../contracts/ABIs/PaymentPlugin.json";
import voucherPluginAbi from "../contracts/ABIs/VoucherPlugin.json";
import erc20Abi from "../contracts/ABIs/ERC20.json";

import rankToNameMappingSolo from "../config/rankToNameMappingSolo.json";
import rankToNameMappingTeam from "../config/rankToNameMappingTeam.json";
import poolToProjectMapping from "../config/poolToProjectMapping.json";
import tokenMapping from "../config/tokenMapping.json";
import { RoundInfo } from "@/types/types";

const paymentPercentDecimals = 5000000;
const voucherDecimals = new Decimal("1000000000000000000");
const xpDecimals = new Decimal(10).pow(18);

interface ProjectInfo {
  id: number;
  name: string;
  description: string;
  footerText: string;
  logo: string;
}

interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  logo: string;
  decimals: number;
}

// TODO: use same type everywhere
export interface PoolInfo {
  id: number;
  token: TokenInfo;
  projectInfo?: ProjectInfo;
  currentRound: {
    id: number;
    roundStart: number;
    roundEnd: number;
    voucherPrice: string;
    goal: Decimal;
    available: Decimal;
  };
}

interface Rank {
  name: string;
  level: number;
  paymentPercent: number;
  requiredXP?: Decimal;
}

export interface UserInfo {
  address: string;
  referralCode: string;
  isTeamUser: boolean;
  currentXP: Decimal;
  currentRank: Rank;
  nextRank?: Rank;
}
export interface ClaimInfo {
  totalPayment: Decimal;
  claimedPayment: Decimal;
  claimable: Decimal;
}

const processPoolInfo = (pool: any, rounds: any[]) => {
  const currentRound = rounds.find(
    (round: RoundInfo) => new Date(round.roundEnd * 1000) > new Date()
  ) ?? rounds[rounds.length - 1];
  const token = (tokenMapping as { [key: string]: TokenInfo })[
    pool.paymentToken
  ];
  const orgPrice = new Decimal(currentRound.voucherPrice.toString());
  const tokenDecimals = new Decimal(10).pow(new Decimal(token.decimals));
  const price = orgPrice.div(tokenDecimals).toString();
  const poolInfo = {
    id: pool.id,
    projectInfo: poolToProjectMapping.find(
      poolInfo => poolInfo.id === pool.id.toNumber()
    ),
    token: token,
    currentRound: {
      id: (rounds.indexOf(currentRound) ?? 0) + 1,
      roundStart: currentRound.roundStart,
      roundEnd: currentRound.roundEnd,
      voucherPrice: price,
      goal: new Decimal(currentRound.voucherGoal.toString()),
      available: new Decimal(currentRound.availableVouchers.toString())
    }
  };

  return poolInfo;
};

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

  return processPoolInfo(pool, rounds);
};

export const getPoolList = async (provider: ethers.providers.Provider) => {
  const launchpadContract = new ethers.Contract(
    contracts.launchpad,
    launchpadAbi,
    provider
  );

  const poolPromises = poolToProjectMapping.map(pool =>
    launchpadContract.getPoolInfoWithRounds(pool.id)
  );

  const poolsData = await Promise.all(poolPromises);

  const poolConfigList: PoolInfo[] = poolsData.map(
    ({ pool, rounds }, poolId) => {
      return processPoolInfo(pool, rounds);
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
  const rankMapping = isTeamUser
    ? rankToNameMappingTeam
    : rankToNameMappingSolo;
  const userRankId = userTierInfo.rank.toNumber();

  const currentRank = userRanks[userRankId];
  const result: UserInfo = {
    address: address,
    referralCode: referral,
    isTeamUser,
    currentXP: new Decimal(userTierInfo.currentXP.toString()).div(xpDecimals),
    currentRank: {
      name: rankMapping[userRankId],
      level: userRankId + 1,
      paymentPercent: currentRank.paymentPercent / paymentPercentDecimals,
      requiredXP: new Decimal(currentRank.requiredXP.toString()).div(xpDecimals)
    }
  };
  if (userRankId + 1 < userRanks.length) {
    const nextRankId = userRankId + 1;
    const nextRank = userRanks[nextRankId];
    result.nextRank = {
      name: rankMapping[nextRankId],
      level: nextRankId + 1,
      paymentPercent: nextRank.paymentPercent / paymentPercentDecimals,
      requiredXP: new Decimal(nextRank.requiredXP.toString()).div(xpDecimals)
    };
  }

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
  for (let i = 0; i < poolToProjectMapping.length; i++) {
    const poolId = poolToProjectMapping[i].id;
    promiseList = promiseList.concat([
      paymentPluginContract.getClaimablePayment(poolId, address),
      paymentPluginContract.getClaimedPayment(poolId, address),
      paymentPluginContract.getTotalPayment(poolId, address)
    ]);
  }

  const resultArray = await Promise.all(promiseList);

  const results: ClaimInfo[] = [];
  for (let poolId = 0; poolId < poolToProjectMapping.length; poolId++) {
    results.push({
      claimable: new Decimal(resultArray[3 * poolId].toString()),
      claimedPayment: new Decimal(resultArray[3 * poolId + 1].toString()),
      totalPayment: new Decimal(resultArray[3 * poolId + 2].toString())
    });
  }

  return results;
};

export const getVoucherBalance = async (
  provider: ethers.providers.Provider,
  poolId: number,
  address: string
) => {
  const voucherContract = new ethers.Contract(
    contracts.voucherPlugin,
    voucherPluginAbi,
    provider
  );
  const result = await voucherContract.getUserPoints(poolId, address);
  return new Decimal(result.toString()).div(voucherDecimals).toString();
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

export const checkApproval = async (
  signer: ethers.providers.JsonRpcSigner,
  address: string,
  token: TokenInfo,
  amount: number,
) => {
  const convertedAmount = new Decimal(10).pow(token.decimals).mul(amount);
  const tokenContract = new ethers.Contract(token.address, erc20Abi, signer);
  const approvedAmount = await tokenContract.allowance(address, contracts.launchpad);
  return new Decimal(approvedAmount.toString()).gte(convertedAmount);
}

export const approveSpending = async (
  signer: ethers.providers.JsonRpcSigner,
  token: TokenInfo,
) => {
  const tokenContract = new ethers.Contract(token.address, erc20Abi, signer);
  const tx = await tokenContract.approve(
    contracts.launchpad,
    BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),
    { gasLimit: 1000000 }
  );
  return tx;
}

export const buy = async (
  signer: ethers.providers.JsonRpcSigner,
  poolId: number,
  token: TokenInfo,
  amount: number,
  referralCode: string
) => {
  const launchpadContract = new ethers.Contract(
    contracts.launchpad,
    launchpadAbi,
    signer
  );

  const convertedAmount = new Decimal(10).pow(token.decimals).mul(amount);
  const tx = await launchpadContract.buy(
    poolId,
    BigInt(convertedAmount.toString()),
    referralCode,
    { gasLimit: 1000000 }
  );
  return tx;
};

export const upgradeRank = async (signer: ethers.providers.JsonRpcSigner) => {
  const paymentPluginContract = new ethers.Contract(
    contracts.paymentPlugin,
    paymentPluginAbi,
    signer
  );
  const tx = await paymentPluginContract.levelUp({ gasLimit: 1000000 });
  return tx;
};

export const getDivision = async (provider: ethers.providers.Provider) => {
  return [];
};

export const recruit = async (
  recruit: string,
  rank: number,
  signer: ethers.providers.JsonRpcSigner
) => {
  const paymentPluginContract = new ethers.Contract(
    contracts.paymentPlugin,
    paymentPluginAbi,
    signer
  );
  const tx = await paymentPluginContract.registerRecruit(recruit, rank);
  await tx.wait();
};

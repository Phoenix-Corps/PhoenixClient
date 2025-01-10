import { BigNumber, ethers } from "ethers";
import Decimal from "decimal.js";

import configChains from "../config/chains.json";
import configTokens from "../config/tokens.json";
import configRanks from "../config/ranks.json";

import ABI_Launchpad from "../ABIs/Launchpad.json";
import ABI_PaymentPlugin from "../ABIs/PaymentPlugin.json";
import ABI_VoucherPlugin from "../ABIs/VoucherPlugin.json";
import ABI_ERC20 from "../ABIs/ERC20.json";

import configProjects from "../config/projects.json";
import configPools from "../config/pools.json";

import {
  RoundInfo,
  TokenInfo,
  PoolInfo,
  HireRank,
  UserInfo,
  ClaimInfo,
  Recruit,
  ConfigChain,
  ConfigToken,
  VoucherPluginPoolInfo
} from "@/types/types";

const oneEther = new Decimal(10).pow(18);
const paymentPercentDecimals = 5000000;
const voucherDecimals = oneEther;
const xpDecimals = oneEther;
const uint256_max = BigNumber.from(
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
);

export const getChainInfo = (id: number) => {
  return (configChains as ConfigChain[]).find(c => c.id === id) || null;
};

export const getContracts = async (
  providerOrSigner: ethers.providers.Provider | ethers.providers.JsonRpcSigner
) => {
  const chainId =
    providerOrSigner instanceof ethers.providers.Provider
      ? (await (providerOrSigner as ethers.providers.Provider).getNetwork())
          .chainId
      : await (providerOrSigner as ethers.providers.JsonRpcSigner).getChainId();
  const con = getChainInfo(chainId)!.contracts;
  return {
    launchpad: new ethers.Contract(
      con.launchpad,
      ABI_Launchpad,
      providerOrSigner
    ),
    paymentPlugin: new ethers.Contract(
      con.paymentPlugin,
      ABI_PaymentPlugin,
      providerOrSigner
    ),
    voucherPlugin: new ethers.Contract(
      con.voucherPlugin,
      ABI_VoucherPlugin,
      providerOrSigner
    )
  };
};

export const getTokenInfo = (
  chainId: number,
  addressOrID: string | null
): TokenInfo | null => {
  const token =
    (configTokens as any as ConfigToken[]).find(
      t =>
        t.addresses[chainId]?.toLowerCase() === addressOrID!.toLowerCase() ||
        addressOrID!.toLowerCase() === t.symbol.toLowerCase()
    ) || null;
  if (token !== null) {
    return {
      id: token!.id,
      symbol: token!.symbol,
      name: token!.name,
      logo: token!.logo,
      decimals: token!.decimals?.[chainId] || token!.defaultDecimals || 18,
      address: token!.addresses[chainId]!.toLowerCase()
    };
  }
  return null;
};

export const getChainTokens = (chainId: number): TokenInfo[] => {
  const tokens = (configTokens as any as ConfigToken[]).filter(
    t => t.addresses[chainId] !== undefined
  );
  return tokens.map(t => ({
    id: t.id,
    symbol: t.symbol,
    name: t.name,
    logo: t.logo,
    decimals: t.decimals?.[chainId] || t.defaultDecimals || 18,
    address: t.addresses[chainId]!.toLowerCase()
  }));
};

export const findToken = (address: string) => {
  return getTokenInfo(8453, address)!;
};

const processPoolInfo = (chainId: number, pool: any, rounds: any[]) => {
  const currentRound =
    rounds.find(
      (round: RoundInfo) => new Date(round.roundEnd * 1000) > new Date()
    ) ?? rounds[rounds.length - 1];
  const token = getTokenInfo(chainId, pool.paymentToken)!;
  const orgPrice = new Decimal(currentRound.voucherPrice.toString());
  const tokenDecimals = new Decimal(10).pow(new Decimal(token.decimals));
  const price = orgPrice.div(tokenDecimals).toString();
  const poolInfo = {
    id: pool.id,
    projectInfo: configProjects.find(
      project =>
        project.id === (configPools as any)[chainId][pool.id.toNumber()]
    ),
    token: token,
    currentRound: {
      id: (rounds.indexOf(currentRound) ?? 0) + 1,
      roundStart: currentRound.roundStart,
      roundEnd: currentRound.roundEnd,
      voucherPrice: price,
      goal: new Decimal(currentRound.voucherGoal.toString()),
      fundingGoal: new Decimal(currentRound.fundingGoal.toString()).div(
        tokenDecimals
      ),
      available: new Decimal(currentRound.availableVouchers.toString())
    }
  };

  return poolInfo;
};

export const getPoolRedeemInfo = async (
  provider: ethers.providers.Provider,
  poolId: number
): Promise<VoucherPluginPoolInfo> => {
  const con = await getContracts(provider);
  const chainId = (await provider.getNetwork()).chainId;
  const data = await con.voucherPlugin.poolInfo(poolId);
  const tokenInfo = getTokenInfo(chainId, data.redeemToken);
  return {
    id: poolId,
    token: tokenInfo,
    totalVoucherPoints: new Decimal(data.totalVoucherPoints.toString()).div(
      new Decimal(10).pow(new Decimal(18))
    ),
    totalBalance:
      tokenInfo === null
        ? new Decimal(0)
        : new Decimal(data.totalBalance.toString()).div(
            new Decimal(10).pow(new Decimal(tokenInfo.decimals))
          )
  };
};

export const getPoolInfo = async (
  provider: ethers.providers.Provider,
  poolId: number
) => {
  const con = await getContracts(provider);
  const chainId = (await provider.getNetwork()).chainId;
  const { pool, rounds } = await con.launchpad.getPoolInfoWithRounds(poolId);
  return processPoolInfo(chainId, pool, rounds);
};

export const getPoolList = async (provider: ethers.providers.Provider) => {
  const con = await getContracts(provider);
  const chainId = (await provider.getNetwork()).chainId;
  const chainPools = (configPools as any)[chainId];
  const poolPromises = Object.keys(chainPools).map(k =>
    con.launchpad.getPoolInfoWithRounds(chainPools[k])
  );

  const poolsData = await Promise.all(poolPromises);

  const poolConfigList: PoolInfo[] = poolsData.map(
    ({ pool, rounds }, poolId) => {
      return processPoolInfo(chainId, pool, rounds);
    }
  );
  return poolConfigList;
};

export const getHireRankInfo = async (
  provider: ethers.providers.Provider,
  address: string,
  rankIds: number[]
): Promise<HireRank[]> => {
  const con = await getContracts(provider);
  const ranksPromise = con.paymentPlugin.getTiers();
  const promises = rankIds.map(rankId =>
    con.paymentPlugin.freeRecruitments(address, rankId)
  );
  let results = await Promise.all(promises.concat(ranksPromise));
  const ranks = results.pop();
  return rankIds.map((rankId, index) => {
    const rank = ranks.team[rankId];
    return {
      name: configRanks.team[rankId],
      id: rankId,
      level: rankId + 1,
      vouchers: results.at(index).toNumber(),
      hireCost: new Decimal(rank.xpHireCost.toString()).div(xpDecimals)
    };
  });
};

export const getUserInfo = async (
  provider: ethers.providers.Provider,
  address: string
) => {
  const con = await getContracts(provider);
  const [ranks, userTierInfo, referral] = await Promise.all([
    con.paymentPlugin.getTiers(),
    con.paymentPlugin.userTierInfo(address),
    con.launchpad.userReferral(address)
  ]);

  const isTeamUser = userTierInfo.team;
  const userRanks = isTeamUser ? ranks.team : ranks.solo;
  const rankMapping = isTeamUser ? configRanks.team : configRanks.solo;
  const userRankId = userTierInfo.rank.toNumber();

  const currentRank = userRanks[userRankId];
  const result: UserInfo = {
    address: address,
    referralCode: referral,
    isTeamUser,
    canHire: currentRank.canHire,
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
  const con = await getContracts(provider);
  const chainId = (await provider.getNetwork()).chainId;
  const pools = Object.keys((configPools as any)[chainId]).map(p =>
    parseInt(p)
  );

  let promiseList: Promise<BigInt>[] = [];
  for (let i = 0; i < pools.length; i++) {
    const poolId = pools[i];
    promiseList = promiseList.concat([
      con.paymentPlugin.getClaimablePayment(poolId, address),
      con.paymentPlugin.getClaimedPayment(poolId, address),
      con.paymentPlugin.getTotalPayment(poolId, address)
    ]);
  }

  const resultArray = await Promise.all(promiseList);

  const results: ClaimInfo[] = [];
  for (let poolId = 0; poolId < pools.length; poolId++) {
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
  const con = await getContracts(provider);
  const result = await con.voucherPlugin.getUserPoints(poolId, address);
  return new Decimal(result.toString()).div(voucherDecimals);
};

export const claim = async (
  signer: ethers.providers.JsonRpcSigner,
  id: number
) => {
  const con = await getContracts(signer);
  const tx = await con.launchpad.claimPayment(id);
  return tx;
};

export const checkApproval = async (
  signer: ethers.providers.JsonRpcSigner,
  address: string,
  token: TokenInfo,
  amount: number
) => {
  const convertedAmount = new Decimal(10).pow(token.decimals).mul(amount);
  const tokenContract = new ethers.Contract(token.address!, ABI_ERC20, signer);
  const con = await getContracts(signer);
  const approvedAmount = await tokenContract.allowance(
    address,
    con.launchpad.address
  );
  return new Decimal(approvedAmount.toString()).gte(convertedAmount);
};

export const approveSpending = async (
  signer: ethers.providers.JsonRpcSigner,
  token: TokenInfo
) => {
  const tokenContract = new ethers.Contract(token.address!, ABI_ERC20, signer);
  const con = await getContracts(signer);
  const tx = await tokenContract.approve(con.launchpad.address, uint256_max, {
    gasLimit: 1000000
  });
  return tx;
};

export const buy = async (
  signer: ethers.providers.JsonRpcSigner,
  poolId: number,
  token: TokenInfo,
  amount: number,
  referralCode: string
) => {
  const con = await getContracts(signer);
  const convertedAmount = new Decimal(10).pow(token.decimals).mul(amount);
  const tx = await con.launchpad.buy(
    poolId,
    BigInt(convertedAmount.toString()),
    referralCode,
    { gasLimit: 1000000 }
  );
  return tx;
};

export const redeem = async (
  signer: ethers.providers.JsonRpcSigner,
  poolId: number
) => {
  const con = await getContracts(signer);
  const tx = await con.launchpad.redeemVouchers(poolId, { gasLimit: 1000000 });
  return tx;
};

export const upgradeRank = async (signer: ethers.providers.JsonRpcSigner) => {
  const con = await getContracts(signer);
  const tx = await con.paymentPlugin.levelUp({ gasLimit: 1000000 });
  return tx;
};

export const getDivision = async (
  provider: ethers.providers.Provider,
  address: string,
  offset: number,
  count: number
) => {
  const con = await getContracts(provider);
  const recruits = await con.paymentPlugin.batchGetRecruits(
    address,
    offset,
    count
  );
  const promises = recruits.map((recruit: any) =>
    con.launchpad.userReferral(recruit[0])
  );
  const referralCodes = await Promise.all(promises);
  const results: Recruit[] = recruits.map((recruit: any, index: number) => {
    return {
      code: referralCodes[index],
      address: recruit[0],
      rankId: parseInt(recruit[1]),
      rankName: configRanks.team[recruit[1]]
    };
  });

  return results;
};

export const registerUser = async (signer: ethers.providers.JsonRpcSigner) => {
  const con = await getContracts(signer);
  const tx = await con.paymentPlugin.registerSolo(true);
  return tx;
};

export const recruit = async (
  recruit: string,
  rank: number,
  signer: ethers.providers.JsonRpcSigner
) => {
  const con = await getContracts(signer);
  const tx = await con.paymentPlugin.registerRecruit(recruit, rank, true, {
    gasLimit: 1000000
  });
  return tx;
};

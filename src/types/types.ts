import Decimal from "decimal.js";

export interface ProjectInfo {
  id: number;
  name: string;
  description: string;
  footerText: string;
  logo: string;
  website: string;
  socials: {
    discord: string;
    twitter: string;
    telegram: string;
  };
}

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
    fundingGoal: Decimal;
    available: Decimal;
  };
}

export interface VoucherPluginPoolInfo {
  id: number;
  token: TokenInfo | null;
  totalVoucherPoints: Decimal;
  totalBalance: Decimal;
}

export interface RoundInfo {
  goal: string;
  voucherPrice: string;
  roundStart: number;
  roundEnd: number;
  available: string;
  collectedProtocolFees: string;
  funding: string;
  approved: boolean;
}

export interface Rank {
  name: string;
  level: number;
  paymentPercent: number;
  requiredXP?: Decimal;
}

export interface HireRank {
  name: string;
  id: number;
  level: number;
  hireCost: Decimal;
  vouchers: number;
}

export interface UserInfo {
  address: string;
  referralCode: string;
  isTeamUser: boolean;
  currentXP: Decimal;
  canHire: boolean;
  currentRank: Rank;
  nextRank?: Rank;
}

export interface ClaimInfo {
  totalPayment: Decimal;
  claimedPayment: Decimal;
  claimable: Decimal;
}

export interface Recruit {
  code: string;
  address: string;
  rankName: string;
  rankId: number;
}

export interface ConfigChain {
  id: number;
  name: string;
  logo: string;
  coin: string;
  contracts: {
    launchpad: string;
    voucherPlugin: string;
    paymentPlugin: string;
  };
}

export interface TokenInfoChainAddress {
  [key: string]: string | null;
}

export interface TokenInfoChainDecimals {
  [key: string]: number;
}

export interface TokenInfo {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  decimals: number;
  address: string | null;
}

export interface ConfigToken {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  pythID?: string;
  defaultDecimals: number | undefined;
  addresses: TokenInfoChainAddress;
  decimals: TokenInfoChainDecimals | undefined;
}

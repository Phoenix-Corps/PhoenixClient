import Decimal from "decimal.js";

export interface ProjectInfo {
  id: number;
  name: string;
  description: string;
  footerText: string;
  logo: string;
  website: string;
  discord: string;
  twitter: string;
  telegram: string;
}

export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  logo: string;
  decimals: number;
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

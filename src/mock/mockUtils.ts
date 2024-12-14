import Decimal from "decimal.js";

import { findToken } from "@/services/walletService";

import { ClaimInfo, PoolInfo, Recruit } from "@/types/types";

import configRanks from "@/config/rankNames.json";

import mockClaims from "@/mock/claims.json";
import mockRecruits from "@/mock/recruits.json";

[
  {
    code: "123456",
    address: "0x0",
    rank: 0
  }
];

export const mock_claim_projects = (): PoolInfo[] => {
  return mockClaims.map(
    (v, idx) =>
      ({
        id: idx,
        token: findToken(v.token),
        projectInfo: {
          id: idx,
          name: v.name,
          logo: v.logo
        }
      } as PoolInfo)
  );
};

export const mock_claim_claimInfo = (): { id: number; claim: ClaimInfo }[] => {
  return mockClaims.map((v, idx) => {
    return {
      id: idx,
      claim: {
        totalPayment: new Decimal(v.total.toString()),
        claimable: new Decimal(v.claimable.toString()),
        claimedPayment: new Decimal(v.claimed.toString())
      }
    };
  });
};

export const mock_division_recruits = (): Recruit[] => {
  return mockRecruits.map(r => ({
    code: r.code,
    address: r.address,
    rankName: configRanks.team[r.rank],
    rankId: r.rank + 1
  }));
};

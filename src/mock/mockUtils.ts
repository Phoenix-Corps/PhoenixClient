import Decimal from "decimal.js";

import { ClaimInfo, PoolInfo } from "@/types/types";

import mockClaims from "@/mock/claims.json";
import { findToken } from "@/services/walletService";

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

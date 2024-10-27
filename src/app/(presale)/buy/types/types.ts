export interface PoolInfo {
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
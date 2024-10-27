import { useEffect, useMemo } from "react";
import { useReadContracts, useAccount } from "wagmi";
import { paymentPluginTierABI } from "@/app/dashboard/abis/paymenPluginTierABI";
import { PaymentPluginTierAddress } from "@/app/dashboard/constants/contractAddresses";
import { formatUnits, zeroAddress } from "viem";

interface UseUserTotalPaymentResult {
  totalPayment: any;
  isLoading: boolean;
  error: Error | null;
}

export const useUserTotalPayment = (
  poolIds: number[],
  userAddress?: string
): UseUserTotalPaymentResult => {
  const address = userAddress || zeroAddress;
  const contracts = useMemo(
    () =>
      poolIds.map((poolId) => ({
        address: PaymentPluginTierAddress as `0x${string}`,
        abi: paymentPluginTierABI,
        functionName: "getTotalPayment",
        args: [poolId, address],
      })),
    [poolIds, address]
  );

  const {
    data: paymentsData,
    isLoading,
    error,
  } = useReadContracts({
    contracts,
  });

  let totalSum = 0
  console.log("paymentsData", paymentsData);

  //@ts-ignore
  if (paymentsData){
      //@ts-ignore
  for (let i = 0; i < paymentsData.length; i++) {
    console.log("paymentsData",  );
      //@ts-ignore
    const payment = paymentsData[i].result as bigint;
    totalSum += Number(payment);
  }
  }

  

  // Sum up the total payments
  const totalPayment = formatUnits( BigInt(totalSum), 9 );

  return {
    totalPayment,
    isLoading,
    error: error || null,
  };
};

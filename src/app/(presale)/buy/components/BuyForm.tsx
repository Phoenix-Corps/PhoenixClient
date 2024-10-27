"use client";

import React, { useState, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { launchpadABI } from "../abis/launchpadABI";
import { erc20Abi } from "viem";
import { registerBuyTransaction } from "../actionts";
import { LaunchpadAddress } from "../constants/contractAddresses";
import { TOKEN_ADDRESS, TOKEN_SYMBOL, TOKEN_DECIMALS } from "../constants/tokenConfig";

interface BuyFormProps {
  roundPrice: string;
  tokenSymbol: string;
  accessCode: string;
  poolId: number;
  currentRound: number;
}

const BuyForm: React.FC<BuyFormProps> = ({
  roundPrice,
  tokenSymbol,
  accessCode,
  poolId,
  currentRound,
}) => {
  const [tokenAmount, setTokenAmount] = useState("");
  const [usdtAmount, setUsdtAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { address, isConnected } = useAccount();

  const { data: balance } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address!],
    query: {
      refetchInterval: 10000, // Refetch every 10 seconds
    },
  });

  const {
    data: allowance,
    refetch: refetchAllowance, // Used to manually refetch allowance
  } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: erc20Abi,
    functionName: "allowance",
    args: [address!, LaunchpadAddress],
    query: {
      refetchInterval: 10000, // Refetch every 10 seconds
    },
  });

  // Separate useWriteContract hooks for approve and buy
  const {
    writeContract: writeApproveContract,
    data: approveHash,
    error: approveError,
    isPending: isApprovePending,
  } = useWriteContract();

  const {
    writeContract: writeBuyContract,
    data: buyHash,
    error: buyError,
    isPending: isBuyPending,
  } = useWriteContract();

  // Separate useWaitForTransactionReceipt hooks
  const {
    isLoading: isApproveConfirming,
    isSuccess: isApproveConfirmed,
  } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  const {
    isLoading: isBuyConfirming,
    isSuccess: isBuyConfirmed,
  } = useWaitForTransactionReceipt({
    hash: buyHash,
  });

  useEffect(() => {
    if (isApproveConfirmed) {
      // Recheck the allowance after a successful approve transaction
      refetchAllowance();
    }
  }, [isApproveConfirmed, refetchAllowance]);

  useEffect(() => {
    if (isBuyConfirmed) {
      // Call registerBuyTransaction after a successful buy transaction
      registerBuyTransaction({
        code: accessCode,
        txHash: buyHash!,
        amount: +usdtAmount,
        walletAddress: address!,
        token: TOKEN_SYMBOL,
        price: +roundPrice,
        poolId: poolId,
        currentRound: currentRound,
      });
    }
  }, [isBuyConfirmed]);

  useEffect(() => {
    if (usdtAmount) {
      const calculatedTokens = (
        parseFloat(usdtAmount) / parseFloat(roundPrice)
      ).toFixed(6);
      setTokenAmount(calculatedTokens);
    } else {
      setTokenAmount("");
    }
  }, [usdtAmount, roundPrice]);

  useEffect(() => {
    if (approveError) {
      setErrorMessage(approveError.message);
    } else if (buyError) {
      setErrorMessage(buyError.message);
    }
  }, [approveError, buyError]);

  const handleApprove = async () => {
    if (!address || !usdtAmount) return;

    const amount = parseUnits(usdtAmount, TOKEN_DECIMALS);
    setErrorMessage(null); // Clear any previous errors

    try {
      writeApproveContract({
        address: TOKEN_ADDRESS,
        abi: erc20Abi,
        functionName: "approve",
        args: [LaunchpadAddress, amount],
      });
    } catch (err: any) {
      console.error("Error approving tokens:", err);
      setErrorMessage(
        err.message || "An unexpected error occurred while approving."
      );
    }
  };

  const handleBuy = async () => {
    if (!address || !usdtAmount) return;

    const amount = parseUnits(usdtAmount, TOKEN_DECIMALS);
    setErrorMessage(null); // Clear any previous errors

    try {
      writeBuyContract({
        address: LaunchpadAddress,
        abi: launchpadABI,
        functionName: "buy",
        args: [BigInt(0), amount, accessCode],
        chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
      });
    } catch (err: any) {
      console.error("Error buying tokens:", err);
      setErrorMessage(
        err.message || "An unexpected error occurred while buying."
      );
    }
  };

  const hasAllowance =
    allowance &&
    usdtAmount &&
    parseUnits(usdtAmount, TOKEN_DECIMALS) <= allowance;

  const isPending = isApprovePending || isBuyPending;
  const isConfirming = isApproveConfirming || isBuyConfirming;

  return (
    <div className="bg-gray-800 p-8 rounded-xl">
      <h2 className="text-2xl font-bold text-white mb-6">Buy {tokenSymbol}</h2>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="usdt-amount"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            {TOKEN_SYMBOL} Amount
          </label>
          <input
            id="usdt-amount"
            type="number"
            value={usdtAmount}
            onChange={(e) => setUsdtAmount(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
            step="0.000001"
          />
        </div>
        <div>
          <label
            htmlFor="token-amount"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            {tokenSymbol} Amount
          </label>
          <input
            id="token-amount"
            type="text"
            value={tokenAmount}
            readOnly
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg"
            placeholder="0.00"
          />
        </div>
        {isConnected && balance !== undefined && (
          <p className="text-sm text-gray-400 break-words">
            Balance: {formatUnits(balance, TOKEN_DECIMALS)} {TOKEN_SYMBOL}
          </p>
        )}
        <button
          onClick={hasAllowance ? handleBuy : handleApprove}
          disabled={!isConnected || !usdtAmount || isPending || isConfirming}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!isConnected
            ? "Connect Wallet to Buy"
            : isPending
            ? "Confirming..."
            : isConfirming
            ? "Processing..."
            : hasAllowance
            ? "Buy Now"
            : "Allow Token"}
        </button>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
        {(isApproveConfirmed || isBuyConfirmed) && (
          <p className="text-green-500 text-sm mt-2 break-words">
            Transaction successful! Hash: {buyHash || approveHash}
          </p>
        )}
      </div>
    </div>
  );
};

export default BuyForm;

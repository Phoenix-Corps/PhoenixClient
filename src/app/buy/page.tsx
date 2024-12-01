"use client";

import { useBlockchainContext } from "@/context/BlockchainContext";
import { useDashboardContext } from "@/context/DashboardContext";
import { useEthersProvider } from "@/services/useEthersProvider";
import {
  PoolInfo,
  approveSpending,
  buy,
  checkApproval,
  getVoucherBalance
} from "@/services/walletService";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BigNumber } from "ethers";
import { useEthersSigner } from "@/services/useEthersSigner";
import LoadingOverlay from "./components/loadingOverlay";
import TransactionHandler from "./components/transactionHandler";
import COPY_ICON from "@/app/dashboard/public/copy-icon.svg";
import PhoenixBlueBox from "@public/home/phoenix-logo-3.png";
import VoucherICON from "@/../public/buy/phoenix-coin.png";
import { BuyButton } from "./components/BuyButton";
import { SellerLinkBar } from "./components/SellerLinkBar";
import Decimal from "decimal.js";

type Props = {};

const Input = (props: {
  amount: number | null;
  tokenName?: string;
  amountUpdated: (amount: number | null) => void;
  imageSrc?: string;
}) => {
  return (
    <div className="flex flex-row items-center border border-[rgba(255, 255, 255, 0.3)] rounded w-full bg-gradient-to-b from-white/10 to-blue-300/20 p-2 ">
      <input
        className="flex-1 bg-transparent text-white text-lg font-bold placeholder-white/50 focus:outline-none px-4"
        value={props.amount ?? ""}
        placeholder="0.00"
        onChange={(e: any) => props.amountUpdated(e.target.value || null)}
      />
      {/* <div className="h-8 w-px bg-white/50 mx-2"></div> */}
      {props.imageSrc ? (
        <>
          <Image
            src={props.imageSrc}
            alt="Description of the image"
            width={30}
            height={30}
            style={{ objectFit: "contain" }}
          />
          <div className="w-[60px] pl-4 aeroport text-[10px]">
            {props.tokenName ?? ""}
          </div>
        </>
      ) : (
        <span className="text-sm text-white/50">...</span>
      )}
    </div>
  );
};

const BuyPageWrapper = (props: Props) => {
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string>("");

  const [tx, setTx] = useState<Promise<any> | undefined>(undefined);
  const [txInProgressMessage, setTxInProgressMessage] = useState<string>("");
  const [txSuccessMessage, setTxSuccessMessage] = useState<string>("");

  const [buyInProgress, setBuyInProgress] = useState<boolean>(false);

  const [isCodeCopied, setIsCodeCopied] = useState(false);

  const [amount, setAmount] = useState<number | null>(null);
  const [amountVouchers, setAmountVouchers] = useState<number | null>(null);
  const [vouchersOwned, setVouchersOwned] = useState<Decimal | null>(null);

  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const searchParams = useSearchParams();
  const provider = useEthersProvider();
  const signer = useEthersSigner();

  const { fetchPoolInfoById } = useBlockchainContext();
  const { userInfo, walletAddress, fetchUserInfo } = useDashboardContext();

  const initialError = useMemo(() => {
    const poolIdValue = searchParams.get("poolId");
    return !poolIdValue
      ? "Error: Required URL parameters are missing or invalid."
      : "";
  }, [searchParams]);

  const [poolId, setPoolId] = useState(searchParams.get("poolId") || "");
  const [code, setCode] = useState(searchParams.get("code") || "");
  const [error, setError] = useState(initialError);
  const [currentPoolInfo, setCurrentPoolInfo] = useState<PoolInfo | undefined>(
    undefined
  );

  const {
    data: balanceData,
    isError,
    isLoading
  } = useBalance({ address, token: currentPoolInfo?.token.address! as any });
  const normalizedBalance = balanceData ? parseFloat(balanceData.formatted) : 0;

  useEffect(() => {
    if (walletAddress) {
      fetchUserInfo(walletAddress);
    }
  }, [walletAddress]);

  const urlForCopy = useMemo(() => {
    if (userInfo?.referralCode && currentPoolInfo?.projectInfo?.id) {
      const { origin, pathname } = window.location;
      const host = origin + pathname;
      const poolIdRefCode =
        "?poolId=" +
        currentPoolInfo.projectInfo.id +
        "&code=" +
        userInfo.referralCode;
      console.log(poolIdRefCode);
      return host + poolIdRefCode;
    } else {
      return "";
    }
  }, [userInfo, currentPoolInfo]);

  useEffect(() => {
    if (provider && address && poolId && !buyInProgress) {
      getVoucherBalance(provider, parseInt(poolId), address)
        .then(voucherBalanceResult => {
          setVouchersOwned(voucherBalanceResult);
        })
        .catch(error => {
          console.error(error);
          setError("Error fetching voucher information.");
        });
    }
  }, [
    buyInProgress,
    poolId,
    address,
    getVoucherBalance,
    setVouchersOwned,
    setError
  ]);

  useEffect(() => {
    const poolIdValue = searchParams.get("poolId");
    const codeValue = searchParams.get("code");

    setPoolId(poolIdValue || "");
    setCode(codeValue || "");

    if (!poolIdValue) {
      setError("Error: Required URL parameters are missing or invalid.");
    } else {
      setError("");
      fetchPoolInfoById(poolIdValue)
        .then(poolData => {
          setCurrentPoolInfo(poolData);
        })
        .catch(err => {
          console.error(err);
          setError("Error fetching pool information.");
        });
    }
  }, [
    searchParams,
    fetchPoolInfoById,
    setCurrentPoolInfo,
    setError,
    setPoolId,
    setCode
  ]);

  useEffect(() => {
    if (amount !== null && currentPoolInfo?.currentRound?.voucherPrice) {
      const vouchers =
        amount /
        parseFloat(currentPoolInfo.currentRound.voucherPrice.toString());
      setAmountVouchers(
        Number.isFinite(vouchers) ? parseFloat(vouchers.toFixed(2)) : null
      );
    }
  }, [amount, currentPoolInfo]);

  useEffect(() => {
    if (
      amountVouchers !== null &&
      currentPoolInfo?.currentRound?.voucherPrice
    ) {
      const value =
        amountVouchers *
        parseFloat(currentPoolInfo.currentRound.voucherPrice.toString());
      setAmount(Number.isFinite(value) ? parseFloat(value.toFixed(2)) : null);
    }
  }, [amountVouchers, currentPoolInfo]);

  const isAmountValid = () => {
    if (amount === null) return false;
    return amount <= parseFloat(normalizedBalance.toString());
  };

  const handleSubmit = useCallback(() => {
    const runBuy = async () => {
      // e.preventDefault();
      setShowWarning(false);
      setWarningMessage("");

      if (!isAmountValid()) {
        setShowWarning(true);
        setWarningMessage(
          "Incorrect input value / not enough funds in wallet!"
        );
        return;
      }
      if (!code || code.length !== 8) {
        setShowWarning(true);
        setWarningMessage("Please enter referral code in proper format!");
        return;
      }

      if (signer) {
        try {
          const hasApproval = await checkApproval(
            signer,
            address!,
            currentPoolInfo!.token,
            amount!
          );

          if (!hasApproval) {
            const approveTx = approveSpending(signer, currentPoolInfo!.token);

            setTxInProgressMessage(
              "Waiting for Aprove spending transation to be completed."
            );
            setTxSuccessMessage("Aprove spending transation completed.");
            setTx(approveTx);

            await (await approveTx).wait();
          }

          const buyTx = buy(
            signer,
            +poolId,
            currentPoolInfo!.token,
            amount!,
            code
          );

          setTxInProgressMessage("Waiting for Buy transation to be completed.");
          setTxSuccessMessage("Purchase successful!");
          setTx(buyTx);

          await (await buyTx).wait();
        } finally {
          setBuyInProgress(false);
        }
      }
    };

    runBuy();
  }, [
    isAmountValid,
    setBuyInProgress,
    setError,
    setShowWarning,
    setWarningMessage,
    setTx,
    setTxInProgressMessage,
    setTxSuccessMessage,
    signer,
    poolId,
    currentPoolInfo,
    amount,
    code
  ]);

  const conversionRateText = useMemo(() => {
    if (currentPoolInfo && currentPoolInfo.projectInfo) {
      return `1 ${currentPoolInfo?.projectInfo?.name} = ${currentPoolInfo?.currentRound.voucherPrice} ${currentPoolInfo?.token.name}`;
    } else {
      return "Loading conversion rate...";
    }
  }, [currentPoolInfo]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className=" m-4">
      <div className="flex flex-col items-center justify-center bg-[rgba(25,96,255,0.6)] md:0 rounded-[4px] w-fit md:m-auto">
        {isConnected && (
          <button
            onClick={() => disconnect()}
            className="buy-button absolute top-0 right-3 w-[100px] h-[40px] text-xs p-1"
          >
            Disconnect wallet
          </button>
        )}
        <div className="voucher-wrapper din mb-0 flex w-full flex-wrap ">
          <div className="voucher-text-input-wrapper grow md:p-10 p-6 flex flex-col items-center">
            <div className="flex flex-row justify-start items-center w-full">
              <div className="mini-blue-box w-[64px] h-[64px] rounded-full flex justify-center items-center">
                <Image
                  src={PhoenixBlueBox.src}
                  width={37}
                  height={43}
                  alt="project-logo"
                />
              </div>
              <div className="buy-heading-text ml-[24px]">
                {currentPoolInfo?.projectInfo?.name || "Loading..."}
              </div>
            </div>
            <div className="buy-main-text w-full aeroport text-justify">
              {currentPoolInfo?.projectInfo?.description ||
                "Loading description..."}
            </div>
            {isConnected ? (
              <div className="relative buy-wrapper-main w-full">
                <Input
                  tokenName={currentPoolInfo?.token.symbol}
                  imageSrc={currentPoolInfo?.token.logo}
                  amount={amount}
                  amountUpdated={setAmount}
                />
                <div className="h-[5px]" />
                <div className="phoenix-imgae-token-wrapper">
                  <Input
                    tokenName={"Voucher"}
                    imageSrc={VoucherICON.src}
                    amount={amountVouchers}
                    amountUpdated={setAmountVouchers}
                  />
                </div>
                <div className="aeroport text-xs mt-2 h-[40px] w-full flex flex-row items-between">
                  <div>
                    <div className="text-left z-10 w-[250px]">
                      {conversionRateText}
                    </div>
                  </div>
                  <div className="text-red-800 text-right">
                    {showWarning ? warningMessage : ""}
                  </div>
                </div>
                <div className="w-full flex flex-row flex-wrap justify-between gap-y-2">
                  <div className="md:w-auto w-full">
                    <input
                      className="buy-input-main code-input mt-0 text-white placeholder-white/50 w-full"
                      value={code ?? ""}
                      placeholder="Referral Code"
                      onChange={(e: any) => setCode(e.target.value || null)}
                    />
                  </div>
                  <>
                    <BuyButton onClick={handleSubmit} />
                  </>
                </div>
                <div className="text-under-code text-left">
                  {currentPoolInfo?.projectInfo?.footerText}
                </div>
              </div>
            ) : (
              <div className="text-center items-center flex flex-col justify-center">
                <p className="mb-4">Connect your wallet to continue</p>
                <ConnectButton />
              </div>
            )}
          </div>
          <div className="voucher-image-right relative overflow-hidden md:h-auto h-[161px]">
            {isConnected && (
              <div className="voucher-text-in-image">
                <div className="currency-and-text">
                  {vouchersOwned ? (
                    <div className="voucher-text-number font-extrabold z-10">
                      {vouchersOwned.toFixed(2)}
                    </div>
                  ) : (
                    <div>Loading vouchers...</div>
                  )}
                  <div className="voucher-text-text z-10">
                    {currentPoolInfo?.projectInfo?.name}
                  </div>
                </div>
              </div>
            )}
            <div className="voucher-phoenix-image "></div>
          </div>
        </div>
      </div>
      {isConnected && (
        <>
          {currentPoolInfo?.currentRound.id && userInfo?.referralCode && (
            <SellerLinkBar url={urlForCopy} />
          )}
        </>
      )}
      <TransactionHandler
        txPromise={tx}
        loadingMessage={txInProgressMessage}
        successMessage={txSuccessMessage}
        onTxDone={() => {}}
      />
      <LoadingOverlay isLoading={buyInProgress} />
    </div>
  );
};

const BuyPage = (props: Props) => {
  return (
    <Suspense>
      <BuyPageWrapper {...props} />
    </Suspense>
  );
};

export default BuyPage;

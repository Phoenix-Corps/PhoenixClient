"use client";

import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import Decimal from "decimal.js";
import { useAccount, useBalance } from "wagmi";

import { Checkbox } from "@radix-ui/themes";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useEthersSigner } from "@/services/useEthersSigner";
import { useEthersProvider } from "@/services/useEthersProvider";

import {
  approveSpending,
  buy,
  checkApproval,
  getPoolRedeemInfo,
  getVoucherBalance,
  redeem
} from "@/services/walletService";

import { LoadingOverlay } from "@/components/Page/LoadingOverlay";
import { BuyButton } from "@/components/pages/buy/BuyButton";
import { SellerLinkBar } from "@/components/pages/buy/SellerLinkBar";
import { BuyPageFooter } from "@/components/pages/buy/BuyPageFooter";
import { Header } from "@/components/Page/Header";
import { NumberInput } from "@/components/Inputs/NumberInputs";

import { useBlockchainContext } from "@/components/context/BlockchainContext";
import { useDashboardContext } from "@/components/context/DashboardContext";
import { useTransactionHandler } from "@/components/context/TransactionHandlerContext";

import { PoolInfo, VoucherPluginPoolInfo } from "@/types/types";

import Icon_Voucher from "@public/pages/buy/phoenix-coin.png";

import "./page.css";
import { ButtonYellow } from "@/components/Buttons/ButtonYellow";

type Props = {};

const AcceptTerms = ({
  termsAccepted,
  countryAccepted,
  setTermsAccepted,
  setCountryAccepted
}: {
  termsAccepted: boolean;
  countryAccepted: boolean;
  setTermsAccepted: (v: any) => void;
  setCountryAccepted: (v: any) => void;
}) => {
  return (
    <div className="text-xs">
      <div className="text-left flex flex-row gap-[5px] p-1">
        <Checkbox
          className="w-[15px] h-[15px] p-1 border border-white"
          checked={termsAccepted}
          required={true}
          onCheckedChange={checked =>
            setTermsAccepted(checked == "indeterminate" ? false : checked)
          }
        />
        <div>
          I agree to the{" "}
          <a href="/terms.html" target="_blank">
            <b>
              <u>terms of agreement</u>
            </b>
          </a>
          .
        </div>
      </div>
      <div className="text-left flex flex-row gap-[5px] p-1">
        <Checkbox
          className="w-[15px] h-[15px] p-1 border border-white"
          checked={countryAccepted}
          required={true}
          onCheckedChange={checked =>
            setCountryAccepted(checked == "indeterminate" ? false : checked)
          }
        />
        <div>
          I confirm that I am not located in or associated with OFAC-sanctioned
          countries and agree to the terms and conditions{" "}
          <a href="/countryrestrictions.html" target="_blank">
            <b>
              <u>[Read More]</u>
            </b>
          </a>
          .
        </div>
      </div>
    </div>
  );
};

const RedeemArea = ({
  poolInfo,
  redeemInfo,
  vouchersOwned
}: {
  poolInfo: PoolInfo;
  redeemInfo: VoucherPluginPoolInfo;
  vouchersOwned: Decimal;
}) => {
  const signer = useEthersSigner();
  const { setTx } = useTransactionHandler();

  const amount = useMemo(
    () =>
      redeemInfo.totalBalance
        .mul(vouchersOwned)
        .div(redeemInfo.totalVoucherPoints)
        .toNumber(),
    [redeemInfo, vouchersOwned]
  );

  const conversionRateText = useMemo(() => {
    if (poolInfo && poolInfo.projectInfo) {
      const conversion = redeemInfo.totalBalance.div(
        redeemInfo.totalVoucherPoints
      );
      return `1 Voucher = ${conversion.toDecimalPlaces(6).toString()} ${
        redeemInfo.token!.symbol
      }`;
    } else {
      return "Loading conversion rate...";
    }
  }, [poolInfo]);

  const handleRedeem = useCallback(() => {
    const runBuy = async () => {
      if (signer) {
        try {
          // buy
          const tx = redeem(signer, redeemInfo.id);
          setTx(
            "Waiting for Redeem transaction to be completed.",
            "Redeem successful!",
            tx
          );
          await (await tx).wait();
        } catch (e) {
          console.error(e);
        }
      }
    };

    runBuy();
  }, [redeemInfo]);

  return (
    <div className="relative buy-wrapper-main w-full">
      <div className="phoenix-image-token-wrapper">
        <NumberInput
          tokenName={"Voucher"}
          imageSrc={poolInfo?.projectInfo?.logo ?? Icon_Voucher.src}
          amount={vouchersOwned.toNumber()}
        />
      </div>
      <div className="h-[5px]" />
      <NumberInput
        tokenName={redeemInfo.token!.symbol}
        imageSrc={redeemInfo.token!.logo}
        amount={amount}
      />

      <div className="aeroport text-xs mt-2 h-[40px] w-full flex flex-row items-between">
        <div>
          <div className="text-left z-10 w-[250px]">{conversionRateText}</div>
        </div>
      </div>
      <div className="w-full flex flex-row flex-wrap justify-between gap-y-2">
        <ButtonYellow mainText="Redeem" onClick={handleRedeem} />
      </div>
      <div className="text-under-code text-left">
        {poolInfo?.projectInfo?.footerText}
      </div>
    </div>
  );
};

const BuyArea = ({
  poolInfo,
  poolId,
  code,
  setError,
  setCode,
  setBuyInProgress
}: {
  poolInfo: PoolInfo | undefined;
  poolId: string;
  code: string | null;
  setError: (value: string) => void;
  setCode: (value: string) => void;
  setBuyInProgress: (value: boolean) => void;
}) => {
  const signer = useEthersSigner();
  const { setTx } = useTransactionHandler();
  const { address } = useAccount();

  const [amount, setAmount] = useState<number | null>(null);
  const [amountVouchers, setAmountVouchers] = useState<number | null>(null);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [countryAccepted, setCountryAccepted] = useState<boolean>(false);

  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string>("");

  const conversionRateText = useMemo(() => {
    if (poolInfo && poolInfo.projectInfo) {
      return `1 Voucher = ${poolInfo?.currentRound.voucherPrice} ${poolInfo?.token.symbol}`;
    } else {
      return "Loading conversion rate...";
    }
  }, [poolInfo]);

  const { data: balanceData } = useBalance({
    address,
    token: poolInfo?.token.address! as any
  });
  const normalizedBalance = balanceData ? parseFloat(balanceData.formatted) : 0;

  useEffect(() => {
    if (amount !== null && poolInfo?.currentRound?.voucherPrice) {
      const vouchers =
        amount / parseFloat(poolInfo.currentRound.voucherPrice.toString());
      setAmountVouchers(
        Number.isFinite(vouchers) ? parseFloat(vouchers.toFixed(2)) : null
      );
    }
  }, [amount, poolInfo]);
  useEffect(() => {
    if (amountVouchers !== null && poolInfo?.currentRound?.voucherPrice) {
      const value =
        amountVouchers *
        parseFloat(poolInfo.currentRound.voucherPrice.toString());
      setAmount(Number.isFinite(value) ? parseFloat(value.toFixed(2)) : null);
    }
  }, [amountVouchers, poolInfo]);

  const isAmountValid = () => {
    if (amount === null) return false;
    return amount <= parseFloat(normalizedBalance.toString());
  };

  const handleSubmit = useCallback(() => {
    const runBuy = async () => {
      // e.preventDefault();
      setShowWarning(false);
      setWarningMessage("");

      if (!termsAccepted || !countryAccepted) {
        setShowWarning(true);
        setWarningMessage("Please accept the terms of use!");
        return;
      }

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
            poolInfo!.token,
            amount!
          );

          if (!hasApproval) {
            // approve
            const approveTx = approveSpending(signer, poolInfo!.token);
            setTx(
              "Waiting for Approve spending transation to be completed.",
              "Approve spending transation completed.",
              approveTx
            );
            await (await approveTx).wait();
          }

          // buy
          const buyTx = buy(
            signer,
            parseInt(poolId),
            poolInfo!.token,
            amount!,
            code
          );
          setTx(
            "Waiting for Buy transaction to be completed.",
            "Purchase successful!",
            buyTx
          );
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
    signer,
    poolId,
    poolInfo,
    amount,
    code
  ]);

  return (
    <div className="relative buy-wrapper-main w-full">
      <NumberInput
        tokenName={poolInfo?.token.symbol}
        imageSrc={poolInfo?.token.logo}
        amount={amount}
        amountUpdated={setAmount}
      />
      <div className="h-[5px]" />
      <div className="phoenix-image-token-wrapper">
        <NumberInput
          tokenName={"Voucher"}
          imageSrc={poolInfo?.projectInfo?.logo ?? Icon_Voucher.src}
          amount={amountVouchers}
          amountUpdated={setAmountVouchers}
        />
      </div>
      <div className="aeroport text-xs mt-2 h-[40px] w-full flex flex-row items-between">
        <div>
          <div className="text-left z-10 w-[250px]">{conversionRateText}</div>
        </div>
        <div className="text-red-300 text-right">
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
        <BuyButton onClick={handleSubmit} />
      </div>
      <AcceptTerms
        termsAccepted={termsAccepted}
        countryAccepted={countryAccepted}
        setCountryAccepted={setCountryAccepted}
        setTermsAccepted={setTermsAccepted}
      />
      <div className="text-under-code text-left">
        {poolInfo?.projectInfo?.footerText}
      </div>
    </div>
  );
};

const BuyPageWrapper = (props: Props) => {
  const provider = useEthersProvider();
  const { isConnected, address } = useAccount();
  const searchParams = useSearchParams();
  const { fetchPoolInfoById } = useBlockchainContext();
  const { userInfo, walletAddress, fetchUserInfo } = useDashboardContext();

  const initialError = useMemo(() => {
    const poolIdValue = searchParams.get("poolId");
    return !poolIdValue
      ? "Error: Required URL parameters are missing or invalid."
      : "";
  }, [searchParams]);

  const [vouchersOwned, setVouchersOwned] = useState<Decimal | null>(null);
  const [buyInProgress, setBuyInProgress] = useState<boolean>(false);
  const [poolId, setPoolId] = useState(searchParams.get("poolId") || "");
  const [code, setCode] = useState(searchParams.get("code") || "");
  const [error, setError] = useState(initialError);
  const [currentPoolInfo, setCurrentPoolInfo] = useState<PoolInfo | undefined>(
    undefined
  );
  const [redeemInfo, setRedeemInfo] = useState<VoucherPluginPoolInfo | null>(
    null
  );

  const redeemable = useMemo(() => !!redeemInfo?.token, [redeemInfo]);
  const urlForCopy = useMemo(() => {
    if (userInfo?.referralCode && poolId) {
      const { origin, pathname } = window.location;
      const host = origin + pathname;
      const poolIdRefCode =
        "?poolId=" + poolId + "&code=" + userInfo.referralCode;
      return host + poolIdRefCode;
    } else {
      return null;
    }
  }, [userInfo, currentPoolInfo]);

  useEffect(() => {
    if (walletAddress) fetchUserInfo(walletAddress);
  }, [walletAddress]);
  useEffect(() => {
    if (provider && address && poolId && !buyInProgress) {
      getVoucherBalance(provider, parseInt(poolId), address)
        .then(voucherBalanceResult => setVouchersOwned(voucherBalanceResult))
        .catch(error => {
          console.error(error);
          setError("Error fetching voucher information.");
        });
    }
  }, [
    buyInProgress,
    poolId,
    address,
    provider,
    getVoucherBalance,
    setVouchersOwned,
    setError
  ]);
  useEffect(() => {
    if (provider && address && poolId) {
      getPoolRedeemInfo(provider, parseInt(poolId))
        .then(v => setRedeemInfo(v))
        .catch(error => {
          console.error(error);
          setError("Error fetching redeem information.");
        });
    }
  }, [provider, poolId, address, setRedeemInfo, setError]);
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

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen main-air-wrapper text-white">
      <Header />
      <div className="mx-4">
        <div className="flex flex-col items-center justify-center bg-[rgba(25,96,255,0.6)] md:0 rounded-[4px] w-fit md:m-auto">
          <div className="voucher-wrapper din mb-0 flex w-full flex-wrap ">
            <div className="voucher-text-input-wrapper grow md:p-10 p-6 flex flex-col items-center">
              <div className="flex flex-row justify-start items-center w-full">
                <div className="blurred-box w-[64px] h-[64px] rounded-full flex justify-center items-center">
                  {!!currentPoolInfo?.projectInfo?.logo && (
                    <a
                      href={currentPoolInfo?.projectInfo?.website}
                      target="_blank"
                    >
                      <Image
                        src={currentPoolInfo?.projectInfo?.logo!}
                        width={37}
                        height={43}
                        alt="project-logo"
                      />
                    </a>
                  )}
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
                redeemable ? (
                  <RedeemArea
                    poolInfo={currentPoolInfo!}
                    redeemInfo={redeemInfo!}
                    vouchersOwned={vouchersOwned!}
                  />
                ) : (
                  <BuyArea
                    poolInfo={currentPoolInfo}
                    poolId={poolId}
                    code={code}
                    setError={setError}
                    setCode={setCode}
                    setBuyInProgress={setBuyInProgress}
                  />
                )
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
                    <div className="voucher-text-text z-10">Vouchers</div>
                  </div>
                </div>
              )}
              <div className="voucher-phoenix-image" />
            </div>
          </div>
        </div>
        {isConnected && !redeemable && urlForCopy && (
          <SellerLinkBar url={urlForCopy} />
        )}
        <BuyPageFooter poolInfo={currentPoolInfo} />
        <LoadingOverlay isLoading={buyInProgress} />
      </div>
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

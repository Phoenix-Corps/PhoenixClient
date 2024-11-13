"use client";

import { useBlockchainContext } from "@/context/BlockchainContext";
import { useEthersProvider } from "@/services/useEthersProvider";
import { PoolInfo, buy, getVoucherBalance } from "@/services/walletService";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import ConnectButtonCustom from "./components/connectButtonCustom";
import { BigNumber } from "ethers";
import { useEthersSigner } from "@/services/useEthersSigner";
import Toast, { ToastProps } from "./components/toast";
import LoadingOverlay from "./components/loadingOverlay";

type Props = {};

const BuyPage = (props: Props) => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<ToastProps["type"]>("info");

  const [buyInProgress, setBuyInProgress] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | null>(null);
  const [vouchersOwned, setVouchersOwned] = useState<BigNumber | null>(null);

  const { isConnected, address } = useAccount();
  const { data: balanceData, isError, isLoading } = useBalance({ address });
  const normalizedBalance = balanceData ? parseFloat(balanceData.formatted) : 0;

  const searchParams = useSearchParams();
  const provider = useEthersProvider();
  const signer = useEthersSigner();

  const { fetchPoolInfoById } = useBlockchainContext();

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

  useEffect(() => {
    if (provider && address && poolId && !buyInProgress) {
      getVoucherBalance(provider, parseInt(poolId), address)
        .then(voucherBalanceResult => {
          setVouchersOwned(BigNumber.from(voucherBalanceResult));
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

  const isAmountValid = () => {
    if (amount === null) return false;
    return amount <= parseFloat(normalizedBalance.toString());
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      const runBuy = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAmountValid()) {
          setShowToast(true);
          setToastMessage(
            "Incorrect input value / not enough money in wallet!"
          );
          setToastType("error");
          return;
        }

        if (signer) {
          setBuyInProgress(true);
          setShowToast(true);
          setToastMessage("Purchase in progress...");
          setToastType("info");

          try {
            const response = await buy(
              signer,
              +poolId,
              currentPoolInfo!.token,
              amount!,
              code
            );
            console.log(response);
            // TODO: Add more robust error handling
            if (response?.error) {
              setShowToast(true);
              setToastMessage("Purchase cancelled.");
              setToastType("error");
            } else {
              setShowToast(true);
              setToastMessage("Purchase successful!");
              setToastType("success");
            }
          } catch (e) {
            setShowToast(true);
            setToastMessage("Error while buying.");
            setToastType("error");
          } finally {
            setBuyInProgress(false);
          }
        }
      };

      runBuy(e);
    },
    [
      isAmountValid,
      setBuyInProgress,
      setError,
      signer,
      poolId,
      currentPoolInfo,
      amount,
      code
    ]
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="voucher-wrapper md:gap-[50px] sm:gap-[120px] xs:gap-[120px]">
        <div className="voucher-text-input-wrapper md:ml-[36px] sm:ml-0 flex flex-col items-center">
          <div className="buy-heading-text">
            {currentPoolInfo?.projectInfo?.name || "Loading..."}
          </div>
          <div className="buy-main-text">
            {currentPoolInfo?.projectInfo?.description ||
              "Loading description..."}
          </div>
          {isConnected ? (
            <div className="relative buy-wrapper-main">
              <input
                className="buy-input-main"
                value={amount ?? ""}
                placeholder="0.00"
                onChange={(e: any) => setAmount(e.target.value || null)}
              />
              <div className="curr-drop-wrapper">
                <div className="curr-main flex flex-row items-center">
                  {currentPoolInfo?.token ? (
                    <>
                      <Image
                        src={currentPoolInfo.token.logo}
                        alt="Description of the image"
                        width={30}
                        height={30}
                        style={{ objectFit: "contain" }}
                      />
                    </>
                  ) : (
                    "Loading token..."
                  )}
                </div>
              </div>
              <button
                disabled={!signer || buyInProgress}
                className="buy-button flex justify-center items-center"
                onClick={handleSubmit}
              >
                BUY
              </button>
            </div>
          ) : (
            <div className="text-center items-center flex flex-col justify-center">
              <p className="mb-4">Connect your wallet to continue</p>
              <ConnectButtonCustom />
            </div>
          )}
        </div>
        <div className="voucher-image-right relative overflow-hidden md:mr-[36px] md:mt-[18px] sm:mr-0 sm:mt-0">
          {isConnected && (
            <div className="voucher-text-in-image">
              <div className="currency-and-text">
                {vouchersOwned ? (
                  <div className="voucher-text-number font-extrabold z-10">
                    {vouchersOwned.toString()}
                  </div>
                ) : (
                  <div>Loading vouchers...</div>
                )}
                <div className="voucher-text-text">VOUCHERS</div>
              </div>
              {currentPoolInfo ? (
                <div className="change-rate-text z-10">{`1 Voucher = ${currentPoolInfo?.currentRound.voucherPrice} ${currentPoolInfo?.token.name}`}</div>
              ) : (
                <div className="change-rate-text z-10">
                  Loading conversion rate...
                </div>
              )}
            </div>
          )}
          <div className="voucher-phoenix-image"></div>
        </div>
      </div>
      {isConnected && (
        <>
          <input
            className="buy-input-main code-input"
            value={code ?? ""}
            placeholder="CODE24"
            onChange={(e: any) => setCode(e.target.value || null)}
          />
          <div className="text-under-code">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim.
          </div>
        </>
      )}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          position="bottom-right"
          onClose={() => setShowToast(false)}
        />
      )}
      <LoadingOverlay isLoading={buyInProgress} />
    </div>
  );
};

export default BuyPage;

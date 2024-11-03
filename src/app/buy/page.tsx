"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useSearchParams } from "next/navigation";
import { useBlockchainContext } from "@/context/BlockchainContext";
import { PoolInfo } from "@/services/walletService";
import Image from "next/image";

type Props = {};

const BuyPage = (props: Props) => {
  const [amount, setAmount] = useState<number | null>(null);
  const { isConnected } = useAccount();
  const searchParams = useSearchParams();

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
  }, [searchParams, fetchPoolInfoById]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        {error}
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`code: ${code}, poolId: ${poolId}, amount: ${amount}`);
    // TODO: walletService for buy
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="voucher-wrapper ">
        <div className="voucher-text-input-wrapper">
          <div className="buy-heading-text">
            {currentPoolInfo?.projectInfo.name || "Loading..."}
          </div>
          <div className="buy-main-text">
            {currentPoolInfo?.projectInfo.description ||
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
                        width={54}
                        height={54}
                        style={{ objectFit: "contain" }}
                      />
                      <div>{currentPoolInfo.token.symbol}</div>
                    </>
                  ) : (
                    "Loading token..."
                  )}
                </div>
              </div>
              <button
                className="buy-button flex justify-center items-center"
                onClick={handleSubmit}
              >
                BUY
              </button>
            </div>
          ) : (
            <div className="text-center items-center flex flex-col justify-center">
              <p className="mb-4">Connect your wallet to continue</p>
              <ConnectButton />
            </div>
          )}
        </div>
        <div className="voucher-image-right relative overflow-hidden">
          {isConnected && (
            <div className="voucher-text-in-image">
              <div className="currency-and-text">
                {/* TODO: get from walletService */}
                <div className="voucher-text-number font-extrabold z-10">0</div>
                <div className="voucher-text-text">VOUCHERS</div>
              </div>
              <div className="change-rate-text">2 Vouchers = 1 USDC</div>
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
    </div>
  );
};

export default BuyPage;

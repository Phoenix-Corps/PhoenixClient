"use client";

import React, { useEffect, useMemo, useState } from "react";
import USD from "@public/buy/usd-coin.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useSearchParams } from "next/navigation";

type Props = {};

const BuyPage = (props: Props) => {
  const [amount, setAmount] = useState<number | null>(null);
  const { isConnected } = useAccount();
  const searchParams = useSearchParams();
  const initialError = useMemo(() => {
    const poolIdValue = searchParams.get("poolId");
    return !poolIdValue
      ? "Error: Required URL parameters are missing or invalid."
      : "";
  }, [searchParams]);

  const [poolId, setPoolId] = useState(searchParams.get("poolId") || "");
  const [code, setCode] = useState(searchParams.get("code") || "");
  const [error, setError] = useState(initialError);

  useEffect(() => {
    const poolIdValue = searchParams.get("poolId");
    const codeValue = searchParams.get("code");

    setPoolId(poolIdValue || "");
    setCode(codeValue || "");

    if (!poolIdValue) {
      setError("Error: Required URL parameters are missing or invalid.");
    } else {
      setError("");
    }
  }, [searchParams]);

  if (error) {
    return <div>{error}</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`code: ${code}, poolId: ${poolId}, amount: ${amount}`);
    // TODO: service for buy
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="voucher-wrapper ">
        <div className="voucher-text-input-wrapper">
          <div className="buy-heading-text">VOUCHER PURCHASE</div>
          <div className="buy-main-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitati.
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
                  <USD alt="usd" width={54} height={54} />
                  <div>USDC</div>
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
                <div className="voucher-text-number font-extrabold z-10">0</div>
                <div className="voucher-text-text">VOUCHERS</div>
              </div>
              <div className="change-rate-text">2 VoucherS = 1 USDC</div>
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
